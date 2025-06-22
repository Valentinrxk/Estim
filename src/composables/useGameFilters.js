import { ref, computed } from 'vue'

export function useGameFilters() {
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY
  const BASE_URL = 'https://api.rawg.io/api'

  const loading = ref(false)
  const games = ref([])
  const currentPage = ref(1)
  const totalResults = ref(0)
  const totalPages = ref(0)
  const pageSize = 20

  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPreviousPage = computed(() => currentPage.value > 1)

  const buildApiUrl = () => {
    const baseUrl = `${BASE_URL}/games`
    const params = new URLSearchParams()

    if (API_KEY && API_KEY !== 'your-api-key-here') {
      params.append('key', API_KEY)
    }

    params.append('page', currentPage.value.toString())
    params.append('page_size', pageSize.toString())

    params.append('ordering', '-metacritic,-rating,-added')
    params.append('metacritic', '70,100')
    params.append('dates', '2000-01-01,2024-12-31')
    params.append('platforms', '4,187,18,1,186')
    return `${baseUrl}?${params.toString()}`
  }

  const searchGames = async () => {
    loading.value = true
    try {
      const url = buildApiUrl()
      console.log('Fetching games from:', url)

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      games.value = data.results || []
      totalResults.value = data.count || 0
      totalPages.value = Math.ceil(totalResults.value / pageSize)

      console.log('Games loaded:', {
        count: games.value.length,
        total: totalResults.value,
        pages: totalPages.value,
        currentPage: currentPage.value,
      })
    } catch (error) {
      console.error('Error fetching games:', error)
      games.value = []
      totalResults.value = 0
      totalPages.value = 0
    } finally {
      loading.value = false
    }
  }

  const goToPage = (page) => {
    currentPage.value = page
    searchGames()
  }

  const nextPage = () => {
    if (hasNextPage.value) {
      goToPage(currentPage.value + 1)
    }
  }

  const previousPage = () => {
    if (hasPreviousPage.value) {
      goToPage(currentPage.value - 1)
    }
  }

  return {
    // State
    currentPage,
    loading,
    games,
    totalResults,
    totalPages,

    // Computed
    hasNextPage,
    hasPreviousPage,

    // Actions
    searchGames,
    goToPage,
    nextPage,
    previousPage,
  }
}

export default useGameFilters
