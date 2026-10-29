import type { ReactNode } from 'react'

function Icon({ children, size = 28 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export const IconCode = () => (
  <Icon>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M8 10l-2 2 2 2M16 10l2 2-2 2M13 9l-2 6" />
  </Icon>
)
export const IconLink = () => (
  <Icon>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <path d="M10 10l4 4" />
  </Icon>
)
export const IconSpark = () => (
  <Icon>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    <circle cx="12" cy="12" r="5" />
  </Icon>
)
export const IconCycle = () => (
  <Icon>
    <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
    <path d="M18 3v4h-4M6 21v-4h4" />
  </Icon>
)
export const IconChat = ({ size = 28 }: { size?: number }) => (
  <Icon size={size}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z" />
  </Icon>
)
export const IconGlobe = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </Icon>
)
export const IconCart = () => (
  <Icon>
    <path d="M3 4h2l2.4 11h11L21 8H7" />
    <circle cx="10" cy="19" r="1.5" />
    <circle cx="17" cy="19" r="1.5" />
  </Icon>
)
export const IconDoc = () => (
  <Icon>
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M14 3v5h5M9 13h7M9 17h5" />
  </Icon>
)
export const IconBox = () => (
  <Icon>
    <path d="M3 7l9-4 9 4-9 4-9-4z" />
    <path d="M3 7v10l9 4 9-4V7M12 11v10" />
  </Icon>
)
export const IconTruck = () => (
  <Icon>
    <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </Icon>
)
export const IconRuler = () => (
  <Icon>
    <path d="M3 17L17 3l4 4L7 21z" />
    <path d="M7 13l2 2M10 10l2 2M13 7l2 2" />
  </Icon>
)
export const IconChart = () => (
  <Icon>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </Icon>
)
export const IconBolt = () => (
  <Icon>
    <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
  </Icon>
)
export const IconCamera = () => (
  <Icon>
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </Icon>
)
export const IconImage = () => (
  <Icon>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="2" />
    <path d="M21 16l-5-5-9 9" />
  </Icon>
)
export const IconLayers = () => (
  <Icon>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
  </Icon>
)
export const IconHistory = () => (
  <Icon>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5M12 7v5l3 2" />
  </Icon>
)
export const IconUser = () => (
  <Icon>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </Icon>
)
export const IconCheck = () => (
  <Icon>
    <path d="M5 12l5 5L20 7" />
  </Icon>
)
export const IconLock = ({ size = 12 }: { size?: number }) => (
  <Icon size={size}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Icon>
)
export const IconMenu = ({ open }: { open: boolean }) => (
  <Icon size={24}>{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</Icon>
)

export function TinoBadge({ size = 40 }: { size?: number }) {
  return (
    <span className="tino-badge" style={{ width: size, height: size }} aria-hidden="true">
      <svg width={size * 0.6} height={size * 0.46} viewBox="0 0 26 20">
        <rect x="1" y="1" width="24" height="18" rx="6" fill="#14141A" />
        <rect x="7" y="6" width="4" height="8" rx="2" fill="#7FE3FF" />
        <rect x="15" y="6" width="4" height="8" rx="2" fill="#7FE3FF" />
      </svg>
    </span>
  )
}

export function StacklineBadge({ size = 40 }: { size?: number }) {
  return (
    <span className="stackline-badge" style={{ width: size, height: size }} aria-hidden="true">
      S
    </span>
  )
}
