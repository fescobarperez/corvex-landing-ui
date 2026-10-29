import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { useI18n } from '../i18n'
import { contactUrl, sendContact, type ContactForm as Form } from '../lib/tino'
import { Arrow } from './Ui'
import { IconCheck } from './Icons'
import s from './ContactForm.module.css'

type Field = 'name' | 'contact' | 'email' | 'phone' | 'message'
type Errors = Partial<Record<Field, string>>

const EMPTY: Form = { name: '', company: '', email: '', phone: '', interest: '', message: '', website: '' }
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const PHONE = /^[+0-9 ()-]{7,25}$/
/** Códigos de error del servidor que corresponden a un campo. */
const FIELD_CODES: Record<string, Field> = { NAME: 'name', CONTACT: 'contact', EMAIL: 'email', PHONE: 'phone', MESSAGE: 'message', TOO_LONG: 'message' }

/** Formulario de contacto: deja un prospecto en Stackline (POST /v1/web/{key}/contact). */
export function ContactForm() {
  const { t, lang } = useI18n()
  const f = t.home.contact.form
  const id = useId()
  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [failure, setFailure] = useState<string | null>(null)

  const set = (k: keyof Form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k as Field] || ((k === 'email' || k === 'phone') && errors.contact)) {
      setErrors((v) => ({ ...v, [k]: undefined, contact: undefined }))
    }
  }

  const validate = (): Errors => {
    const e: Errors = {}
    const email = form.email.trim()
    const phone = form.phone.trim()
    if (!form.name.trim()) e.name = f.errors.name
    if (!email && !phone) e.contact = f.errors.contact
    if (email && !EMAIL.test(email)) e.email = f.errors.email
    if (phone && !PHONE.test(phone)) e.phone = f.errors.phone
    if (!form.message.trim()) e.message = f.errors.message
    return e
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    setFailure(null)
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      const first = (Object.keys(e)[0] === 'contact' ? 'email' : Object.keys(e)[0]) as string
      document.getElementById(`${id}-${first}`)?.focus()
      return
    }
    setStatus('sending')
    const r = await sendContact({ ...form, name: form.name.trim(), message: form.message.trim() })
    if (r.ok) {
      setStatus('sent')
      setForm(EMPTY)
      return
    }
    setStatus('idle')
    const field = FIELD_CODES[r.code]
    if (field) {
      setErrors({ [field]: f.errors[field] })
    } else if (r.code === 'UNAVAILABLE' && !contactUrl) {
      setFailure(f.errors.unavailable)
    } else {
      // Los mensajes del servidor (p. ej. límite de envíos) vienen en español.
      setFailure(lang === 'es' && r.message ? r.message : f.errors.generic)
    }
  }

  if (status === 'sent') {
    return (
      <div className={s.card} role="status">
        <div className={s.done}>
          <span className={s.doneIcon}>
            <IconCheck />
          </span>
          <h3 className={s.doneTitle}>{f.successTitle}</h3>
          <p className="card__text">{f.successText}</p>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus('idle')}>
            {f.again}
          </button>
        </div>
      </div>
    )
  }

  const err = (k: Field) =>
    errors[k] ? (
      <span className={s.error} id={`${id}-${k}-err`}>
        {errors[k]}
      </span>
    ) : null
  const describedBy = (k: Field, extra?: string) => [errors[k] ? `${id}-${k}-err` : '', extra ?? ''].filter(Boolean).join(' ') || undefined

  return (
    <form className={s.card} onSubmit={onSubmit} noValidate>
      <div className={s.row}>
        <label className={s.field}>
          <span className={s.label}>{f.name}</span>
          <input id={`${id}-name`} className={s.input} value={form.name} onChange={set('name')} autoComplete="name" maxLength={150}
            aria-invalid={!!errors.name} aria-describedby={describedBy('name')} />
          {err('name')}
        </label>
        <label className={s.field}>
          <span className={s.label}>
            {f.company} <em>({f.optional})</em>
          </span>
          <input className={s.input} value={form.company} onChange={set('company')} autoComplete="organization" maxLength={150} />
        </label>
      </div>

      <div className={s.row}>
        <label className={s.field}>
          <span className={s.label}>{f.email}</span>
          <input id={`${id}-email`} className={s.input} type="email" inputMode="email" value={form.email} onChange={set('email')}
            autoComplete="email" maxLength={150} aria-invalid={!!errors.email || !!errors.contact}
            aria-describedby={describedBy('email', `${id}-hint`)} />
          {err('email')}
        </label>
        <label className={s.field}>
          <span className={s.label}>{f.phone}</span>
          <input id={`${id}-phone`} className={s.input} type="tel" inputMode="tel" value={form.phone} onChange={set('phone')}
            autoComplete="tel" maxLength={25} aria-invalid={!!errors.phone || !!errors.contact}
            aria-describedby={describedBy('phone', `${id}-hint`)} />
          {err('phone')}
        </label>
      </div>
      <p id={`${id}-hint`} className={errors.contact ? s.error : s.hint}>
        {errors.contact ?? f.contactHint}
      </p>

      <label className={s.field}>
        <span className={s.label}>
          {f.interest} <em>({f.optional})</em>
        </span>
        <select className={s.input} value={form.interest} onChange={set('interest')}>
          <option value="">—</option>
          {f.interests.map((o) => (
            <option key={o.v} value={o.v}>
              {o.l}
            </option>
          ))}
        </select>
      </label>

      <label className={s.field}>
        <span className={s.label}>{f.message}</span>
        <textarea id={`${id}-message`} className={`${s.input} ${s.textarea}`} value={form.message} onChange={set('message')}
          placeholder={f.messagePlaceholder} maxLength={1000} rows={5} aria-invalid={!!errors.message}
          aria-describedby={describedBy('message')} />
        {err('message')}
      </label>

      {/* Trampa para bots: fuera de la vista y del orden de tabulación. */}
      <div className={s.trap} aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
        </label>
      </div>

      {failure && (
        <p className={s.failure} role="alert">
          {failure}
        </p>
      )}

      <div className={s.footer}>
        <span className={s.privacy}>{f.privacy}</span>
        <button type="submit" className="btn btn--dark" disabled={status === 'sending'}>
          {status === 'sending' ? f.sending : f.send} {status !== 'sending' && <Arrow />}
        </button>
      </div>
    </form>
  )
}
