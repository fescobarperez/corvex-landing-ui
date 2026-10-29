import { useId, useState } from 'react'
import s from './Faq.module.css'

type Item = { q: string; a: string }

export function Faq({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0)
  const id = useId()
  return (
    <div className={`${s.list} reveal-children`}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.q} className={s.item}>
            <h3 className={s.h}>
              <button
                type="button"
                className={s.q}
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{it.q}</span>
                <span className={s.sign} aria-hidden="true" />
              </button>
            </h3>
            <div id={`${id}-${i}`} className={s.a} data-open={isOpen} role="region">
              <div>
                <p>{it.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
