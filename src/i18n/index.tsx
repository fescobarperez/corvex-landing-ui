import { createContext, useContext, type ReactNode } from 'react'
import es, { type Dict } from './es'
import en from './en'

export type Lang = 'es' | 'en'
export type PageKey = 'home' | 'stackline' | 'tino'

export const LANGS: Lang[] = ['es', 'en']
const dicts: Record<Lang, Dict> = { es, en }

/** Ruta de cada página por idioma. Español es el idioma por defecto y va en la raíz. */
const PATHS: Record<PageKey, string> = { home: '/', stackline: '/stackline', tino: '/tino' }

export function pathFor(lang: Lang, page: PageKey, hash = ''): string {
  const base = PATHS[page]
  const p = lang === 'es' ? base : base === '/' ? '/en' : `/en${base}`
  return p + (hash ? `#${hash}` : '')
}

type I18n = { lang: Lang; t: Dict; path: (page: PageKey, hash?: string) => string }

const Ctx = createContext<I18n | null>(null)

export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value: I18n = { lang, t: dicts[lang], path: (page, hash) => pathFor(lang, page, hash) }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n(): I18n {
  const v = useContext(Ctx)
  if (!v) throw new Error('useI18n fuera de I18nProvider')
  return v
}
