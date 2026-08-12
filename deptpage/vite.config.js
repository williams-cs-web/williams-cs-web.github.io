import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // images/ and articles/ are symlinks to the repo-root copies that
    // GitHub Pages serves, so allow the dev server to follow them there.
    fs: { allow: ['..'] },
  },
})
