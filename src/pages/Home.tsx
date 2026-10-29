import { Link } from '../components/Link'
import { Seo } from '../components/Seo'
import { Faq } from '../components/Faq'
import { ContactForm } from '../components/ContactForm'
import { TalkButton } from '../components/TalkButton'
import { Arrow, Backdrop, GradTitle, SectionHead } from '../components/Ui'
import { IconCode, IconCycle, IconLink, IconSpark, StacklineBadge, TinoBadge } from '../components/Icons'
import { useI18n } from '../i18n'
import network from '../assets/network.svg'
import s from './Home.module.css'

const SITE = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')
const customIcons = [IconCode, IconLink, IconSpark, IconCycle]

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
    { key: 'stackline' as const, to: path('stackline'), name: 'Stackline', badge: <StacklineBadge size={44} />, p: h.products.stackline },
    { key: 'tino' as const, to: path('tino'), name: 'TINO', badge: <TinoBadge size={44} />, p: h.products.tino },
  ]

  return (
    <>
      <Seo page="home" jsonLd={jsonLd} />

      <section className="hero">
        <Backdrop />
        <div className={`wrap ${s.heroGrid}`}>
          <div className={`intro ${s.heroText}`}>
            <span className="eyebrow">{h.eyebrow}</span>
            <h1 className="h1">
              <GradTitle parts={h.titleParts} />
            </h1>
            <p className="lead">{h.lead}</p>
            <div className="actions">
              <Link to={path('stackline')} className="btn btn--dark">
                {h.ctaStackline} <Arrow />
              </Link>
              <Link to={path('tino')} className="btn btn--ghost">
                {h.ctaTino} <Arrow />
              </Link>
            </div>
          </div>
          <img className={`${s.network} enter-late`} src={network} alt={h.networkAlt} width={560} height={400} />
        </div>
        <div className={`wrap ${s.stackRow}`}>
          <div className="chips reveal">
            <span className="chips__label">{h.stackLabel}</span>
            {h.stack.map((it) => (
              <span key={it} className="chip">
                {it}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="wrap stack">
          <SectionHead index={1} eyebrow={h.products.eyebrow} title={h.products.title} lead={h.products.lead} />
          <div className="grid grid--2 reveal-children">
            {products.map(({ key, to, name, badge, p }) => (
              <Link key={key} to={to} className={`card ${s.product}`}>
                <div className={s.productTop}>
                  <div className="product-tag">
                    {badge}
                    <span className={s.productName}>{name}</span>
                  </div>
                  <span className="idx">{p.tag}</span>
                </div>
                <p className={s.productLine}>{p.line}</p>
                <ul className={s.points}>
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <span className={s.more}>
                  {p.cta} <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="gridbg" aria-hidden="true" />
        <div className="wrap stack">
          <SectionHead index={2} eyebrow={h.flow.eyebrow} title={<GradTitle parts={h.flow.titleParts} />} lead={h.flow.lead} />
          <div className={s.flow}>
            <div className={s.flowLine} aria-hidden="true" />
            <ol className={`grid grid--4 reveal-children ${s.flowSteps}`}>
              {h.flow.steps.map((st, i) => (
                <li key={st.t} className={s.glass}>
                  <span className={s.glassTag}>
                    <i style={{ animationDelay: `${i * 0.8}s` }} />
                    {String(i + 1).padStart(2, '0')} · {h.flow.tags[i]}
                  </span>
                  <h3 className={s.glassTitle}>{st.t}</h3>
                  <p className={s.glassText}>{st.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="servicios" className="section">
        <div className="wrap stack">
          <SectionHead index={3} eyebrow={h.custom.eyebrow} title={h.custom.title} />
          <div className="grid grid--4 reveal-children">
            {h.custom.items.map((it, i) => {
              const Icon = customIcons[i]
              return (
                <div key={it.t} className="card">
                  <span className="icon-box">
                    <Icon />
                  </span>
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="card__title">{it.t}</h3>
                  <p className="card__text">{it.d}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="como" className="section section--alt">
        <div className="wrap stack">
          <SectionHead index={4} eyebrow={h.how.eyebrow} title={h.how.title} />
          <div className="grid grid--4 reveal-children">
            {h.how.steps.map((st, i) => (
              <div key={st.t} className="step">
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="card__title">{st.t}</h3>
                <p className="card__text">{st.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`wrap ${s.faq}`}>
          <SectionHead index={5} eyebrow={h.faq.eyebrow} title={h.faq.title} className={s.faqHead} />
          <Faq items={h.faq.items} />
        </div>
      </section>

      <section id="contacto" className="section section--alt">
        <div className={`wrap ${s.contact}`}>
          <div className={s.contactText}>
            <SectionHead index={6} eyebrow={h.contact.eyebrow} title={h.contact.title} lead={h.contact.lead} />
            <div className={`${s.chatCard} reveal`}>
              <TinoBadge size={44} />
              <div className={s.chatCopy}>
                <h3 className={s.chatTitle}>{h.contact.chatTitle}</h3>
                <p className={s.chatText}>{h.contact.chatText}</p>
              </div>
              <TalkButton to={path('home', 'contacto')} className="btn btn--primary btn--sm">
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
