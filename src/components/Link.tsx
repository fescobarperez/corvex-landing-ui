import { Link as RRLink, type LinkProps } from 'react-router-dom'

/** Link interno con transición de vista entre páginas (si el navegador la soporta). */
export function Link(props: LinkProps) {
  return <RRLink viewTransition {...props} />
}
