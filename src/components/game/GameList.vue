<script setup>
import { onMounted, computed } from 'vue'
import { useGameFilters } from '@/composables/useGameFilters'
import LoadingSpinner from '@/components/ui/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/ui/common/ErrorMessage.vue'
import AnimatedBackground from '@/components/ui/common/AnimatedBackground.vue'
import ResultsInfo from '@/components/ui/common/ResultsInfo.vue'
import Pagination from '@/components/ui/common/Pagination.vue'

const {
  currentPage,
  loading,
  games,
  totalResults,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  searchGames,
  goToPage,
  nextPage,
  previousPage,
} = useGameFilters()

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    default: false,
  },
})

const gamesWithRating = computed(() => {
  return games.value.filter((game) => {
    return game.rating && game.rating > 0 && !isNaN(game.rating) && game.rating !== null
  })
})

const filteredTotalResults = computed(() => {
  const originalCount = games.value.length
  const filteredCount = gamesWithRating.value.length

  if (originalCount === 0) return 0

  const ratio = filteredCount / originalCount
  return Math.floor(totalResults.value * ratio)
})

onMounted(() => {
  searchGames()
})

const handlePageChange = (page) => {
  goToPage(page)
  scrollToTop()
}

const handlePreviousPage = () => {
  if (hasPreviousPage.value) {
    previousPage()
    scrollToTop()
  }
}

const handleNextPage = () => {
  if (hasNextPage.value) {
    nextPage()
    scrollToTop()
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const paginationPages = computed(() => {
  const pages = []
  const current = currentPage.value
  const total = totalPages.value

  let start = Math.max(1, current - 2)
  let end = Math.min(total, current + 2)

  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(total, start + 4)
    } else if (end === total) {
      start = Math.max(1, end - 4)
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const resultsText = computed(() => {
  const count = filteredTotalResults.value
  if (count === 0) return 'No se encontraron juegos'
  if (count === 1) return '1 juego encontrado'
  return `${count.toLocaleString()} juegos encontrados`
})

const renderStars = (rating) => {
  const stars = []
  const normalizedRating = rating ? Math.round(rating) : 0
  for (let i = 0; i < 5; i++) {
    stars.push(i < normalizedRating)
  }
  return stars
}

const formatRating = (rating) => (rating ? rating.toFixed(1) : '0.0')

const getGenres = (game) => {
  return game.genres ? game.genres.slice(0, 3).map((g) => g.name) : []
}

const getPlatforms = (game) => {
  return game.platforms ? game.platforms.slice(0, 4).map((p) => p.platform.name) : []
}

const backgroundClasses = computed(() =>
  props.isDarkMode
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',
)

const titleGradientClasses = computed(() =>
  props.isDarkMode
    ? 'from-cyan-400 via-purple-400 to-pink-400'
    : 'from-blue-600 via-purple-600 to-pink-600',
)

const subtitleClasses = computed(() => (props.isDarkMode ? 'text-gray-300' : 'text-gray-600'))

const dividerGradientClasses = computed(() =>
  props.isDarkMode ? 'from-cyan-400 to-purple-400' : 'from-blue-500 to-purple-500',
)
</script>

<template>
  <div class="min-h-screen transition-all duration-500" :class="backgroundClasses">
    <!-- Animated Background usando TU componente -->
    <AnimatedBackground :is-dark-mode="isDarkMode" />

    <main class="relative z-10 max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <header class="mb-12 text-center">
        <h1
          class="text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-6 transition-all duration-500"
          :class="titleGradientClasses"
        >
          🎮 JUEGOS TOP 🎮
        </h1>
        <p class="text-xl transition-colors duration-500 mb-4" :class="subtitleClasses">
          Descubrí tu próximo juego épico
        </p>
        <div
          class="w-32 h-1 bg-gradient-to-r mx-auto rounded-full transition-all duration-500"
          :class="dividerGradientClasses"
        />
      </header>

      <!-- Results Info usando TU componente -->
      <ResultsInfo
        :loading="loading"
        :results-text="resultsText"
        :current-page="currentPage"
        :total-pages="totalPages"
        :is-dark-mode="isDarkMode"
      />

      <!-- Content Section -->
      <section>
        <!-- Loading State usando TU componente -->
        <div v-if="loading" class="flex justify-center py-20">
          <LoadingSpinner size="xl" :show-text="true" loading-text="🎮 Cargando juegos épicos..." />
        </div>

        <!-- Error State usando TU componente -->
        <div v-else-if="!loading && gamesWithRating.length === 0" class="flex justify-center py-20">
          <ErrorMessage
            type="error"
            title="No se encontraron juegos"
            message="No hay juegos disponibles con rating válido en este momento."
            details="Intenta recargar la página o verifica tu conexión a internet."
            @retry="searchGames"
          />
        </div>

        <!-- Games Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <article
            v-for="game in gamesWithRating"
            :key="game.id"
            class="group backdrop-blur-sm border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full"
            :class="
              props.isDarkMode
                ? 'bg-gray-900/80 border-gray-700 hover:border-cyan-400/50 hover:shadow-cyan-500/20'
                : 'bg-white/80 border-gray-200 hover:border-blue-400/50 hover:shadow-blue-500/20'
            "
          >
            <div class="p-6 h-full flex flex-col">
              <!-- Game Cover -->
              <div
                class="relative w-full h-52 rounded-xl mb-6 overflow-hidden group-hover:shadow-lg transition-all duration-300"
                :class="
                  props.isDarkMode
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 group-hover:shadow-cyan-500/20'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:shadow-blue-500/20'
                "
              >
                <img
                  v-if="game.background_image"
                  :src="game.background_image"
                  :alt="`Imagen de ${game.name}`"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div
                  v-else
                  class="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"
                >
                  <svg
                    class="w-20 h-20 text-white/50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <!-- Rating Badge -->
                <div
                  class="absolute top-4 right-4 px-3 py-2 rounded-xl backdrop-blur-md font-bold text-sm shadow-lg border"
                  :class="
                    game.rating >= 4.5
                      ? 'bg-green-500/90 text-white border-green-400/50'
                      : game.rating >= 4.0
                        ? 'bg-yellow-500/90 text-white border-yellow-400/50'
                        : game.rating >= 3.0
                          ? 'bg-orange-500/90 text-white border-orange-400/50'
                          : 'bg-red-500/90 text-white border-red-400/50'
                  "
                >
                  ⭐ {{ formatRating(game.rating) }}
                </div>
              </div>

              <!-- Game Title -->
              <h2
                class="font-bold mb-4 text-xl line-clamp-2 transition-colors duration-300"
                :class="
                  props.isDarkMode
                    ? 'text-white group-hover:text-cyan-400'
                    : 'text-gray-900 group-hover:text-blue-600'
                "
              >
                {{ game.name }}
              </h2>

              <!-- Rating Stars -->
              <div
                class="flex items-center mb-6"
                role="img"
                :aria-label="`Rating: ${formatRating(game.rating)} de 5 estrellas`"
              >
                <div class="flex mr-3" aria-hidden="true">
                  <svg
                    v-for="(filled, index) in renderStars(game.rating || 0)"
                    :key="index"
                    :class="
                      filled
                        ? 'text-yellow-400'
                        : props.isDarkMode
                          ? 'text-gray-600'
                          : 'text-gray-300'
                    "
                    class="w-6 h-6 drop-shadow-sm"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                </div>
                <span class="text-yellow-400 font-bold text-xl">
                  {{ formatRating(game.rating) }}
                </span>
                <span
                  class="ml-2 text-lg transition-colors duration-500"
                  :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                  /5.0
                </span>
              </div>

              <!-- Genre Tags -->
              <div class="flex flex-wrap gap-2 mb-6 min-h-[2.5rem]">
                <span
                  v-for="(genre, index) in getGenres(game)"
                  :key="genre"
                  :class="[
                    'px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-300 hover:scale-105',
                    index === 0
                      ? props.isDarkMode
                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30'
                        : 'bg-blue-500/20 text-blue-600 border-blue-500/30 hover:bg-blue-500/30'
                      : index === 1
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30'
                        : 'bg-pink-500/20 text-pink-400 border-pink-500/30 hover:bg-pink-500/30',
                  ]"
                >
                  {{ genre }}
                </span>
                <span
                  v-if="getGenres(game).length === 0"
                  class="px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-300"
                  :class="
                    props.isDarkMode
                      ? 'bg-gray-700/30 text-gray-500 border-gray-600/30'
                      : 'bg-gray-200/50 text-gray-400 border-gray-300/30'
                  "
                >
                  Sin género
                </span>
              </div>

              <!-- Platform Icons -->
              <div class="mb-8 min-h-[2.5rem] flex-grow">
                <div
                  v-if="getPlatforms(game).length > 0"
                  :class="[
                    'flex gap-2',
                    getPlatforms(game).length === 1 ? 'justify-center' : 'flex-wrap',
                  ]"
                >
                  <span
                    v-for="platform in getPlatforms(game)"
                    :key="platform"
                    class="px-3 py-2 border text-sm rounded-lg flex items-center transition-all duration-300 font-medium"
                    :class="[
                      props.isDarkMode
                        ? 'bg-gray-800 border-gray-600 text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400'
                        : 'bg-gray-100 border-gray-300 text-gray-600 hover:border-blue-400/50 hover:text-blue-600',
                      getPlatforms(game).length === 1 ? 'px-6 py-3' : '',
                    ]"
                  >
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {{ platform }}
                  </span>
                </div>
                <div v-else class="flex justify-center">
                  <span
                    class="px-6 py-3 border text-sm rounded-lg flex items-center transition-all duration-300 font-medium"
                    :class="
                      props.isDarkMode
                        ? 'bg-gray-700/30 text-gray-500 border-gray-600/30'
                        : 'bg-gray-200/50 text-gray-400 border-gray-300/30'
                    "
                  >
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Multiplataforma
                  </span>
                </div>
              </div>

              <!-- Details Button -->
              <router-link
                :to="{ name: 'game-detail', params: { id: game.id } }"
                class="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:scale-105 group-hover:shadow-xl mt-auto text-center no-underline text-lg"
                :class="
                  props.isDarkMode
                    ? 'from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-cyan-500/25 hover:shadow-cyan-500/40'
                    : 'from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-blue-500/25 hover:shadow-blue-500/40'
                "
              >
                <svg
                  class="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Ver Detalles
              </router-link>
            </div>
          </article>
        </div>
      </section>

      <!-- Pagination usando TU componente -->
      <Pagination
        v-if="!loading && gamesWithRating.length > 0"
        :current-page="currentPage"
        :total-pages="totalPages"
        :has-next-page="hasNextPage"
        :has-previous-page="hasPreviousPage"
        :pagination-pages="paginationPages"
        :is-dark-mode="isDarkMode"
        @previous="handlePreviousPage"
        @next="handleNextPage"
        @go-to-page="handlePageChange"
      />
    </main>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.no-underline {
  text-decoration: none;
}
</style>
