<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  isDarkMode: Boolean,
})

const showGameList = ref(false)
const games = ref([])
const loading = ref(false)

const featuredGames = [
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

const comenzarExplorar = async () => {
  loading.value = true

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&page_size=12&ordering=-rating`,
    )
    const data = await response.json()
    games.value = data.results || []
    showGameList.value = true
  } catch (error) {
    console.error('Error fetching games:', error)
  } finally {
    loading.value = false
  }
}

const goToGameDetail = (gameId) => {
  router.push(`/game/${gameId}`)
}

const goToGames = () => {
  router.push('/games')
}

onMounted(() => {
  // Auto-load featured games
})
</script>

<template>
  <div
    class="min-h-screen transition-all duration-500"
    :class="
      props.isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    "
  >
    <!-- Fondo animado -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        :class="props.isDarkMode ? 'bg-cyan-500' : 'bg-blue-400'"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
        :class="props.isDarkMode ? 'bg-pink-500' : 'bg-purple-400'"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-1000"
        :class="props.isDarkMode ? 'bg-purple-500' : 'bg-pink-400'"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 py-8">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <div class="mb-8">
          <h1
            class="text-5xl lg:text-7xl font-bold mb-6 transition-colors duration-500"
            :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
          >
            🎮
            <span
              class="bg-gradient-to-r bg-clip-text text-transparent"
              :class="
                props.isDarkMode
                  ? 'from-cyan-400 via-purple-400 to-pink-400'
                  : 'from-blue-600 via-purple-600 to-pink-600'
              "
            >
              ESTIM
            </span>
            🎮
          </h1>
          <p
            class="text-xl lg:text-2xl mb-8 transition-colors duration-500"
            :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-600'"
          >
            Descubrí tu proximo juego épico
          </p>

          <!-- Línea decorativa -->
          <div
            class="w-32 h-1 mx-auto rounded-full transition-colors duration-500"
            :class="
              props.isDarkMode
                ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
            "
          ></div>
        </div>

        <!-- Botón principal -->
        <div v-if="!showGameList" class="mb-16">
          <button
            @click="comenzarExplorar"
            :disabled="loading"
            class="group relative inline-flex items-center px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 hover:scale-110 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            :class="
              props.isDarkMode
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-cyan-500/25 hover:shadow-cyan-500/50'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white shadow-blue-500/25 hover:shadow-blue-500/50'
            "
          >
            <!-- Efecto de brillo -->
            <div
              class="absolute -inset-1 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"
              :class="
                props.isDarkMode
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
              "
            ></div>

            <div class="relative flex items-center">
              <svg
                v-if="loading"
                class="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <svg
                v-else
                class="w-8 h-8 mr-4 group-hover:rotate-12 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>{{ loading ? 'Cargando...' : 'Comenzar' }}</span>
              <div v-if="!loading" class="ml-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </button>
        </div>
      </div>

      <!-- Featured Games -->
      <div class="mb-16">
        <h2
          class="text-3xl font-bold text-center mb-12 transition-colors duration-500"
          :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
        >
          🌟 Juegos Destacados
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="game in featuredGames"
            :key="game.id"
            @click="goToGameDetail(game.id)"
            class="group cursor-pointer transform transition-all duration-500 hover:scale-105"
          >
            <div
              class="rounded-3xl overflow-hidden border transition-all duration-500 group-hover:shadow-2xl"
              :class="
                props.isDarkMode
                  ? 'bg-black/60 backdrop-blur-xl border-gray-700/50 hover:border-cyan-400/50 group-hover:shadow-cyan-500/25'
                  : 'bg-white/80 backdrop-blur-xl border-gray-200/50 hover:border-blue-400/50 group-hover:shadow-blue-500/25'
              "
            >
              <!-- Imagen -->
              <div class="relative h-48 overflow-hidden">
                <img
                  :src="game.background_image"
                  :alt="game.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
                ></div>

                <!-- Rating badge -->
                <div
                  class="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-white text-sm font-bold border border-white/20"
                >
                  ⭐ {{ game.rating }}
                </div>
              </div>

              <!-- Contenido -->
              <div class="p-6">
                <h3
                  class="font-bold text-xl mb-3 line-clamp-2 transition-colors duration-300"
                  :class="
                    props.isDarkMode
                      ? 'text-white group-hover:text-cyan-400'
                      : 'text-gray-900 group-hover:text-blue-600'
                  "
                >
                  {{ game.name }}
                </h3>

                <!-- Géneros -->
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="genre in game.genres"
                    :key="genre"
                    class="px-3 py-1 rounded-full text-sm border transition-colors duration-300"
                    :class="
                      props.isDarkMode
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30'
                        : 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200'
                    "
                  >
                    {{ genre }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Game List (cuando se activa) -->
      <div v-if="showGameList && games.length > 0" class="mb-16">
        <div class="flex justify-between items-center mb-8">
          <h2
            class="text-3xl font-bold transition-colors duration-500"
            :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
          >
            🎯 Juegos Recomendados
          </h2>
          <button
            @click="goToGames"
            class="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            :class="
              props.isDarkMode
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30'
                : 'bg-blue-500/20 text-blue-600 border border-blue-500/30 hover:bg-blue-500/30'
            "
          >
            Ver Todos
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="game in games.slice(0, 8)"
            :key="game.id"
            @click="goToGameDetail(game.id)"
            class="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div
              class="rounded-2xl overflow-hidden border transition-all duration-300"
              :class="
                props.isDarkMode
                  ? 'bg-black/40 backdrop-blur-md border-gray-700/50 hover:border-cyan-400/50'
                  : 'bg-white/70 backdrop-blur-md border-gray-200/50 hover:border-blue-400/50'
              "
            >
              <div class="relative h-32 overflow-hidden">
                <img
                  :src="game.background_image || '/placeholder.svg?height=200&width=300'"
                  :alt="game.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div class="p-4">
                <h3
                  class="font-bold text-sm line-clamp-2 transition-colors duration-300"
                  :class="
                    props.isDarkMode
                      ? 'text-white group-hover:text-cyan-400'
                      : 'text-gray-900 group-hover:text-blue-600'
                  "
                >
                  {{ game.name }}
                </h3>
                <div class="flex items-center mt-2">
                  <span class="text-yellow-400 text-xs">⭐</span>
                  <span
                    class="text-xs ml-1 transition-colors duration-300"
                    :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                  >
                    {{ game.rating?.toFixed(1) || 'N/A' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
