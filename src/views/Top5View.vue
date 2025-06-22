<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTop5 } from '@/composables/useTop5'
import AnimatedBackground from '@/components/ui/common/AnimatedBackground.vue'
import LoadingSpinner from '@/components/ui/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/ui/common/ErrorMessage.vue'
import Top5ReorderModal from '@/components/ui/common/Top5ReorderModal.vue'

const router = useRouter()

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    default: false,
  },
})

// Usar TU composable existente
const { currentTop5, removeFromTop5, reorderTop5, getStats, loadFromStorage } = useTop5()

// Estados locales
const loading = ref(false)
const error = ref(null)
const showReorderModal = ref(false)

// Estadísticas usando TU función getStats
const stats = computed(() => getStats())

onMounted(() => {
  loadFromStorage()
})

// Colores para las posiciones
const positionColors = [
  'from-yellow-400 to-orange-500', // 1st - Oro
  'from-gray-300 to-gray-500', // 2nd - Plata
  'from-amber-600 to-yellow-700', // 3rd - Bronce
  'from-purple-500 to-purple-700', // 4th - Púrpura
  'from-blue-500 to-blue-700', // 5th - Azul
]

// Estilos computados mejorados
const themeStyles = computed(() => ({
  background: props.isDarkMode
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
    : 'bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50',

  titleGradient: props.isDarkMode
    ? 'from-yellow-400 via-orange-500 to-red-500'
    : 'from-orange-500 via-red-500 to-pink-600',

  subtitle: props.isDarkMode ? 'text-gray-300' : 'text-gray-600',

  divider: props.isDarkMode ? 'from-cyan-400 to-purple-400' : 'from-orange-400 to-pink-500',

  cardBg: props.isDarkMode
    ? 'bg-gray-900/80 border-gray-700 hover:border-cyan-400/50 hover:shadow-cyan-500/20'
    : 'bg-white/80 border-gray-200 hover:border-orange-400/50 hover:shadow-orange-500/20',

  statCard: props.isDarkMode ? 'bg-black/40 backdrop-blur-md' : 'bg-white/60 backdrop-blur-md',

  button: props.isDarkMode
    ? 'from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-cyan-500/25'
    : 'from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 shadow-orange-500/25',

  buttonOutline: props.isDarkMode
    ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
    : 'border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white',
}))

const openReorderModal = () => {
  showReorderModal.value = true
}

const closeReorderModal = () => {
  showReorderModal.value = false
}

const handleReorderComplete = () => {
  closeReorderModal()
}

const handleRemoveGame = (gameId) => {
  if (confirm('¿Estás seguro de que quieres remover este juego de tu Top 5?')) {
    const result = removeFromTop5(gameId)
    if (result.success) {
      console.log(result.message)
    }
  }
}

const moveUp = (gameId) => {
  const currentIndex = currentTop5.value.findIndex((game) => game.id === gameId)
  if (currentIndex > 0) {
    const newOrder = [...currentTop5.value]
    const temp = newOrder[currentIndex]
    newOrder[currentIndex] = newOrder[currentIndex - 1]
    newOrder[currentIndex - 1] = temp
    reorderTop5(newOrder)
  }
}

const moveDown = (gameId) => {
  const currentIndex = currentTop5.value.findIndex((game) => game.id === gameId)
  if (currentIndex < currentTop5.value.length - 1) {
    const newOrder = [...currentTop5.value]
    const temp = newOrder[currentIndex]
    newOrder[currentIndex] = newOrder[currentIndex + 1]
    newOrder[currentIndex + 1] = temp
    reorderTop5(newOrder)
  }
}

const navigateToGames = () => {
  router.push('/games')
}

const navigateToGameDetail = (gameId) => {
  router.push(`/game/${gameId}`)
}
</script>

<template>
  <div class="min-h-screen transition-all duration-500" :class="themeStyles.background">
    <AnimatedBackground :is-dark-mode="isDarkMode" />

    <main class="relative z-10 max-w-7xl mx-auto px-4 py-12">
      <!-- Header Mejorado -->
      <header class="text-center mb-16">
        <div class="inline-block relative mb-8">
          <h1 class="text-6xl lg:text-8xl font-black tracking-tight">
            <span
              class="bg-gradient-to-r bg-clip-text text-transparent drop-shadow-2xl transition-all duration-500"
              :class="themeStyles.titleGradient"
            >
              MI TOP 5
            </span>
          </h1>

          <!-- Glow effect mejorado -->
          <div
            class="absolute -inset-6 blur-2xl rounded-full animate-pulse transition-all duration-500 opacity-30"
            :class="
              isDarkMode
                ? 'bg-gradient-to-r from-yellow-400/30 via-orange-500/30 to-red-500/30'
                : 'bg-gradient-to-r from-orange-500/40 via-red-500/40 to-pink-600/40'
            "
          />
        </div>

        <p
          class="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto font-medium transition-colors duration-500"
          :class="themeStyles.subtitle"
        >
          Los juegos que han conquistado tu corazón gamer. Tu hall of fame personal.
        </p>

        <!-- Decorative Line -->
        <div
          class="w-40 h-1 mx-auto rounded-full transition-colors duration-500 bg-gradient-to-r"
          :class="themeStyles.divider"
        />
      </header>

      <section>
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-20">
          <LoadingSpinner size="xl" :show-text="true" loading-text="🏆 Cargando tu Top 5..." />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="flex justify-center py-20">
          <ErrorMessage
            type="error"
            title="Error al cargar Top 5"
            :message="error"
            @retry="loadFromStorage"
          />
        </div>

        <!-- Empty State Mejorado -->
        <div v-else-if="currentTop5.length === 0" class="text-center py-24">
          <div class="text-9xl mb-8 animate-bounce">🎮</div>
          <h3 class="text-3xl font-bold mb-6" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Tu Top 5 está vacío
          </h3>
          <p class="text-xl mb-12 max-w-md mx-auto" :class="themeStyles.subtitle">
            Agrega juegos desde la lista para crear tu ranking personal de leyendas
          </p>
          <button
            @click="navigateToGames"
            class="px-12 py-4 bg-gradient-to-r text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            :class="themeStyles.button"
          >
            <svg class="w-6 h-6 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Explorar Juegos
          </button>
        </div>

        <!-- Top 5 Content -->
        <div v-else>
          <!-- Statistics Cards Mejoradas -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div
              class="rounded-3xl p-8 border transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              :class="[themeStyles.statCard, 'border-yellow-500/30']"
            >
              <div class="text-center">
                <div
                  class="text-5xl font-black mb-4 transition-colors duration-500"
                  :class="isDarkMode ? 'text-yellow-400' : 'text-orange-600'"
                >
                  {{ stats.total }}/5
                </div>
                <div
                  class="text-sm uppercase tracking-wider font-bold transition-colors duration-500"
                  :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                >
                  Juegos Legendarios
                </div>
                <div class="mt-4 text-3xl">🏆</div>
              </div>
            </div>

            <div
              class="rounded-3xl p-8 border transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              :class="[themeStyles.statCard, 'border-cyan-500/30']"
            >
              <div class="text-center">
                <div
                  class="text-5xl font-black mb-4 transition-colors duration-500"
                  :class="isDarkMode ? 'text-cyan-400' : 'text-blue-600'"
                >
                  {{ stats.averageRating }}
                </div>
                <div
                  class="text-sm uppercase tracking-wider font-bold transition-colors duration-500"
                  :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                >
                  Rating Promedio
                </div>
                <div class="mt-4 text-3xl">⭐</div>
              </div>
            </div>

            <div
              class="rounded-3xl p-8 border transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              :class="[themeStyles.statCard, 'border-purple-500/30']"
            >
              <div class="text-center">
                <div
                  class="text-5xl font-black mb-4 transition-colors duration-500"
                  :class="isDarkMode ? 'text-purple-400' : 'text-purple-600'"
                >
                  {{ stats.isFull ? '🔥' : '📈' }}
                </div>
                <div
                  class="text-sm uppercase tracking-wider font-bold transition-colors duration-500"
                  :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                >
                  {{ stats.isFull ? 'Completo' : 'En Progreso' }}
                </div>
                <div class="mt-4 text-3xl">{{ stats.isFull ? '💯' : '🚀' }}</div>
              </div>
            </div>
          </div>

          <!-- Games Grid Mejorado -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
            <!-- Game Cards -->
            <div v-for="(game, index) in currentTop5" :key="game.id" class="group relative">
              <div
                class="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-4 border"
                :class="themeStyles.cardBg"
              >
                <!-- Position Badge -->
                <div
                  class="absolute -top-4 -left-4 w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl z-10 bg-gradient-to-r"
                  :class="positionColors[index]"
                >
                  {{ index + 1 }}
                </div>

                <!-- Quick Controls -->
                <div
                  class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                >
                  <button
                    @click="moveUp(game.id)"
                    :disabled="index === 0"
                    class="p-2 rounded-xl backdrop-blur-md bg-black/50 text-white hover:bg-black/70 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Mover arriba"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button>
                  <button
                    @click="moveDown(game.id)"
                    :disabled="index === currentTop5.length - 1"
                    class="p-2 rounded-xl backdrop-blur-md bg-black/50 text-white hover:bg-black/70 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Mover abajo"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <button
                    @click="handleRemoveGame(game.id)"
                    class="p-2 rounded-xl backdrop-blur-md bg-red-500/80 text-white hover:bg-red-600/90 transition-all duration-200"
                    title="Remover del Top 5"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                <!-- Game Image -->
                <div
                  class="relative h-64 overflow-hidden cursor-pointer"
                  @click="navigateToGameDetail(game.id)"
                >
                  <img
                    v-if="game.background_image"
                    :src="game.background_image"
                    :alt="game.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    v-else
                    class="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"
                  >
                    <svg class="w-20 h-20 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <!-- Overlay -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                <!-- Game Info -->
                <div class="p-6">
                  <h3
                    class="font-bold text-lg mb-3 line-clamp-2 transition-colors duration-300 cursor-pointer"
                    :class="
                      isDarkMode
                        ? 'text-white group-hover:text-cyan-400'
                        : 'text-gray-900 group-hover:text-orange-600'
                    "
                    @click="navigateToGameDetail(game.id)"
                  >
                    {{ game.name }}
                  </h3>

                  <!-- Rating -->
                  <div class="flex items-center justify-center mb-4">
                    <div class="flex mr-2">
                      <svg
                        v-for="star in 5"
                        :key="star"
                        :class="
                          star <= Math.round(game.rating || 0)
                            ? 'text-yellow-400'
                            : isDarkMode
                              ? 'text-gray-600'
                              : 'text-gray-300'
                        "
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        />
                      </svg>
                    </div>
                    <span class="text-yellow-400 font-bold text-lg">{{
                      (game.rating || 0).toFixed(1)
                    }}</span>
                  </div>

                  <!-- Action Button -->
                  <button
                    @click="navigateToGameDetail(game.id)"
                    class="w-full px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105"
                    :class="
                      isDarkMode
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                        : 'bg-orange-500 hover:bg-orange-400 text-white'
                    "
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>

            <!-- Add New Game Card -->
            <div v-if="currentTop5.length < 5" class="group relative">
              <div
                class="h-full rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-500 hover:scale-105 hover:-translate-y-4 cursor-pointer min-h-[400px]"
                :class="
                  isDarkMode
                    ? 'border-gray-600 hover:border-cyan-400 bg-gray-900/40 hover:bg-gray-800/60'
                    : 'border-gray-300 hover:border-orange-400 bg-white/40 hover:bg-white/60'
                "
                @click="navigateToGames"
              >
                <div
                  class="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  :class="
                    isDarkMode
                      ? 'bg-cyan-600 group-hover:bg-cyan-500'
                      : 'bg-orange-500 group-hover:bg-orange-400'
                  "
                >
                  <svg
                    class="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3
                  class="font-bold text-xl mb-3 transition-colors duration-300"
                  :class="
                    isDarkMode
                      ? 'text-gray-300 group-hover:text-cyan-400'
                      : 'text-gray-700 group-hover:text-orange-600'
                  "
                >
                  Agregar Juego
                </h3>
                <p
                  class="text-sm text-center px-6 transition-colors duration-300"
                  :class="
                    isDarkMode
                      ? 'text-gray-500 group-hover:text-gray-400'
                      : 'text-gray-500 group-hover:text-gray-600'
                  "
                >
                  Completa tu Top 5 personal
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              @click="openReorderModal"
              class="px-10 py-4 bg-gradient-to-r text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center"
              :class="themeStyles.button"
            >
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              Reordenar Lista
            </button>

            <button
              @click="navigateToGames"
              class="px-10 py-4 border-2 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105"
              :class="themeStyles.buttonOutline"
            >
              <svg
                class="w-6 h-6 mr-3 inline"
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
              Explorar Más Juegos
            </button>
          </div>
        </div>
      </section>
    </main>

    <Top5ReorderModal
      :is-open="showReorderModal"
      :is-dark-mode="isDarkMode"
      @close="closeReorderModal"
      @save="handleReorderComplete"
    />
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
</style>
