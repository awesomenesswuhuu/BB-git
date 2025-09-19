import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/BB-git/', // works on GitHub Pages under /<repo>/ path
})
