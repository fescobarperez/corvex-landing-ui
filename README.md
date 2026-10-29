# corvex-landing-ui

Landing de **Corvex** con las páginas de **Stackline** y **TINO**. Sitio estático en español (raíz) e inglés (`/en`), prerenderizado a HTML para SEO y servido desde S3 + CloudFront.

## Stack

- Vite 8 + React 18 + TypeScript
- [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg): genera un `index.html` por ruta en el build (sin servidor)
- React Router 6 (navegación con transiciones de vista)
- CSS Modules por componente + `src/styles/tokens.css` (colores, tipografía, espacios)
- Animaciones solo con CSS (aparición al hacer scroll con `animation-timeline`, respetan `prefers-reduced-motion`); la red del hero es un SVG con animación nativa (`src/assets/network.svg`)

## Comandos

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173
npm run build      # typecheck + prerender a dist/ + sitemap.xml y robots.txt
npm run preview    # sirve dist/ como CloudFront (rutas /stackline -> /stackline/index.html, 404)
```

## Variables de entorno

Copia `.env.example` a `.env` (no se sube a git).

| Variable | Uso |
| --- | --- |
| `VITE_SITE_URL` | Dominio público sin `/` final. Canonical, hreflang, Open Graph y sitemap. Vacío: no se genera sitemap. |
| `VITE_TINO_WIDGET_URL` | URL de `widget.js` del canal web de agents-services. |
| `VITE_TINO_WIDGET_KEY` | Clave pública del canal web (`wk_...`). Sin URL o clave, los botones "Habla con TINO" llevan a la sección de contacto. |

## Rutas

| ES | EN |
| --- | --- |
| `/` | `/en` |
| `/stackline` | `/en/stackline` |
| `/tino` | `/en/tino` |
| `/404` (página de error, `noindex`) | — |

Textos en `src/i18n/es.ts` y `src/i18n/en.ts` (el inglés está tipado contra el español: si falta una clave, no compila).

## Chat de TINO

Se carga en el navegador desde agents-services (`/v1/web/widget.js`) con la clave del canal web de Corvex. El widget trae su burbuja; los botones del sitio lo abren con `window.StacklineChat.open()`. Requisitos:

1. Corvex dado de alta como empresa en Stackline, con un agente asignado.
2. Un canal web creado en la consola con el dominio de la landing en *dominios permitidos*.

## Despliegue (AWS)

- **S3** privado (sin hosting de sitio web) + **CloudFront** con OAC y certificado de **ACM** (us-east-1).
- **CloudFront Function** `infra/cloudfront-function.js` asociada a *viewer request* del comportamiento por defecto.
- Página de error: 403/404 → `/404/index.html` con código 404.
- **GitHub Actions** (`.github/workflows/deploy.yml`) en cada push a `main`: build, `s3 sync` y invalidación. Autenticación por OIDC (sin llaves).

Variables del repositorio (Settings → Secrets and variables → Actions → *Variables*, entorno `production`):

| Variable | Ejemplo |
| --- | --- |
| `AWS_ROLE_ARN` | `arn:aws:iam::123456789012:role/corvex-landing-deploy` |
| `AWS_REGION` | `us-east-1` |
| `S3_BUCKET` | `corvex-landing` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E1ABCDEF...` |
| `SITE_URL` | `https://corvex...` |
| `TINO_WIDGET_URL` / `TINO_WIDGET_KEY` | URL de `widget.js` y clave pública del canal web |

El rol solo necesita `s3:ListBucket`, `s3:PutObject`, `s3:DeleteObject` sobre el bucket y `cloudfront:CreateInvalidation` sobre la distribución.

## Pendientes

- Dominio definitivo (`VITE_SITE_URL`).
- Imagen para redes `public/og.png` (1200×630).
- Política de privacidad (enlace en el pie).
- Píxel de Meta y etiqueta de Google, con aviso de cookies, cuando se active publicidad.
