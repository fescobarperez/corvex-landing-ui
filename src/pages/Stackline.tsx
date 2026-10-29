import { Link } from '../components/Link'
import { Seo } from '../components/Seo'
import { TalkButton } from '../components/TalkButton'
import { Arrow, Backdrop, BrowserFrame, FloatCard, GradTitle, SectionHead } from '../components/Ui'
import { IconBox, IconCart, IconChart, IconCheck, IconDoc, IconLock, IconRuler, IconTruck, StacklineBadge } from '../components/Icons'
import { useI18n } from '../i18n'
import shotList from '../assets/stackline-cotizaciones.webp'
import shotDetail from '../assets/stackline-detalle.webp'
import s from './Stackline.module.css'

const moduleIcons = [IconCart, IconDoc, IconBox, IconTruck, IconRuler, IconChart]

export default function Stackline() {
  const { t, path } = useI18n()
  const p = t.stackline
  const [fel, quote, stock] = p.floats

  return (
    <>
      <Seo page="stackline" />

      <section className="hero">
        <Backdrop aurora="wine" />
        <div className={`wrap ${s.heroInner}`}>
          <div className={`intro ${s.heroText}`}>
            <div className="product-tag">
              <StacklineBadge />
              <span className="product-tag__name">Stackline</span>
              <span className="chip chip--sm chip--wine">{t.common.byCorvex}</span>
            </div>
            <h1 className="h1">
              <GradTitle parts={p.titleParts} wine />
            </h1>
            <p className="lead">{p.lead}</p>
            <div className="actions">
              <TalkButton to={path('stackline', 'demo')} className="btn btn--dark">
                {t.nav.demo} <Arrow />
              </TalkButton>
              <Link to={path('stackline', 'modulos')} className="btn btn--ghost">
                {p.ctaModules} <Arrow />
              </Link>
            </div>
          </div>
          <div className={`${s.stage} enter-late`}>
            <BrowserFrame
              className="tilt"
              label={
                <>
                  <IconLock /> {p.frame}
                </>
              }
            >
              <img src={shotList} alt={p.shotAlt} width={1600} height={1000} />
            </BrowserFrame>
            <FloatCard className={s.f1} icon={<IconCheck />} color="var(--brand-teal-strong)" title={fel.t} sub={fel.s} />
            <FloatCard className={`float--2 ${s.f2}`} icon={<IconDoc />} color="var(--brand-wine)" title={quote.t} sub={quote.s} />
            <FloatCard className={`float--3 ${s.f3}`} icon={<IconBox />} color="var(--brand-ink)" title={stock.t} sub={stock.s} />
          </div>
        </div>
      </section>

      <section id="modulos" className="section">
        <div className="wrap stack">
          <SectionHead index={1} eyebrow={p.modules.eyebrow} title={p.modules.title} lead={p.modules.lead} wine />
          <div className="grid grid--3 reveal-children">
            {p.modules.items.map((m, i) => {
              const Icon = moduleIcons[i]
              return (
                <div key={m.t} className="card">
                  <span className="icon-box">
                    <Icon />
                  </span>
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="card__title">{m.t}</h3>
                  <p className="card__text">{m.d}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className={`wrap ${s.split}`}>
          <div className={`reveal ${s.splitText}`}>
            <span className="eyebrow eyebrow--wine">
              <b>02</b> {p.quotes.eyebrow}
            </span>
            <h2 className="h2">{p.quotes.title}</h2>
            <div className="steps-list">
              {p.quotes.items.map((it) => (
                <div key={it.t} className="step">
                  <h3 className="card__title">{it.t}</h3>
                  <p className="card__text">{it.d}</p>
                </div>
              ))}
            </div>
          </div>
          <BrowserFrame className="reveal" label={p.quotes.frame}>
            <img src={shotDetail} alt={p.quotes.shotAlt} width={1200} height={736} loading="lazy" />
          </BrowserFrame>
        </div>
      </section>

      <section className="section dark">
        <div className="gridbg" aria-hidden="true" />
        <div className={`wrap ${s.withTino}`}>
          <SectionHead index={3} eyebrow={p.withTino.eyebrow} title={<GradTitle parts={p.withTino.titleParts} />} lead={p.withTino.lead} />
          <Link to={path('tino')} className="btn btn--primary btn--lg reveal">
            {t.home.ctaTino} <Arrow />
          </Link>
        </div>
      </section>

      <section id="demo" className="section">
        <div className="wrap">
          <div className="head center reveal">
            <span className="eyebrow">{p.demo.eyebrow}</span>
            <h2 className="h2">{p.demo.title}</h2>
            <p className="lead">{p.demo.lead}</p>
            <TalkButton to={path('stackline', 'demo')} className="btn btn--dark btn--lg">
              {t.nav.talk} <Arrow />
            </TalkButton>
          </div>
        </div>
      </section>
    </>
  )
}
