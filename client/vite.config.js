// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pc: resolve(__dirname, 'pc/index.html'),
        mobile: resolve(__dirname, 'mobile/index.html'),
      },
    },
    outDir: '../server/dist',
    emptyOutDir: true,
  },
})
