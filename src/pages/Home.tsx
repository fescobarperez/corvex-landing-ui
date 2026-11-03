import { useEffect, useRef, useState, type RefObject } from 'react'
import { Link } from '../components/Link'
import { Seo } from '../components/Seo'
import { Faq } from '../components/Faq'
import { ContactForm } from '../components/ContactForm'
import { TalkButton } from '../components/TalkButton'
import { Arrow, GradTitle, SectionHead } from '../components/Ui'
import { IconChat, IconCode, IconCycle, IconDoc, IconLink, IconSpark, TinoBadge } from '../components/Icons'
import { useI18n } from '../i18n'
import network from '../assets/network.svg'
import shotList from '../assets/stackline-cotizaciones.webp'
import shotDetail from '../assets/stackline-detalle.webp'
import pergola from '../assets/tino-pergola.webp'
import s from './Home.module.css'

const SITE = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')
const customIcons = [IconCode, IconLink, IconSpark, IconCycle]

/**
 * Las piezas del collage se desplazan a distinto ritmo al hacer scroll y
 * siguen un poco al mouse. Solo en pantallas anchas y sin movimiento reducido.
 */
function useParallax(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const wide = window.matchMedia('(min-width: 721px)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const tiles = Array.from(root.querySelectorAll<HTMLElement>('[data-speed]'))
    let mx = 0
    let my = 0
    let frame = 0
    const paint = () => {
      frame = 0
      const active = wide.matches && !reduce.matches
      const y = window.scrollY
      for (const t of tiles) {
        if (!active) {
          t.style.transform = ''
          continue
        }
        const k = Number(t.dataset.speed) || 0.2
        t.style.transform = `translate3d(${(mx * k * 18).toFixed(1)}px, ${(-y * k + my * k * 14).toFixed(1)}px, 0)`
      }
    }
    const ask = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5
      my = e.clientY / window.innerHeight - 0.5
      ask()
    }
    window.addEventListener('scroll', ask, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    wide.addEventListener('change', ask)
    paint()
    return () => {
      window.removeEventListener('scroll', ask)
      window.removeEventListener('pointermove', onMove)
      wide.removeEventListener('change', ask)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])
}

function Collage() {
  const { t } = useI18n()
  const c = t.home.collage
  const ref = useRef<HTMLDivElement>(null)
  useParallax(ref)
  return (
    <div className={s.collage} ref={ref}>
      <figure className={`${s.tile} ${s.t1}`} data-speed="0.18">
        <img src={shotList} alt={c.list} width={1600} height={1000} />
        <span className={s.badge} style={{ left: '47%', top: '28%' }} aria-hidden="true">
          <IconDoc />
        </span>
      </figure>
      <div className={`${s.tile} ${s.t2}`} data-speed="0.32" aria-hidden="true">
        <div className={s.chat}>
          <span className={s.me}>{c.chat[0]}</span>
          <span className={s.bot}>{c.chat[1]}</span>
          <span className={s.me}>{c.chat[2]}</span>
        </div>
        <span className={`${s.badge} ${s.badgeSm}`} style={{ right: 12, bottom: 12 }}>
          <IconChat size={20} />
        </span>
      </div>
      <figure className={`${s.tile} ${s.t3}`} data-speed="0.12">
        <img src={shotDetail} alt={c.detail} width={1200} height={736} />
        <span className={s.cap}>{c.approved}</span>
      </figure>
      <figure className={`${s.tile} ${s.t4}`} data-speed="0.24">
        <div className={s.netpane}>
          <img src={network} alt="" width={560} height={400} />
        </div>
        <span className={s.badge} style={{ left: '44%', top: '44%' }} aria-hidden="true">
          <IconLink />
        </span>
        <span className={s.cap}>{c.integrations}</span>
      </figure>
      <div className={`${s.tile} ${s.t5}`} data-speed="0.36" aria-hidden="true">
        <pre className={s.term}>
          <span className={s.c}>{'<!-- TINO -->'}</span>
          {'\n'}
          <span className={s.p}>{'<script'}</span> <span className={s.k}>src</span>=<span className={s.s}>"…/widget.js"</span>
          {'\n  '}
          <span className={s.k}>data-key</span>=<span className={s.s}>"wk_…"</span>
          {'\n  '}
          <span className={s.k}>async</span>
          <span className={s.p}>{'></script>'}</span>
        </pre>
        <span className={`${s.badge} ${s.badgeSm}`} style={{ right: 12, top: 12 }}>
          <IconCode />
        </span>
      </div>
      <figure className={`${s.tile} ${s.t6}`} data-speed="0.2">
        <img src={pergola} alt="" width={640} height={427} />
        <span className={s.cap}>{c.illustration}</span>
      </figure>
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
    <div key="chat" className={`${s.chat} ${s.chatLg}`}>
      <span className={s.me}>{t.tino.phone.msgs[0].t}</span>
      <span className={s.bot}>{t.tino.phone.msgs[1].t}</span>
      <span className={s.me}>{t.tino.phone.msgs[2].t}</span>
      <span className={s.bot}>{t.tino.phone.msgs[3].t}</span>
    </div>,
    <img key="pergola" src={pergola} alt="" />,
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
    { key: 'tino', to: path('tino'), p: h.products.tino, cls: s.pTino, art: <img src={pergola} alt="" /> },
    {
      key: 'custom',
      to: path('home', 'contacto'),
      p: h.products.custom,
      cls: s.pCustom,
      art: (
        <pre className={s.codeArt}>
          <span className={s.c}>{'// pedidos de la tienda en línea'}</span>
          {'\n'}
          <span className={s.k}>await</span> stackline.ventas.crear({'{'}
          {'\n  '}canal: <span className={s.s}>'tienda'</span>,{'\n  '}factura: <span className={s.s}>'FEL'</span>
          {'\n'}
          {'})'}
        </pre>
      ),
    },
  ]

  return (
    <>
      <Seo page="home" jsonLd={jsonLd} />

      <section className={s.hero}>
        <Collage />
        <div className={s.heroCopy}>
          <div className={`intro ${s.heroInner}`}>
            <span className={s.heroEyebrow}>{h.eyebrow}</span>
            <h1 className={s.heroTitle}>
              <GradTitle parts={h.titleParts} />
            </h1>
            <p className={s.heroLead}>{h.lead}</p>
            <div className={s.heroCtas}>
              <Link to={path('home', 'productos')} className="btn btn--dark btn--lg">
                {h.ctaProducts} <Arrow />
              </Link>
              <TalkButton to={path('home', 'contacto')} className="btn btn--ghost btn--lg">
                {t.nav.talk}
              </TalkButton>
            </div>
          </div>
        </div>
      </section>

      <section id="productos" className="section">
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

      <section className="section">
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
        <div className={s.marquee} aria-hidden="true">
          <div className={s.track}>
            {[...h.who.marquee, ...h.who.marquee].map(([name, tag], k) => (
              <span key={k}>
                {name}
                <b>{tag}</b>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="section">
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

      <section id="preguntas" className="section">
        <div className={`wrap ${s.faq}`}>
          <SectionHead index={5} eyebrow={h.faq.eyebrow} title={h.faq.title} className={s.faqHead} />
          <Faq items={h.faq.items} />
        </div>
      </section>

      <section id="contacto" className={`section ${s.contactSection}`}>
        <div className={s.glow} aria-hidden="true" />
        <div className={`wrap ${s.contact}`}>
          <div className={s.contactText}>
            <SectionHead index={6} eyebrow={h.contact.eyebrow} title={h.contact.title} lead={h.contact.lead} />
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
