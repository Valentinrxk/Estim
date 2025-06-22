import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    // Optimizaciones de build
    rollupOptions: {
      output: {
        // Separar chunks por vendor
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          ui: ['@/components/ui/LoadingSpinner.vue', '@/components/ui/ErrorMessage.vue'],
          utils: ['@/utils/imageOptimization.js', '@/utils/performanceOptimizations.js'],
        },
      },
    },
    // Compresión
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Optimización de CSS
    cssCodeSplit: true,
    // Source maps solo en desarrollo
    sourcemap: process.env.NODE_ENV === 'development',
  },
  // Optimizaciones de servidor de desarrollo
  server: {
    hmr: {
      overlay: false,
    },
  },
  // Optimizaciones de dependencias
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['@/components/ui/Top5ReorderModal.vue'], // Lazy loaded
  },
})
