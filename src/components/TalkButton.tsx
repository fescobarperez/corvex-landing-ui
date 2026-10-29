import type { MouseEvent, ReactNode } from 'react'
import { Link } from './Link'
import { openTino } from '../lib/tino'

type Props = { to: string; className?: string; children: ReactNode; 'aria-label'?: string }

/** Abre el chat de TINO; si no está disponible, navega a la sección de contacto (`to`). */
export function TalkButton({ to, className, children, ...rest }: Props) {
  const onClick = (e: MouseEvent) => {
    if (openTino()) e.preventDefault()
  }
  return (
    <Link to={to} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  )
}
