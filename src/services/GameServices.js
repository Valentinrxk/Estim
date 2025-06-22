import { API_CONFIG } from '@/constants/gameConstants'

class GameService {
  constructor() {
    this.apiKey = import.meta.env.VITE_RAWG_API_KEY || 'your-api-key-here'
    this.baseUrl = API_CONFIG.BASE_URL
  }

  buildUrl(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`)

    if (this.apiKey && this.apiKey !== 'your-api-key-here') {
      url.searchParams.append('key', this.apiKey)
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, value.toString())
      }
    })

    return url.toString()
  }

  async fetchGames(options = {}) {
    const {
      page = 1,
      pageSize = API_CONFIG.DEFAULT_PAGE_SIZE,
      ordering = '-metacritic,-rating',
    } = options

    try {
      const url = this.buildUrl(API_CONFIG.ENDPOINTS.GAMES, {
        page,
        page_size: pageSize,
        ordering,
        metacritic: '70,100', // Solo juegos con metacritic score alto
        dates: '2015-01-01,2024-12-31', // Juegos de los últimos años
      })

      console.log('Fetching games from:', url)

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      return {
        games: data.results || [],
        totalResults: data.count || 0,
        totalPages: Math.ceil((data.count || 0) / pageSize),
        success: true,
      }
    } catch (error) {
      console.error('Error fetching games:', error)
      return {
        games: [],
        totalResults: 0,
        totalPages: 0,
        success: false,
        error: error.message,
      }
    }
  }

  async fetchGameById(id) {
    try {
      const url = this.buildUrl(`${API_CONFIG.ENDPOINTS.GAME_DETAIL}/${id}`)

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      return {
        game: data,
        success: true,
      }
    } catch (error) {
      console.error('Error fetching game:', error)
      return {
        game: null,
        success: false,
        error: error.message,
      }
    }
  }

  filterGamesWithRating(games) {
    return games.filter((game) => {
      return game.rating && game.rating > 0 && !isNaN(game.rating) && game.rating !== null
    })
  }
}

export const gameService = new GameService()
export default gameService
