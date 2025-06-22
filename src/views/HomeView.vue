<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HomeHeroSection from '@/components/ui/home/HomeHeroSection.vue'
import FeaturedGamesSection from '@/components/ui/home/FeaturedGamesSection.vue'
import RecommendedGamesSection from '@/components/ui/home/RecommendedGamesSection.vue'
import LoadingSpinner from '@/components/ui/common/LoadingSpinner.vue'

const router = useRouter()

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    default: false,
  },
})

// State
const showGameList = ref(false)
const games = ref([])
const loading = ref(false)
const error = ref(null)

// Constants
const FEATURED_GAMES = [
  {
    id: 3498,
    name: 'Grand Theft Auto V',
    background_image: 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
    rating: 4.47,
    genres: ['Action', 'Adventure'],
  },
  {
    id: 3328,
    name: 'The Witcher 3: Wild Hunt',
    background_image: 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
    rating: 4.66,
    genres: ['Action', 'RPG'],
  },
  {
    id: 4200,
    name: 'Portal 2',
    background_image: 'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg',
    rating: 4.62,
    genres: ['Shooter', 'Puzzle'],
  },
]

// Computed
const themeClasses = computed(() => ({
  background: props.isDarkMode
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',
}))

const backgroundElements = computed(() => [
  {
    position: '-top-40 -right-40',
    color: props.isDarkMode ? 'bg-cyan-500' : 'bg-blue-400',
    delay: '',
  },
  {
    position: '-bottom-40 -left-40',
    color: props.isDarkMode ? 'bg-pink-500' : 'bg-purple-400',
    delay: 'animation-delay-2000',
  },
  {
    position: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    size: 'w-60 h-60',
    color: props.isDarkMode ? 'bg-purple-500' : 'bg-pink-400',
    delay: 'animation-delay-1000',
    opacity: 'opacity-10',
  },
])

// Methods
const fetchGames = async () => {
  try {
    error.value = null
    const apiKey = import.meta.env.VITE_RAWG_API_KEY

    if (!apiKey || apiKey === 'your-actual-api-key-here') {
      console.warn('RAWG API key not configured')
      // Usar datos de ejemplo si no hay API key
      games.value = FEATURED_GAMES.slice(0, 6)
      return
    }

    const response = await fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&page_size=12&ordering=-rating`,
    )

    if (!response.ok) throw new Error('Failed to fetch games')

    const data = await response.json()
    games.value = data.results || []
  } catch (err) {
    error.value = {
      type: 'error',
      message: 'No se pudieron cargar los juegos recomendados',
      details: err.message,
    }
    console.error('Error fetching games:', err)
    // Fallback a juegos de ejemplo
    games.value = FEATURED_GAMES.slice(0, 6)
  }
}

const handleStartExploring = async () => {
  loading.value = true

  try {
    await fetchGames()
    showGameList.value = true
  } finally {
    loading.value = false
  }
}

const handleRetryFetch = () => {
  fetchGames()
}

const navigateToGame = (gameId) => {
  router.push(`/game/${gameId}`)
}

const navigateToGames = () => {
  router.push('/games')
}

onMounted(() => {
  // Preload featured game images
  FEATURED_GAMES.forEach((game) => {
    const img = new Image()
    img.src = game.background_image
  })
})
</script>

<template>
  <div class="min-h-screen transition-all duration-500" :class="themeClasses.background">
    <!-- Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        v-for="(element, index) in backgroundElements"
        :key="index"
        class="absolute rounded-full mix-blend-multiply filter blur-xl animate-pulse"
        :class="[
          element.position,
          element.size || 'w-80 h-80',
          element.color,
          element.opacity || 'opacity-20',
          element.delay,
        ]"
      />
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 py-8">
      <HomeHeroSection
        :is-dark-mode="isDarkMode"
        :loading="loading"
        :show-game-list="showGameList"
        @start-exploring="handleStartExploring"
      />

      <FeaturedGamesSection
        :is-dark-mode="isDarkMode"
        :games="FEATURED_GAMES"
        @game-click="navigateToGame"
      />

      <RecommendedGamesSection
        v-if="showGameList"
        :is-dark-mode="isDarkMode"
        :games="games"
        :loading="loading"
        :error="error"
        @game-click="navigateToGame"
        @view-all="navigateToGames"
        @retry="handleRetryFetch"
      />
    </div>
  </div>
</template>

<style scoped>
.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
