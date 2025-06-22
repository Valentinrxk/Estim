// utils/imageOptimization.js
export const preloadCriticalImages = (images) => {
  images.forEach((src, index) => {
    if (index < 3) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    }
  })
}

export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]')
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute('data-src')
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

export const optimizeImageFormat = (src, format = 'webp') => {
  if (!src) return '/placeholder.svg?height=300&width=400'

  if (src.includes('rawg.io')) {
    return src.replace(/\.(jpg|jpeg|png)$/i, `.${format}`)
  }

  return src
}
