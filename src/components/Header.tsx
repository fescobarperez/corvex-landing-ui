import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from './Link'
import { LogoMark } from './Logo'
import { IconMenu } from './Icons'
import { TalkButton } from './TalkButton'
import { Arrow } from './Ui'
import { useI18n, pathFor, type PageKey } from '../i18n'
import s from './Header.module.css'

export function pageFromPath(pathname: string): PageKey {
  const p = pathname.replace(/^\/en(?=\/|$)/, '').replace(/\/$/, '')
  if (p === '/stackline') return 'stackline'
  if (p === '/tino') return 'tino'
  return 'home'
}

export function Header() {
  const { lang, t, path } = useI18n()
  const { pathname, hash } = useLocation()
  const page = pageFromPath(pathname)
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname, hash])

  const cta =
    page === 'stackline'
      ? { to: path('stackline', 'demo'), label: t.nav.demo }
      : page === 'tino'
        ? { to: path('tino', 'prueba'), label: t.nav.tryIt }
        : { to: path('home', 'contacto'), label: t.nav.talk }

  const links = [
    { to: path('stackline'), label: t.nav.stackline, current: page === 'stackline' },
    { to: path('tino'), label: t.nav.tino, current: page === 'tino' },
    { to: path('home', 'servicios'), label: t.nav.custom, current: false },
    { to: path('home', 'como'), label: t.nav.how, current: false },
  ]

  return (
    <header className={s.header}>
      <div className={`wrap ${s.bar}`}>
        <Link to={path('home')} className={s.brand} aria-label={t.nav.home}>
          <LogoMark />
          <span>Corvex</span>
        </Link>

        <nav className={`${s.nav} ${open ? s.navOpen : ''}`} aria-label={t.nav.main} id="menu-principal">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={s.navLink} aria-current={l.current ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={s.right}>
          <div className={s.lang} role="group" aria-label={t.nav.language}>
            {(['es', 'en'] as const).map((l) => (
              <Link
                key={l}
                to={pathFor(l, page)}
                className={s.langBtn}
                aria-current={l === lang ? 'true' : undefined}
                hrefLang={l}
                lang={l}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <TalkButton to={cta.to} className={`btn btn--dark btn--sm ${s.cta}`}>
            {cta.label} <Arrow />
          </TalkButton>
          <button
            type="button"
            className={s.menuBtn}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? t.nav.closeMenu : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <IconMenu open={open} />
          </button>
        </div>
      </div>
    </header>
  )
}
