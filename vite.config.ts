import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: process.env.BUILD_OUTDIR || '../mywebsite/dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/blog_api': 'http://localhost:8081',
      '/public_api': 'http://localhost:8081',
      '/internal_api': 'http://localhost:8081',
      '/auth_api': 'http://localhost:8081',
      '/admin_api': 'http://localhost:8081',
      '/avatar.png': 'http://localhost:8081',
      '/cv.pdf': 'http://localhost:8081',
      '/favicon.ico': 'http://localhost:8081',
    },
  },
})
