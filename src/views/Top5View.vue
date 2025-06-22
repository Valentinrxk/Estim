<script setup>
import { computed, ref, defineAsyncComponent, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useTop5 } from '@/composables/useTop5'
import Top5ReorderModal from '@/components/ui/Top5ReorderModal.vue'

const router = useRouter()
const props = defineProps({
  isDarkMode: Boolean,
})

const { currentTop5, removeFromTop5, clearTop5, getStats } = useTop5()

// Lazy loading del modal para reducir bundle inicial
const Top5ReorderModalComponent = defineAsyncComponent(
  () => import('@/components/ui/Top5ReorderModal.vue'),
)

// Estados reactivos optimizados
const stats = computed(() => getStats())
const showReorderModal = ref(false)
const isVisible = ref(false)
const imageLoadStates = ref(new Map())

// Optimización: Reducir re-renders innecesarios
const memoizedRankingColors = computed(() => {
  const colors = []
  for (let i = 0; i < 5; i++) {
    switch (i) {
      case 0:
        colors[i] = props.isDarkMode
          ? 'from-yellow-400 to-orange-500'
          : 'from-yellow-500 to-orange-600'
        break
      case 1:
        colors[i] = props.isDarkMode ? 'from-gray-300 to-gray-500' : 'from-gray-400 to-gray-600'
        break
      case 2:
        colors[i] = props.isDarkMode
          ? 'from-orange-400 to-orange-600'
          : 'from-orange-500 to-orange-700'
        break
      default:
        colors[i] = props.isDarkMode
          ? 'from-purple-400 to-purple-600'
          : 'from-purple-500 to-purple-700'
    }
  }
  return colors
})

// Funciones optimizadas
const handleGameClick = (gameId) => {
  router.push(`/game/${gameId}`)
}

const handleRemoveGame = (gameId) => {
  const result = removeFromTop5(gameId)
  if (result.success) {
    console.log(result.message)
  }
}

const handleClearAll = () => {
  if (confirm('¿Estás seguro de que quieres limpiar tu Top 5?')) {
    clearTop5()
  }
}

const goToGames = () => {
  router.push('/games')
}

const openReorderModal = () => {
  showReorderModal.value = true
}

const closeReorderModal = () => {
  showReorderModal.value = false
}

const handleModalSave = () => {
  showReorderModal.value = false
}

const getRankingColor = (index) => memoizedRankingColors.value[index]

const getRankingIcon = (index) => {
  const icons = ['👑', '🥈', '🥉', '⭐']
  return icons[index] || '⭐'
}

// Optimización de imágenes
const getOptimizedImageUrl = (originalUrl, width = 400, height = 300) => {
  if (!originalUrl) return `/placeholder.svg?height=${height}&width=${width}`

  // Si es una URL de RAWG, podemos optimizarla
  if (originalUrl.includes('media.rawg.io')) {
    // Agregar parámetros de optimización si la API lo soporta
    return originalUrl
  }

  return originalUrl
}

const handleImageLoad = (gameId) => {
  imageLoadStates.value.set(gameId, 'loaded')
}

const handleImageError = (gameId) => {
  imageLoadStates.value.set(gameId, 'error')
}

// Intersection Observer para lazy loading
onMounted(async () => {
  await nextTick()
  isVisible.value = true

  // Preload critical images
  if (currentTop5.value.length > 0) {
    currentTop5.value.slice(0, 3).forEach((game) => {
      if (game.background_image) {
        const img = new Image()
        img.src = getOptimizedImageUrl(game.background_image)
      }
    })
  }
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
        :class="props.isDarkMode ? 'bg-yellow-500' : 'bg-yellow-400'"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
        :class="props.isDarkMode ? 'bg-pink-500' : 'bg-pink-400'"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 py-8">
      <!-- Header épico -->
      <div class="text-center mb-12">
        <div class="inline-block relative mb-6">
          <h1 class="text-6xl lg:text-8xl font-bold">
            <span
              class="bg-gradient-to-r bg-clip-text text-transparent drop-shadow-2xl transition-all duration-500"
              :class="
                props.isDarkMode
                  ? 'from-yellow-400 via-orange-500 to-red-500'
                  : 'from-yellow-600 via-orange-600 to-red-600'
              "
            >
              MI TOP 5
            </span>
          </h1>
          <!-- Efectos de brillo -->
          <div
            class="absolute -inset-4 blur-xl rounded-full animate-pulse transition-all duration-500"
            :class="
              props.isDarkMode
                ? 'bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20'
                : 'bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-red-500/30'
            "
          ></div>
        </div>

        <p
          class="text-xl mb-8 max-w-2xl mx-auto transition-colors duration-500"
          :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-600'"
        >
          Los juegos que han conquistado tu corazón gamer. Tu hall of fame personal.
        </p>

        <!-- Estadísticas épicas -->
        <div class="flex justify-center space-x-8 mb-8">
          <div
            class="backdrop-blur-md rounded-2xl p-6 border transition-all duration-500"
            :class="
              props.isDarkMode
                ? 'bg-black/40 border-yellow-500/30'
                : 'bg-white/60 border-yellow-400/40'
            "
          >
            <div
              class="text-4xl font-bold mb-2 transition-colors duration-500"
              :class="props.isDarkMode ? 'text-yellow-400' : 'text-yellow-600'"
            >
              {{ stats.total }}/5
            </div>
            <div
              class="text-sm uppercase tracking-wider transition-colors duration-500"
              :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
            >
              Juegos Legendarios
            </div>
          </div>
          <div
            class="backdrop-blur-md rounded-2xl p-6 border transition-all duration-500"
            :class="
              props.isDarkMode ? 'bg-black/40 border-cyan-500/30' : 'bg-white/60 border-blue-400/40'
            "
          >
            <div
              class="text-4xl font-bold mb-2 transition-colors duration-500"
              :class="props.isDarkMode ? 'text-cyan-400' : 'text-blue-600'"
            >
              {{ stats.averageRating }}
            </div>
            <div
              class="text-sm uppercase tracking-wider transition-colors duration-500"
              :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
            >
              Rating Promedio
            </div>
          </div>
          <div
            class="backdrop-blur-md rounded-2xl p-6 border transition-all duration-500"
            :class="
              props.isDarkMode
                ? 'bg-black/40 border-purple-500/30'
                : 'bg-white/60 border-purple-400/40'
            "
          >
            <div
              class="text-4xl font-bold mb-2 transition-colors duration-500"
              :class="props.isDarkMode ? 'text-purple-400' : 'text-purple-600'"
            >
              {{ stats.isFull ? '🔥' : '📈' }}
            </div>
            <div
              class="text-sm uppercase tracking-wider transition-colors duration-500"
              :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
            >
              {{ stats.isFull ? 'Completo' : 'En Progreso' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Lista vacía épica -->
      <div v-if="currentTop5.length === 0" class="text-center py-20">
        <div class="relative mb-12">
          <!-- Icono animado -->
          <div class="relative inline-block">
            <svg
              class="w-40 h-40 mx-auto animate-bounce transition-colors duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              :class="props.isDarkMode ? 'text-gray-600' : 'text-gray-400'"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <!-- Partículas flotantes -->
            <div
              class="absolute -top-4 -right-4 w-4 h-4 rounded-full animate-ping"
              :class="props.isDarkMode ? 'bg-yellow-400' : 'bg-yellow-500'"
            ></div>
            <div
              class="absolute -bottom-4 -left-4 w-3 h-3 rounded-full animate-ping animation-delay-1000"
              :class="props.isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'"
            ></div>
            <div
              class="absolute top-1/2 -right-8 w-2 h-2 rounded-full animate-ping animation-delay-2000"
              :class="props.isDarkMode ? 'bg-purple-400' : 'bg-purple-500'"
            ></div>
          </div>
        </div>

        <h2
          class="text-4xl font-bold mb-6 transition-colors duration-500"
          :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
        >
          Tu Hall of Fame está esperando
        </h2>
        <p
          class="text-xl mb-12 max-w-2xl mx-auto leading-relaxed transition-colors duration-500"
          :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
        >
          Explora el universo gaming y descubre esos títulos que merecen un lugar en tu olimpo
          personal. ¡Cada juego cuenta una historia épica!
        </p>

        <button
          @click="goToGames"
          class="group relative inline-flex items-center px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 hover:scale-110 shadow-2xl"
          :class="
            props.isDarkMode
              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-cyan-500/25'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white shadow-blue-500/25'
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
            <span>Explorar Juegos Épicos</span>
            <div class="ml-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </button>
      </div>

      <!-- Lista de juegos épica -->
      <div v-else class="space-y-8">
        <!-- Controles superiores -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
          <button
            @click="goToGames"
            class="group inline-flex items-center px-8 py-4 backdrop-blur-md border rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl"
            :class="
              props.isDarkMode
                ? 'bg-black/40 border-cyan-500/30 hover:border-cyan-400 text-white shadow-cyan-500/25 hover:shadow-cyan-500/50'
                : 'bg-white/60 border-blue-500/30 hover:border-blue-400 text-gray-900'
            "
          >
            <svg
              class="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span
              class="bg-gradient-to-r bg-clip-text text-transparent"
              :class="
                props.isDarkMode ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
              "
            >
              Descubrir Más Juegos
            </span>
          </button>

          <div class="flex items-center space-x-4">
            <button
              v-if="currentTop5.length > 1"
              @click="openReorderModal"
              class="group inline-flex items-center px-8 py-4 border rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              :class="
                props.isDarkMode
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-400 text-purple-400 hover:text-purple-300'
                  : 'bg-gradient-to-r from-purple-100/60 to-pink-100/60 border-purple-300/50 hover:border-purple-400 text-purple-600 hover:text-purple-700'
              "
            >
              <svg
                class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              Reordenar Top 5
            </button>

            <button
              @click="handleClearAll"
              class="group inline-flex items-center px-8 py-4 border rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              :class="
                props.isDarkMode
                  ? 'bg-red-500/20 border-red-500/30 hover:border-red-400 hover:bg-red-500/30 text-red-400'
                  : 'bg-red-100/60 border-red-300/50 hover:border-red-400 hover:bg-red-200/60 text-red-600'
              "
            >
              <svg
                class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Reset Hall of Fame
            </button>
          </div>
        </div>

        <!-- Grid de ranking épico -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          <div
            v-for="(game, index) in currentTop5"
            :key="game.id"
            class="relative group transform transition-all duration-500 hover:scale-105"
          >
            <!-- Número de ranking con efectos -->
            <div class="absolute -top-6 -left-6 z-30">
              <div
                :class="`w-16 h-16 bg-gradient-to-br ${getRankingColor(index)} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl border-4 border-white transform rotate-12 group-hover:rotate-0 transition-transform duration-500`"
              >
                {{ index + 1 }}
              </div>
              <!-- Efecto de brillo -->
              <div
                :class="`absolute inset-0 w-16 h-16 bg-gradient-to-br ${getRankingColor(index)} rounded-full blur-lg opacity-50 animate-pulse`"
              ></div>
            </div>

            <!-- Icono especial para top 3 -->
            <div v-if="index < 3" class="absolute -top-4 -right-4 z-30 text-3xl animate-bounce">
              {{ getRankingIcon(index) }}
            </div>

            <!-- Card del juego -->
            <div
              class="relative backdrop-blur-xl rounded-3xl overflow-hidden border transition-all duration-500 group-hover:shadow-2xl"
              :class="
                props.isDarkMode
                  ? 'bg-black/60 border-gray-700/50 hover:border-cyan-400/50 group-hover:shadow-cyan-500/25'
                  : 'bg-white/70 border-gray-200/50 hover:border-blue-400/50 group-hover:shadow-blue-500/25'
              "
            >
              <!-- Imagen con overlay -->
              <div class="relative h-64 overflow-hidden">
                <img
                  :src="game.background_image || '/placeholder.svg?height=300&width=400'"
                  :alt="game.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  @load="handleImageLoad(game.id)"
                  @error="handleImageError(game.id)"
                  :style="{
                    aspectRatio: '4/3',
                    backgroundColor: props.isDarkMode ? '#374151' : '#f3f4f6',
                  }"
                />
                <!-- Overlay gradiente -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
                ></div>

                <!-- Botón remover con efecto -->
                <button
                  @click="handleRemoveGame(game.id)"
                  class="absolute top-4 right-4 w-10 h-10 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm"
                  :aria-label="`Remover ${game.name} del Top 5`"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <!-- Badge de posición -->
                <div
                  class="absolute bottom-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-white text-sm font-bold border border-white/20"
                >
                  #{{ index + 1 }} en tu Top
                </div>
              </div>

              <!-- Contenido -->
              <div class="p-6 space-y-4">
                <h3
                  class="font-bold text-xl leading-tight line-clamp-2 transition-colors duration-300"
                  :class="
                    props.isDarkMode
                      ? 'text-white group-hover:text-cyan-400'
                      : 'text-gray-900 group-hover:text-blue-600'
                  "
                >
                  {{ game.name }}
                </h3>

                <!-- Rating con estrellas -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        />
                      </svg>
                      <span class="text-yellow-400 font-bold ml-1">{{
                        game.rating?.toFixed(1) || 'N/A'
                      }}</span>
                    </div>
                  </div>

                  <button
                    @click="handleGameClick(game.id)"
                    class="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border"
                    :class="
                      props.isDarkMode
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/40 hover:to-purple-500/40 text-cyan-400 border-cyan-500/30 hover:border-cyan-400'
                        : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 text-blue-600 border-blue-500/30 hover:border-blue-400'
                    "
                  >
                    Ver Detalles
                  </button>
                </div>

                <!-- Fecha agregado -->
                <div
                  class="text-xs transition-colors duration-300"
                  :class="props.isDarkMode ? 'text-gray-500' : 'text-gray-600'"
                >
                  Agregado: {{ new Date(game.addedAt || Date.now()).toLocaleDateString() }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slots vacíos con estilo -->
        <div
          v-if="currentTop5.length < 5"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-8"
        >
          <div
            v-for="n in 5 - currentTop5.length"
            :key="`empty-${n}`"
            class="relative group cursor-pointer"
            @click="goToGames"
          >
            <!-- Número de ranking vacío -->
            <div class="absolute -top-6 -left-6 z-30">
              <div
                class="w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl border-4 group-hover:border-gray-500 transition-colors duration-300"
                :class="
                  props.isDarkMode
                    ? 'bg-gray-700 text-gray-400 border-gray-600'
                    : 'bg-gray-200 text-gray-500 border-gray-300'
                "
              >
                {{ currentTop5.length + n }}
              </div>
            </div>

            <!-- Slot vacío -->
            <div
              class="rounded-3xl border-2 border-dashed h-80 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-gray-800/60"
              :class="
                props.isDarkMode
                  ? 'bg-gray-800/40 border-gray-600 hover:border-gray-500 text-gray-500 hover:text-gray-400'
                  : 'bg-gray-100/60 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-500'
              "
            >
              <svg
                class="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span class="text-lg font-bold mb-2">Slot Disponible</span>
              <span class="text-sm text-center px-4">Click para agregar un juego épico</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal de Reordenamiento -->
    <Top5ReorderModalComponent
      v-if="showReorderModal"
      :isOpen="showReorderModal"
      :isDarkMode="props.isDarkMode"
      @close="closeReorderModal"
      @save="handleModalSave"
    />
  </div>
</template>

<style scoped>
/* Animaciones optimizadas */
@keyframes gentle-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Optimización de will-change para mejor performance */
.group:hover {
  will-change: transform;
}

.group:hover img {
  will-change: transform;
}

/* Reducir motion para usuarios que lo prefieren */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
