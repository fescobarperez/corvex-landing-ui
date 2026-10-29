import { Link } from '../components/Link'
import { Seo } from '../components/Seo'
import { TalkButton } from '../components/TalkButton'
import { Arrow, Backdrop, FloatCard, GradTitle, SectionHead } from '../components/Ui'
import { IconBolt, IconCamera, IconDoc, IconHistory, IconImage, IconLayers, IconUser, TinoBadge } from '../components/Icons'
import { useI18n } from '../i18n'
import pergola from '../assets/tino-pergola.webp'
import s from './Tino.module.css'

const capIcons = [IconBolt, IconDoc, IconCamera, IconImage, IconLayers, IconHistory]
const SNIPPET_SRC = import.meta.env.VITE_TINO_WIDGET_URL || 'https://…/v1/web/widget.js'

function Phone() {
  const { t } = useI18n()
  const ph = t.tino.phone
  return (
    <div className={s.phone} aria-hidden="true">
      <div className={s.screen}>
        <div className={s.phoneHead}>
          <span className={s.avatar}>MV</span>
          <span className={s.who}>
            <strong>{ph.company}</strong>
            <small>{ph.online}</small>
          </span>
        </div>
        <div className={`${s.chat} chat-seq`}>
          {ph.msgs.map((m) => (
            <span key={m.t} className={m.me ? s.me : s.bot}>
              {m.t}
            </span>
          ))}
          <span className={s.choices}>
            {ph.choices.map((c) => (
              <span key={c} className={s.choice}>
                {c}
              </span>
            ))}
          </span>
          <span className={`${s.bot} ${s.media}`}>
            <img src={pergola} alt="" width={640} height={427} />
            <span>{ph.imageCaption}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

/** Tarjeta tipo terminal con la línea real para instalar el chat. */
function Snippet() {
  const { t, lang } = useI18n()
  return (
    <div className={`${s.term} reveal`} aria-label="index.html">
      <div className={s.termBar}>
        <i />
        <i />
        <i />
        <span>index.html</span>
        <em>{t.common.copy}</em>
      </div>
      <pre className={s.code}>
        <span className={s.c}>{`<!-- ${t.tino.channels.snippetComment} -->`}</span>
        {'\n'}
        <span className={s.p}>{'<script'}</span>
        {'\n  '}
        <span className={s.k}>src</span>=<span className={s.s}>{`"${SNIPPET_SRC}"`}</span>
        {'\n  '}
        <span className={s.k}>data-key</span>=<span className={s.s}>"wk_…"</span>
        {'\n  '}
        <span className={s.k}>data-lang</span>=<span className={s.s}>{`"${lang}"`}</span>
        {'\n  '}
        <span className={s.k}>async</span>
        <span className={s.p}>{'></script>'}</span>
        <span className={s.cursor} />
      </pre>
    </div>
  )
}

export default function Tino() {
  const { t, path } = useI18n()
  const p = t.tino
  const [quoteSent, repNotified] = p.floats

  return (
    <>
      <Seo page="tino" />

      <section className="hero">
        <Backdrop />
        <div className={`wrap ${s.heroGrid}`}>
          <div className={`intro ${s.heroText}`}>
            <div className="product-tag">
              <TinoBadge />
              <span className="product-tag__name">TINO</span>
              <span className="chip chip--sm">{p.status}</span>
            </div>
            <h1 className="h1">
              <GradTitle parts={p.titleParts} />
            </h1>
            <p className="lead">{p.lead}</p>
            <div className="actions">
              <TalkButton to={path('tino', 'prueba')} className="btn btn--primary">
                {t.nav.tryIt} <Arrow />
              </TalkButton>
              <Link to={path('tino', 'como')} className="btn btn--ghost">
                {p.ctaHow} <Arrow />
              </Link>
            </div>
          </div>
          <div className={`${s.stage} enter-late`}>
            <Phone />
            <FloatCard className={s.f1} icon={<IconDoc />} color="var(--brand-teal-strong)" title={quoteSent.t} sub={quoteSent.s} />
            <FloatCard className={`float--2 ${s.f2}`} icon={<IconUser />} color="var(--brand-ink)" title={repNotified.t} sub={repNotified.s} />
          </div>
        </div>
      </section>

      <section id="como" className="section">
        <div className="wrap stack">
          <SectionHead index={1} eyebrow={p.caps.eyebrow} title={<GradTitle parts={p.caps.titleParts} />} />
          <div className="grid grid--3 reveal-children">
            {p.caps.items.map((c, i) => {
              const Icon = capIcons[i]
              return (
                <div key={c.t} className="card">
                  <span className="icon-box">
                    <Icon />
                  </span>
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="card__title">{c.t}</h3>
                  <p className="card__text">{c.d}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className={`wrap ${s.channels}`}>
          <div className={`reveal ${s.channelsText}`}>
            <span className="eyebrow">
              <b>02</b> {p.channels.eyebrow}
            </span>
            <h2 className="h2">{p.channels.title}</h2>
            <p className="lead">{p.channels.lead}</p>
            <div className="chips">
              {p.channels.chips.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <Snippet />
        </div>
      </section>

      <section className="section">
        <div className="wrap stack">
          <SectionHead index={3} eyebrow={p.control.eyebrow} title={p.control.title} />
          <div className="grid grid--3 reveal-children">
            {p.control.items.map((c, i) => (
              <div key={c.t} className="step">
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="card__title">{c.t}</h3>
                <p className="card__text">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prueba" className="section section--flush-top">
        <div className="wrap">
          <div className="band reveal">
            <div className="gridbg" aria-hidden="true" />
            <div className="band__text">
              <span className="eyebrow">{p.try.eyebrow}</span>
              <h2 className="h2">{p.try.title}</h2>
              <p className="lead">{p.try.lead}</p>
            </div>
            <TalkButton to={path('tino', 'prueba')} className="btn btn--primary btn--lg">
              {p.try.cta} <Arrow />
            </TalkButton>
          </div>
        </div>
      </section>
    </>
  )
}
