import { useEffect, useState } from 'react'
import { Link } from '../components/Link'
import { Seo } from '../components/Seo'
import { Faq } from '../components/Faq'
import { ContactForm } from '../components/ContactForm'
import { TalkButton } from '../components/TalkButton'
import { Arrow, BrowserFrame, GradTitle, SectionHead } from '../components/Ui'
import { IconCheck, IconCode, IconCycle, IconDoc, IconLink, IconLock, IconSpark, TinoBadge } from '../components/Icons'
import { useI18n } from '../i18n'
import shotList from '../assets/stackline-cotizaciones.webp'
import shotDetail from '../assets/stackline-detalle.webp'
import s from './Home.module.css'

const SITE = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')
const customIcons = [IconCode, IconLink, IconSpark, IconCycle]

/** Conversación de TINO en una tarjeta (la misma interfaz del chat web). */
function ChatCard({ msgs, quote, className = '' }: { msgs: string[]; quote?: string; className?: string }) {
  const { t } = useI18n()
  return (
    <div className={`${s.chatCard2} ${className}`} aria-hidden="true">
      <div className={s.chatHead}>
        <TinoBadge size={32} />
        <span>
          <strong>TINO</strong>
          <small>{t.tino.phone.online}</small>
        </span>
      </div>
      <div className={`${s.chatBody} chat-seq`}>
        {msgs.map((m, k) => (
          <span key={m} className={k % 2 === 0 ? s.me : s.bot}>
            {m}
          </span>
        ))}
        {quote && (
          <span className={s.quoteBubble}>
            <IconDoc />
            {quote}
          </span>
        )}
      </div>
    </div>
  )
}

/** Hero: la pantalla real de Stackline y, encima, TINO conversando con un cliente. */
function HeroArt() {
  const { t } = useI18n()
  const c = t.home.collage
  return (
    <div className={`${s.heroArt} enter-late`}>
      <BrowserFrame
        className={s.heroShot}
        label={
          <>
            <IconLock /> stackline
          </>
        }
      >
        <img src={shotList} alt={c.list} width={1600} height={1000} />
      </BrowserFrame>
      <ChatCard className={s.heroChat} msgs={c.chat} />
      <div className={`float ${s.heroFloat}`} aria-hidden="true">
        <span className="float__icon" style={{ background: 'var(--md-primary)' }}>
          <IconCheck />
        </span>
        <span>
          {c.approved}
          <small>Stackline</small>
        </span>
      </div>
    </div>
  )
}

/** Carrusel de los cuatro pasos de una venta; avanza solo y se pausa con el mouse encima. */
function FlowCarousel() {
  const { t } = useI18n()
  const f = t.home.flow
  const total = f.steps.length
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const DURATION = 6500

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const start = performance.now() - progress * DURATION
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION)
      setProgress(p)
      if (p >= 1) {
        setI((v) => (v + 1) % total)
        setProgress(0)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, paused, total])

  const go = (n: number) => {
    setI((n + total) % total)
    setProgress(0)
  }
  const step = f.steps[i]
  const media = [
    <div key="chat" className={s.stageChat}>
      <ChatCard msgs={t.tino.phone.msgs.slice(0, 4).map((m) => m.t)} />
    </div>,
    <div key="quote" className={s.stageChat}>
      <ChatCard msgs={t.home.collage.chat} quote={t.home.collage.approved} />
    </div>,
    <img key="detail" src={shotDetail} alt="" />,
    <img key="list" src={shotList} alt="" />,
  ]

  return (
    <div className={s.slider} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={s.stage} aria-hidden="true">
        {media.map((m, k) => (
          <div key={k} className={`${s.slide} ${k === i ? s.slideOn : ''}`}>
            {m}
          </div>
        ))}
      </div>
      <div className={s.quote}>
        <div key={i} className={s.swap} aria-live="polite">
          <span className={s.stepLabel}>
            {f.stepLabel} {i + 1} · {step.t}
          </span>
          <blockquote>{step.d}</blockquote>
          <p>{step.x}</p>
        </div>
        <div className={s.pager}>
          <button type="button" onClick={() => go(i - 1)} aria-label={f.prev}>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button type="button" onClick={() => go(i + 1)} aria-label={f.next}>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <span className={s.count}>
            {i + 1} / {total}
          </span>
          <span className={s.progress} aria-hidden="true">
            <i style={{ width: `${(progress * 100).toFixed(1)}%` }} />
          </span>
        </div>
      </div>
    </div>
  )
}

/** Nosotros: misión, visión, valores y hacia dónde vamos (sin cifras). */
function About() {
  const { t } = useI18n()
  const a = t.home.about
  // La primera oración de la misión va destacada; el resto, en tono secundario.
  const corte = a.mission.indexOf('. ') + 1
  const [first, rest] = corte > 0 ? [a.mission.slice(0, corte), a.mission.slice(corte)] : [a.mission, '']
  return (
    <section id="nosotros" className={`section ${s.about}`}>
      <div className="wrap stack">
        <SectionHead index={5} eyebrow={a.eyebrow} title={<GradTitle parts={a.titleParts} />} />

        <div className={`${s.statement} reveal`}>
          <h3 className={s.label}>{a.missionLabel}</h3>
          <p className={s.mission}>
            {first}
            <span>{rest}</span>
          </p>
        </div>

        <div className={`${s.statement} reveal`}>
          <h3 className={s.label}>{a.visionLabel}</h3>
          <p className={s.vision}>{a.vision}</p>
        </div>

        <div className={s.statement}>
          <h3 className={`${s.label} reveal`}>{a.valuesLabel}</h3>
          <ul className={`${s.values} reveal-children`}>
            {a.values.map((v, i) => (
              <li key={v.t}>
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <strong>{v.t}</strong>
                <p>{v.d}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.statement}>
          <h3 className={`${s.label} reveal`}>{a.goalsLabel}</h3>
          <div className={`${s.goals} reveal-children`}>
            {a.goals.map((g, i) => (
              <div key={g.t} className="card">
                <span className={s.goalNum}>{String(i + 1).padStart(2, '0')}</span>
                <h4 className="card__title">{g.t}</h4>
                <p className="card__text">{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { t, path } = useI18n()
  const h = t.home

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Corvex',
    ...(SITE ? { url: SITE, logo: `${SITE}/favicon.svg` } : {}),
    description: t.meta.home.description,
    areaServed: 'GT',
  }

  const products = [
    { key: 'stackline', to: path('stackline'), p: h.products.stackline, cls: s.pStack, art: <img src={shotList} alt="" /> },
    {
      key: 'tino',
      to: path('tino'),
      p: h.products.tino,
      cls: s.pTino,
      art: (
        <div className={s.artChat}>
          {h.collage.chat.map((m, k) => (
            <span key={m} className={k % 2 === 0 ? s.me : s.bot}>
              {m}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'custom',
      to: path('home', 'contacto'),
      p: h.products.custom,
      cls: s.pCustom,
      art: (
        <ul className={s.artList}>
          {h.custom.items.map((it, i) => {
            const Icon = customIcons[i]
            return (
              <li key={it.t}>
                <Icon />
                {it.t}
              </li>
            )
          })}
        </ul>
      ),
    },
  ]

  return (
    <>
      <Seo page="home" jsonLd={jsonLd} />

      <section className={`hero ${s.hero}`}>
        <div className="gridbg" aria-hidden="true" />
        <div className={`wrap ${s.heroGrid}`}>
          <div className={`intro ${s.heroText}`}>
            <span className={s.heroEyebrow}>{h.eyebrow}</span>
            <h1 className="h1">
              <GradTitle parts={h.titleParts} />
            </h1>
            <p className="lead">{h.lead}</p>
            <div className="actions">
              <Link to={path('home', 'productos')} className="btn btn--primary btn--lg">
                {h.ctaProducts} <Arrow />
              </Link>
              <TalkButton to={path('home', 'contacto')} className="btn btn--ghost btn--lg">
                {t.nav.talk}
              </TalkButton>
            </div>
            <div className={s.trust}>
              <span>{h.stackLabel}</span>
              <ul>
                {h.stack.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <section id="productos" className={`section ${s.covers}`}>
        <div className="wrap stack">
          <SectionHead index={1} eyebrow={h.products.eyebrow} title={<GradTitle parts={h.products.titleParts} />} lead={h.products.lead} />
          <div className={`${s.products} reveal-children`}>
            {products.map(({ key, to, p, cls, art }) => (
              <Link key={key} to={to} className={`card ${s.prod} ${cls}`}>
                <span className={s.tag}>{p.tag}</span>
                <h3 className={s.prodTitle}>{p.line}</h3>
                <p className="card__text">{p.desc}</p>
                <span className={s.more}>
                  {p.cta} <Arrow />
                </span>
                <div className={s.art}>{art}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap stack">
          <SectionHead index={2} eyebrow={h.flow.eyebrow} title={<GradTitle parts={h.flow.titleParts} />} lead={h.flow.lead} />
          <FlowCarousel />
        </div>
      </section>

      <section id="como" className="section">
        <div className="wrap stack">
          <SectionHead index={3} eyebrow={h.who.eyebrow} title={<GradTitle parts={h.who.titleParts} />} />
          <div className={s.split}>
            {[h.who.a, h.who.b].map((col) => (
              <div key={col.t} className="reveal">
                <h3 className={s.splitTitle}>{col.t}</h3>
                <p className="card__text">{col.d}</p>
                <ol className={s.splitList}>
                  {col.points.map((pt, k) => (
                    <li key={pt}>
                      <span>{String(k + 1).padStart(2, '0')}</span>
                      {pt}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
        <div className="wrap">
          <ul className={`${s.capabilities} reveal-children`}>
            {h.who.marquee.map(([name, tag]) => (
              <li key={name}>
                <small>{tag}</small>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="servicios" className="section section--alt">
        <div className="wrap stack">
          <SectionHead index={4} eyebrow={h.custom.eyebrow} title={h.custom.title} />
          <div className="grid grid--4 reveal-children">
            {h.custom.items.map((it, i) => {
              const Icon = customIcons[i]
              return (
                <div key={it.t} className="card">
                  <span className="icon-box">
                    <Icon />
                  </span>
                  <h3 className="card__title">{it.t}</h3>
                  <p className="card__text">{it.d}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <About />

      <section id="preguntas" className="section section--alt">
        <div className={`wrap ${s.faq}`}>
          <SectionHead index={6} eyebrow={h.faq.eyebrow} title={h.faq.title} className={s.faqHead} />
          <Faq items={h.faq.items} />
        </div>
      </section>

      <section id="contacto" className={`section ${s.contactSection}`}>
        <div className={s.glow} aria-hidden="true" />
        <div className={`wrap ${s.contact}`}>
          <div className={s.contactText}>
            <SectionHead index={7} eyebrow={h.contact.eyebrow} title={h.contact.title} lead={h.contact.lead} />
            <div className={`${s.chatCard} reveal`}>
              <TinoBadge size={44} />
              <div className={s.chatCopy}>
                <h3 className={s.chatTitle}>{h.contact.chatTitle}</h3>
                <p className={s.chatText}>{h.contact.chatText}</p>
              </div>
              <TalkButton to={path('home', 'contacto')} className="btn btn--dark btn--sm">
                {t.nav.talk} <Arrow />
              </TalkButton>
            </div>
          </div>
          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
