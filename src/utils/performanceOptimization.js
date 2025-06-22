// Utilidades de optimización de performance
import { defineAsyncComponent } from 'vue'

export const performanceUtils = {
  // Debounce para eventos frecuentes
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Throttle para scroll events
  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments

      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  // Lazy loading de componentes
  createAsyncComponent(importFn, options = {}) {
    return defineAsyncComponent({
      loader: importFn,
      loadingComponent: options.loading || null,
      errorComponent: options.error || null,
      delay: options.delay || 200,
      timeout: options.timeout || 3000,
    })
  },

  // Preload de recursos críticos
  preloadResource(href, as = 'script') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    document.head.appendChild(link)
  },

  // Optimización de bundle splitting
  chunkComponents: {
    // Componentes que se cargan bajo demanda
    Modal: () => import('@/components/ui/Top5ReorderModal.vue'),
    GameCard: () => import('@/components/ui/GameCard.vue'),
    LoadingSpinner: () => import('@/components/ui/LoadingSpinner.vue'),
  },

  // Medición de performance
  measurePerformance(name, fn) {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
    return result
  },

  // Cache de resultados computados
  createMemoCache() {
    const cache = new Map()
    return {
      get(key, computeFn) {
        if (cache.has(key)) {
          return cache.get(key)
        }
        const result = computeFn()
        cache.set(key, result)
        return result
      },
      clear() {
        cache.clear()
      },
    }
  },
}
