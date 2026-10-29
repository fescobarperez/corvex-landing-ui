export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <rect x="32" y="32" width="15" height="15" rx="1.5" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="53" y="53" width="15" height="15" rx="1.5" fill="none" stroke="currentColor" strokeWidth="4" />
      <line x1="46.5" y1="46.5" x2="53.5" y2="53.5" stroke="var(--brand-teal)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
