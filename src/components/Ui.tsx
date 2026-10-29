import type { CSSProperties, ReactNode } from 'react'

/** Flecha que se desliza al pasar el mouse por el botón. */
export const Arrow = () => (
  <span className="btn__arrow" aria-hidden="true">
    →
  </span>
)

/** Título con una parte resaltada en degradado: [antes, resaltado, después?]. */
export function GradTitle({ parts, wine = false }: { parts: string[]; wine?: boolean }) {
  const [a, hi, b] = parts
  return (
    <>
      {a} <span className={`grad${wine ? ' grad--wine' : ''}`}>{hi}</span>
      {b ? ` ${b}` : ''}
    </>
  )
}

type HeadProps = {
  index?: number
  eyebrow: string
  title: ReactNode
  lead?: string
  wine?: boolean
  className?: string
}

/** Encabezado de sección: etiqueta numerada en mono, título y texto. */
export function SectionHead({ index, eyebrow, title, lead, wine, className = '' }: HeadProps) {
  return (
    <div className={`head reveal ${className}`}>
      <span className={`eyebrow${wine ? ' eyebrow--wine' : ''}`}>
        {index !== undefined && <b>{String(index).padStart(2, '0')}</b>} {eyebrow}
      </span>
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  )
}

/** Fondo de cuadrícula fina + resplandores. */
export function Backdrop({ aurora = 'teal' }: { aurora?: 'teal' | 'wine' | 'none' }) {
  return (
    <>
      <div className="gridbg" aria-hidden="true" />
      {aurora === 'teal' && (
        <>
          <div className="aurora aurora--a" aria-hidden="true" />
          <div className="aurora aurora--b" aria-hidden="true" />
        </>
      )}
      {aurora === 'wine' && (
        <>
          <div className="aurora aurora--wine" aria-hidden="true" />
          <div className="aurora aurora--a aurora--dim" aria-hidden="true" />
        </>
      )}
    </>
  )
}

type FloatProps = { icon: ReactNode; color: string; title: string; sub: string; className?: string; style?: CSSProperties }

/** Tarjeta flotante con un evento del sistema (decorativa). */
export function FloatCard({ icon, color, title, sub, className = '', style }: FloatProps) {
  return (
    <div className={`float ${className}`} style={style} aria-hidden="true">
      <span className="float__icon" style={{ background: color }}>
        {icon}
      </span>
      <span>
        {title}
        <small>{sub}</small>
      </span>
    </div>
  )
}

/** Marco de navegador para capturas de pantalla. */
export function BrowserFrame({ label, children, className = '' }: { label: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`browser ${className}`}>
      <div className="browser__bar">
        <span className="browser__dot" />
        <span className="browser__dot" />
        <span className="browser__dot" />
        <span className="browser__url">{label}</span>
      </div>
      {children}
    </div>
  )
}
