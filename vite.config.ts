import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // vite-react-ssg: una carpeta por ruta (/stackline/index.html) para servir desde S3 + CloudFront
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'none',
  },
})
