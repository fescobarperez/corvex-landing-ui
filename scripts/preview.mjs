// Sirve dist/ igual que CloudFront + infra/cloudfront-function.js:
// /stackline -> /stackline/index.html, rutas inexistentes -> /404/index.html (status 404).
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), 'dist')
const port = Number(process.env.PORT ?? 4173)
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.png': 'image/png', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain',
}

async function file(p) {
  try { return (await stat(p)).isFile() ? p : null } catch { return null }
}

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)
  const safe = normalize(url).replace(/^(\.\.[/\\])+/, '')
  let p = extname(safe) ? await file(join(root, safe)) : await file(join(root, safe, 'index.html'))
  let status = 200
  if (!p) { p = join(root, '404', 'index.html'); status = 404 }
  res.writeHead(status, { 'content-type': types[extname(p)] ?? 'application/octet-stream' })
  res.end(await readFile(p))
}).listen(port, () => console.log(`dist/ en http://localhost:${port}`))
