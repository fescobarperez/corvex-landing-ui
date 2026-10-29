/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_TINO_WIDGET_URL?: string
  readonly VITE_TINO_WIDGET_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  StacklineChat?: { open: () => void; close: () => void }
}
