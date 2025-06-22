// Utilidades para optimización de imágenes
export const imageOptimization = {
  // Generar URLs optimizadas
  getOptimizedUrl(originalUrl, options = {}) {
    const { width = 400, height = 300, quality = 80, format = 'webp' } = options

    if (!originalUrl) {
      return `/placeholder.svg?height=${height}&width=${width}`
    }

    // Para imágenes de RAWG API
    if (originalUrl.includes('media.rawg.io')) {
      // RAWG no soporta parámetros de optimización, pero podemos usar un proxy
      return originalUrl
    }

    return originalUrl
  },

  // Precargar imágenes críticas
  preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  },

  // Lazy loading con Intersection Observer
  createLazyLoader() {
    if ('IntersectionObserver' in window) {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target
              if (img.dataset.src) {
                img.src = img.dataset.src
                img.removeAttribute('data-src')
              }
            }
          })
        },
        {
          rootMargin: '50px',
        },
      )
    }
    return null
  },

  // Convertir a WebP si es soportado
  supportsWebP() {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
  },
}
