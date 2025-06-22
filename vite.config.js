import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { compression } from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    vue(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          ui: [
            '@/components/ui/common/LoadingSpinner.vue',
            '@/components/ui/common/ErrorMessage.vue',
            '@/components/ui/common/NotificationToast.vue',
            '@/components/ui/common/BackButton.vue',
          ],
          game: [
            '@/components/ui/game/GameHeroSection.vue',
            '@/components/ui/game/GameDescription.vue',
            '@/components/ui/game/GameScreenshots.vue',
            '@/components/ui/game/GameInfoSidebar.vue',
          ],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        unused: true,
        dead_code: true,
      },
      mangle: {
        safari10: true,
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
    target: 'esnext',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['@/components/ui/common/Top5ReorderModal.vue'],
  },
  css: {
    devSourcemap: false,
  },
})
