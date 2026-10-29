import { Link } from './Link'
import { LogoMark } from './Logo'
import { useI18n } from '../i18n'
import s from './Footer.module.css'

export function Footer() {
  const { t, path } = useI18n()
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.inner}`}>
        <Link to={path('home')} className={s.brand} aria-label={t.nav.home}>
          <LogoMark size={28} />
          <strong>Corvex</strong>
          <span className={s.copy} suppressHydrationWarning>
            © {new Date().getFullYear()} · {t.footer.rights}
          </span>
        </Link>
        <nav aria-label={t.footer.nav} className={s.nav}>
          <Link to={path('stackline')}>{t.nav.stackline}</Link>
          <Link to={path('tino')}>{t.nav.tino}</Link>
          <Link to={path('home', 'servicios')}>{t.nav.custom}</Link>
        </nav>
      </div>
    </footer>
  )
}
