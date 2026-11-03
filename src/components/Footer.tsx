import { Link } from './Link'
import { LogoMark } from './Logo'
import { useI18n } from '../i18n'
import s from './Footer.module.css'

export function Footer() {
  const { t, path } = useI18n()
  const f = t.footer
  const cols = [
    { title: f.cols.products, links: [[t.nav.stackline, path('stackline')], [t.nav.tino, path('tino')], [t.nav.custom, path('home', 'servicios')]] },
    { title: f.cols.stackline, links: [[f.links.pos, path('stackline', 'modulos')], [f.links.fel, path('stackline', 'modulos')], [f.links.inventory, path('stackline', 'modulos')], [f.links.quotes, path('stackline', 'modulos')]] },
    { title: f.cols.tino, links: [[f.links.whatsapp, path('tino', 'como')], [f.links.web, path('tino', 'como')], [f.links.languages, path('tino', 'idiomas')]] },
    { title: f.cols.company, links: [[f.links.how, path('home', 'como')], [f.links.faq, path('home', 'preguntas')], [f.links.contact, path('home', 'contacto')]] },
  ]
  return (
    <footer className={s.footer}>
      <div className="wrap">
        <div className={s.cols}>
          <div className={s.about}>
            <Link to={path('home')} className={s.brand} aria-label={t.nav.home}>
              <LogoMark size={28} />
              <span>Corvex</span>
            </Link>
            <p>{f.about}</p>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title} className={s.col}>
              <h2>{c.title}</h2>
              {c.links.map(([label, to]) => (
                <Link key={label} to={to}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className={s.legal}>
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} Corvex · {f.rights}
          </span>
        </div>
      </div>
    </footer>
  )
}
