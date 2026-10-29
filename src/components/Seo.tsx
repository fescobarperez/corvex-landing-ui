import { Head } from 'vite-react-ssg'
import { useI18n, pathFor, type PageKey } from '../i18n'

const SITE = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

type Props = { page: PageKey | 'notFound'; jsonLd?: object }

export function Seo({ page, jsonLd }: Props) {
  const { lang, t } = useI18n()
  const meta = t.meta[page]
  const indexable = page !== 'notFound'
  const url = (l: 'es' | 'en') => (indexable ? SITE + pathFor(l, page as PageKey) : '')
  const ogImage = SITE ? `${SITE}/og.png` : '/og.png'

  return (
    <Head>
      <html lang={lang} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {!indexable && <meta name="robots" content="noindex" />}
      {indexable && SITE && <link rel="canonical" href={url(lang)} />}
      {indexable && SITE && <link rel="alternate" hrefLang="es" href={url('es')} />}
      {indexable && SITE && <link rel="alternate" hrefLang="en" href={url('en')} />}
      {indexable && SITE && <link rel="alternate" hrefLang="x-default" href={url('es')} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={t.meta.siteName} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:locale" content={lang === 'es' ? 'es_GT' : 'en_US'} />
      {indexable && SITE && <meta property="og:url" content={url(lang)} />}
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Head>
  )
}
