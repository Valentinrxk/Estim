import { ref, computed } from 'vue'

const top5Games = ref([])
const MAX_TOP5 = 5

export function useTop5() {
  // Cargar desde localStorage al inicializar
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('gamehub-top5')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          top5Games.value = parsed
        }
      }
    } catch (error) {
      console.error('Error loading Top 5 from storage:', error)
    }
  }

  // Guardar en localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem('gamehub-top5', JSON.stringify(top5Games.value))
    } catch (error) {
      console.error('Error saving Top 5 to storage:', error)
    }
  }

  // Agregar juego al Top 5
  const addToTop5 = (game) => {
    // Verificar si ya existe
    if (isInTop5(game.id)) {
      return {
        success: false,
        type: 'duplicate',
        message: `${game.name} ya está en tu Top 5`,
      }
    }

    // Verificar si hay espacio
    if (top5Games.value.length >= MAX_TOP5) {
      return {
        success: false,
        type: 'full',
        message: `Tu Top 5 está completo. Usa el modal de reordenamiento para hacer cambios.`,
      }
    }

    // Agregar el juego con timestamp
    const gameWithTimestamp = {
      ...game,
      addedAt: new Date().toISOString(),
    }

    top5Games.value.push(gameWithTimestamp)
    saveToStorage()

    return {
      success: true,
      message: `¡${game.name} agregado a tu Top 5!`,
    }
  }

  // Remover juego del Top 5
  const removeFromTop5 = (gameId) => {
    const index = top5Games.value.findIndex((game) => game.id === gameId)
    if (index !== -1) {
      const removedGame = top5Games.value[index]
      top5Games.value.splice(index, 1)
      saveToStorage()
      return {
        success: true,
        message: `${removedGame.name} removido del Top 5`,
      }
    }
    return {
      success: false,
      message: 'Juego no encontrado en el Top 5',
    }
  }

  // Reordenar Top 5 completo
  const reorderTop5 = (newOrder) => {
    if (Array.isArray(newOrder)) {
      top5Games.value = [...newOrder]
      saveToStorage()
      return {
        success: true,
        message: 'Top 5 reordenado exitosamente',
      }
    }
    return {
      success: false,
      message: 'Error al reordenar el Top 5',
    }
  }

  // Limpiar Top 5
  const clearTop5 = () => {
    top5Games.value = []
    saveToStorage()
    return {
      success: true,
      message: 'Top 5 limpiado',
    }
  }

  // Verificar si un juego está en el Top 5
  const isInTop5 = (gameId) => {
    return top5Games.value.some((game) => game.id === gameId)
  }

  // Obtener estadísticas
  const getStats = () => {
    const total = top5Games.value.length
    const averageRating =
      total > 0
        ? (top5Games.value.reduce((sum, game) => sum + (game.rating || 0), 0) / total).toFixed(1)
        : '0.0'

    return {
      total,
      averageRating,
      isFull: total >= MAX_TOP5,
      hasGames: total > 0,
    }
  }

  // Computed properties
  const currentTop5 = computed(() => top5Games.value)
  const isTop5Full = computed(() => top5Games.value.length >= MAX_TOP5)
  const top5Count = computed(() => top5Games.value.length)

  // Inicializar al crear el composable
  loadFromStorage()

  return {
    // State
    currentTop5,
    isTop5Full,
    top5Count,

    // Actions
    addToTop5,
    removeFromTop5,
    reorderTop5,
    clearTop5,
    isInTop5,
    getStats,

    // Utils
    loadFromStorage,
    saveToStorage,
  }
}
