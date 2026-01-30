import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite' //

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(), //
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  optimizeDeps: {
    include: [
      '@embedpdf/core',
      '@embedpdf/core/vue',
      '@embedpdf/engines',
      '@embedpdf/engines/vue',
      '@embedpdf/plugin-document-manager',
      '@embedpdf/plugin-document-manager/vue',
      '@embedpdf/plugin-viewport',
      '@embedpdf/plugin-viewport/vue',
      '@embedpdf/plugin-scroll',
      '@embedpdf/plugin-scroll/vue',
      '@embedpdf/plugin-render',
      '@embedpdf/plugin-render/vue',
      '@embedpdf/plugin-zoom',
      '@embedpdf/plugin-zoom/vue'
    ]
  },
  server: {
    fs: {
      allow: ['..']
    },
    host: '127.0.0.1',
    port: 3009 ,
    proxy: {
      '/api': 'http://127.0.0.1:8000',
      '/storage': 'http://127.0.0.1:8000'
    }
  }
})
