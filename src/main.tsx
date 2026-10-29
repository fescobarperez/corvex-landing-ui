// Primero los estilos globales: los CSS Modules de cada componente deben ir después para poder sobrescribirlos.
import './styles/global.css'
import { ViteReactSSG } from 'vite-react-ssg'
import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Stackline from './pages/Stackline'
import Tino from './pages/Tino'
import NotFound from './pages/NotFound'

// Función (no constante): React Router asigna un id a cada objeto de ruta y no se pueden compartir.
const pages = (): RouteRecord[] => [
  { index: true, element: <Home /> },
  { path: 'stackline', element: <Stackline /> },
  { path: 'tino', element: <Tino /> },
]

/** Español en la raíz, inglés bajo /en. Cada ruta se prerenderiza a HTML estático. */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout lang="es" />,
    children: [...pages(), { path: '404', element: <NotFound /> }],
  },
  { path: '/en', element: <Layout lang="en" />, children: pages() },
]

export const createRoot = ViteReactSSG({ routes })
