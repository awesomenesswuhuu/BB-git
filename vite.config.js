// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Set base to your repo's exact name, with leading & trailing slashes.
export default defineConfig({
  plugins: [react()],
  base: '/BB-git/', // e.g. '/beauty-kiosk-client-simple/'
})
