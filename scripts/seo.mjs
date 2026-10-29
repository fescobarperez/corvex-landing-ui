// Genera dist/sitemap.xml y dist/robots.txt después del build, a partir de VITE_SITE_URL.
import { writeFileSync } from 'node:fs'
import { loadEnv } from 'vite'

const env = loadEnv(process.env.MODE ?? 'production', process.cwd(), 'VITE_')
const site = (env.VITE_SITE_URL ?? '').replace(/\/$/, '')

const pages = ['/', '/stackline', '/tino']
const en = (p) => (p === '/' ? '/en' : `/en${p}`)

if (!site) {
  writeFileSync('dist/robots.txt', 'User-agent: *\nAllow: /\n')
  console.warn('[seo] VITE_SITE_URL vacío: no se generó sitemap.xml')
  process.exit(0)
}

const url = (p, alts) => `  <url>
    <loc>${site}${p}</loc>
${alts.map(([l, h]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${site}${h}"/>`).join('\n')}
  </url>`

const entries = pages.flatMap((p) => {
  const alts = [['es', p], ['en', en(p)], ['x-default', p]]
  return [url(p, alts), url(en(p), alts)]
})

writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`,
)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
console.log(`[seo] sitemap.xml (${entries.length} URLs) y robots.txt generados para ${site}`)
