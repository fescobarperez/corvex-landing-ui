import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { I18nProvider, useI18n, type Lang } from '../i18n'
import { loadTino, tinoEnabled } from '../lib/tino'
import { Header, pageFromPath } from './Header'
import { Footer } from './Footer'
import { TalkButton } from './TalkButton'
import { IconChat } from './Icons'

/** Lleva al ancla (#seccion) o arriba al cambiar de página. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

/** Foco de luz que sigue al cursor dentro de las tarjetas (.card). Un solo listener para todo el sitio. */
function useCardSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.('.card') as HTMLElement | null
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
}

/** true cuando el widget de TINO ya está montado (trae su propia burbuja). */
function useTinoReady(): boolean {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!tinoEnabled) return
    if (window.StacklineChat) {
      setReady(true)
      return
    }
    const onReady = () => setReady(true)
    window.addEventListener('stackline-chat:ready', onReady)
    return () => window.removeEventListener('stackline-chat:ready', onReady)
  }, [])
  return ready
}

/**
 * Burbuja de respaldo: lleva a la sección de contacto. Se oculta en cuanto el
 * widget de TINO está listo; si no está configurado o no carga, se queda.
 */
function ChatFab() {
  const { t, path } = useI18n()
  const { pathname } = useLocation()
  const tinoReady = useTinoReady()
  if (tinoReady) return null
  const page = pageFromPath(pathname)
  const to = page === 'stackline' ? path('stackline', 'demo') : page === 'tino' ? path('tino', 'prueba') : path('home', 'contacto')
  return (
    <TalkButton to={to} className="chat-fab" aria-label={t.chat.open}>
      <IconChat size={26} />
    </TalkButton>
  )
}

function SkipLink() {
  const { t } = useI18n()
  return (
    <a className="skip" href="#contenido">
      {t.nav.skip}
    </a>
  )
}

export function Layout({ lang }: { lang: Lang }) {
  useEffect(() => loadTino(lang), [lang])
  useCardSpotlight()
  return (
    <I18nProvider lang={lang}>
      <SkipLink />
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
      <ChatFab />
      <ScrollManager />
    </I18nProvider>
  )
}
