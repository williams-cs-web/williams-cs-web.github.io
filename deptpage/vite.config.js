import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import adminApiPlugin from './vite-plugins/admin-api-plugin.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), adminApiPlugin()],
  server: {
    // images/ and articles/ are symlinks to the repo-root copies that
    // GitHub Pages serves, so allow the dev server to follow them there.
    fs: { allow: ['..'] },
    watch: {
      // The admin panel (deptpage/src/admin) writes these files directly.
      // Without ignoring them, every admin save triggers Vite's watcher to
      // invalidate db.js's static JSON imports and full-reload any open
      // tab -- including the admin tab itself, mid-edit.
      ignored: ['**/data/*.json', '**/articles/**', '**/images/**'],
    },
  },
})
