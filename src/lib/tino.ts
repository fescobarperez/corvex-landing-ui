/**
 * Chat de TINO (canal web de agents-services).
 *
 * El widget se carga solo en el navegador y solo si hay URL y clave configuradas.
 * Trae su propia burbuja; los botones "Habla con TINO" del sitio lo abren con
 * window.StacklineChat.open(). Sin widget, esos botones llevan a la sección de contacto.
 */
const WIDGET_URL = import.meta.env.VITE_TINO_WIDGET_URL ?? ''
const WIDGET_KEY = import.meta.env.VITE_TINO_WIDGET_KEY ?? ''

export const tinoEnabled = Boolean(WIDGET_URL && WIDGET_KEY)

export function loadTino(lang: 'es' | 'en'): void {
  if (!tinoEnabled || typeof document === 'undefined') return
  if (document.querySelector('script[data-tino-widget]')) return
  const s = document.createElement('script')
  s.src = WIDGET_URL
  s.async = true
  s.setAttribute('data-key', WIDGET_KEY)
  s.setAttribute('data-lang', lang)
  // Ojos e insignia de Tino en el teal de Corvex (el círculo usa el color del canal).
  s.setAttribute('data-accent', '#19C2B1')
  // Logo de Corvex en el pecho de Tino (public/tino-badge.svg).
  s.setAttribute('data-badge', new URL('/tino-badge.svg', window.location.origin).href)
  s.setAttribute('data-tino-widget', '')
  document.body.appendChild(s)
}

/** Abre el chat si ya está listo. Devuelve false si no hay chat (se usa el enlace de respaldo). */
export function openTino(): boolean {
  if (typeof window === 'undefined' || !window.StacklineChat) return false
  window.StacklineChat.open()
  return true
}

/** URL del formulario de contacto del canal web (misma llave y dominios que el chat). */
export const contactUrl: string | null = tinoEnabled
  ? `${WIDGET_URL.replace(/\/widget\.js(\?.*)?$/, '')}/${WIDGET_KEY}/contact`
  : null

export type ContactForm = {
  name: string
  company: string
  email: string
  phone: string
  interest: string
  message: string
  /** Campo trampa: oculto para personas, los bots lo llenan. */
  website: string
}

export type ContactResult = { ok: true } | { ok: false; code: string; message?: string }

export async function sendContact(form: ContactForm): Promise<ContactResult> {
  if (!contactUrl) return { ok: false, code: 'UNAVAILABLE' }
  try {
    // text/plain: petición "simple" para CORS (el servidor la lee como JSON).
    const res = await fetch(contactUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(form),
    })
    if (res.ok) return { ok: true }
    const err = (await res.json().catch(() => null)) as { code?: string; message?: string } | null
    return { ok: false, code: err?.code ?? 'ERROR', message: err?.message }
  } catch {
    return { ok: false, code: 'NETWORK' }
  }
}
