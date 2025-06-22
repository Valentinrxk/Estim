<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTop5 } from '@/composables/useTop5'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'

const route = useRoute()
const router = useRouter()
const props = defineProps({
  isDarkMode: Boolean,
})

const gameId = route.params.id
const game = ref(null)
const screenshots = ref([])
const loading = ref(false)
const error = ref(null)
const selectedScreenshot = ref(0)
const showMessage = ref(false)
const messageData = ref({
  type: 'success',
  message: '',
  title: null,
})

const { addToTop5, isInTop5 } = useTop5()

// Computed para verificar si está en Top 5
const isGameInTop5 = computed(() => {
  return game.value ? isInTop5(game.value.id) : false
})

// Computed para formatear géneros
const formattedGenres = computed(() => {
  return game.value?.genres?.map((genre) => genre.name) || []
})

// Computed para formatear plataformas
const formattedPlatforms = computed(() => {
  return game.value?.platforms?.map((platform) => platform.platform.name) || []
})

const showNotification = (type, message, title = null, duration = 3000) => {
  messageData.value = { type, message, title }
  showMessage.value = true

  setTimeout(() => {
    showMessage.value = false
  }, duration)
}

const fetchGameDetails = async () => {
  try {
    loading.value = true
    error.value = null

    const res = await fetch(
      `https://api.rawg.io/api/games/${gameId}?key=${import.meta.env.VITE_RAWG_API_KEY}`,
    )

    if (!res.ok) throw new Error('Failed to fetch game details')

    const data = await res.json()
    game.value = data

    const resShots = await fetch(
      `https://api.rawg.io/api/games/${gameId}/screenshots?key=${import.meta.env.VITE_RAWG_API_KEY}`,
    )

    if (resShots.ok) {
      const dataShots = await resShots.json()
      screenshots.value = dataShots.results || []
    }
  } catch (err) {
    error.value = {
      type: 'error',
      message: 'No se pudo cargar el detalle del juego',
      details: err.message,
    }
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}

const handleAddToTop5 = () => {
  if (game.value && !isGameInTop5.value) {
    const result = addToTop5({
      id: game.value.id,
      name: game.value.name,
      background_image: game.value.background_image,
      rating: game.value.rating,
    })

    if (result.success) {
      showNotification('success', result.message, '¡Genial!')
    } else {
      // Determinar el tipo de mensaje según el resultado
      if (result.type === 'full') {
        showNotification('warning', result.message, 'Top 5 Completo')
      } else if (result.type === 'duplicate') {
        showNotification('info', result.message, 'Ya está agregado')
      } else {
        showNotification('error', result.message, 'Error')
      }
    }
  }
}

const handleRetry = () => {
  fetchGameDetails()
}

const selectScreenshot = (index) => {
  selectedScreenshot.value = index
}

const formatRating = (rating) => {
  return rating ? rating.toFixed(1) : 'N/A'
}

const formatMetacritic = (score) => {
  if (!score) return 'N/A'
  if (score >= 75)
    return {
      score,
      color: props.isDarkMode ? 'text-green-400' : 'text-green-600',
      bg: props.isDarkMode ? 'bg-green-500/20' : 'bg-green-100',
    }
  if (score >= 50)
    return {
      score,
      color: props.isDarkMode ? 'text-yellow-400' : 'text-yellow-600',
      bg: props.isDarkMode ? 'bg-yellow-500/20' : 'bg-yellow-100',
    }
  return {
    score,
    color: props.isDarkMode ? 'text-red-400' : 'text-red-600',
    bg: props.isDarkMode ? 'bg-red-500/20' : 'bg-red-100',
  }
}

// Función para ir a Games con filtro de plataforma
const goToGamesWithPlatform = (platformName) => {
  // Buscar el ID de la plataforma por nombre
  const platformMap = {
    PC: 4,
    'PlayStation 5': 187,
    'PlayStation 4': 18,
    'Xbox One': 1,
    'Xbox Series S/X': 186,
    'Nintendo Switch': 7,
    iOS: 3,
    Android: 21,
    'PlayStation 3': 16,
    'Xbox 360': 14,
    'Nintendo 3DS': 8,
    'PS Vita': 19,
    'Wii U': 10,
    Wii: 11,
    'Nintendo DS': 9,
    'GameBoy Advance': 12,
    PSP: 13,
    macOS: 5,
    Linux: 6,
    Web: 171,
  }

  const platformId = platformMap[platformName]
  if (platformId) {
    router.push({
      path: '/games',
      query: {
        platforms: platformId.toString(),
        search: `plataforma: ${platformName}`,
      },
    })
  } else {
    // Si no encontramos el ID, hacer búsqueda por texto
    router.push({
      path: '/games',
      query: {
        search: platformName,
      },
    })
  }
}

onMounted(() => {
  fetchGameDetails()
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
        class="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse transition-colors duration-500"
        :class="props.isDarkMode ? 'bg-cyan-500' : 'bg-blue-400'"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000 transition-colors duration-500"
        :class="props.isDarkMode ? 'bg-pink-500' : 'bg-purple-400'"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 py-8">
      <!-- Botón Volver -->
      <button
        @click="goBack"
        class="mb-8 group inline-flex items-center px-6 py-3 backdrop-blur-md border rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        :class="
          props.isDarkMode
            ? 'bg-black/40 border-cyan-500/30 hover:border-cyan-400 text-white hover:bg-black/60'
            : 'bg-white/60 border-blue-500/30 hover:border-blue-400 text-gray-900 hover:bg-white/80'
        "
      >
        <svg
          class="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span
          class="bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300"
          :class="props.isDarkMode ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'"
        >
          Volver a Juegos
        </span>
      </button>

      <!-- Loading -->
      <div v-if="loading" class="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="xl" :showText="true" loadingText="Cargando detalles épicos..." />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="min-h-[60vh] flex items-center justify-center relative z-50">
        <div class="max-w-md w-full">
          <ErrorMessage
            :type="error.type"
            title="Error al cargar el juego"
            :message="error.message"
            :details="error.details"
            @retry="handleRetry"
            @dismiss="goBack"
          />
        </div>
      </div>

      <!-- Detalles del juego -->
      <div v-else-if="game" class="space-y-8">
        <!-- Header del juego -->
        <div class="relative">
          <!-- Imagen de fondo con overlay -->
          <div v-if="game.background_image" class="relative h-96 rounded-2xl overflow-hidden">
            <img :src="game.background_image" :alt="game.name" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
            ></div>

            <!-- Contenido sobre la imagen -->
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <!-- Info principal -->
                <div class="flex-1">
                  <h1 class="text-4xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                    {{ game.name }}
                  </h1>

                  <!-- Badges principales -->
                  <div class="flex flex-wrap gap-3">
                    <div
                      class="flex items-center space-x-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-xl border border-yellow-500/30"
                    >
                      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        />
                      </svg>
                      <span class="text-yellow-400 font-bold">{{ formatRating(game.rating) }}</span>
                    </div>

                    <div
                      v-if="game.metacritic"
                      class="flex items-center space-x-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-xl border border-gray-500/30"
                    >
                      <span class="text-gray-300 text-sm">Metacritic:</span>
                      <span :class="formatMetacritic(game.metacritic).color" class="font-bold">
                        {{ formatMetacritic(game.metacritic).score }}
                      </span>
                    </div>

                    <div
                      v-if="game.released"
                      class="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-xl border border-purple-500/30"
                    >
                      <span class="text-purple-400 font-semibold">{{ game.released }}</span>
                    </div>
                  </div>
                </div>

                <!-- Botón Top 5 -->
                <div class="lg:flex-shrink-0">
                  <button
                    @click="handleAddToTop5"
                    :disabled="isGameInTop5"
                    class="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/50"
                  >
                    <div class="flex items-center space-x-3">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        />
                      </svg>
                      <span>{{ isGameInTop5 ? '¡En tu Top 5!' : 'Agregar a Top 5' }}</span>
                    </div>

                    <!-- Efecto de partículas -->
                    <div
                      v-if="!isGameInTop5"
                      class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping opacity-0 group-hover:opacity-100"
                    ></div>
                    <div
                      v-if="!isGameInTop5"
                      class="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-300 rounded-full animate-ping opacity-0 group-hover:opacity-100 animation-delay-300"
                    ></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Grid de contenido -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Columna principal -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Descripción -->
            <div
              class="backdrop-blur-md rounded-2xl p-8 border transition-all duration-500"
              :class="
                props.isDarkMode
                  ? 'bg-black/40 border-gray-700/50'
                  : 'bg-white/70 border-gray-200/50'
              "
            >
              <h2
                class="text-2xl font-bold mb-6 flex items-center transition-colors duration-500"
                :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
              >
                <svg
                  class="w-6 h-6 mr-3 transition-colors duration-500"
                  :class="props.isDarkMode ? 'text-cyan-400' : 'text-blue-600'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Descripción
              </h2>
              <div
                v-if="game.description"
                v-html="game.description"
                class="leading-relaxed prose max-w-none transition-colors duration-500"
                :class="
                  props.isDarkMode ? 'prose-invert text-gray-300' : 'prose-gray text-gray-700'
                "
              ></div>
              <p
                v-else
                class="italic transition-colors duration-500"
                :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'"
              >
                No hay descripción disponible.
              </p>
            </div>

            <!-- Screenshots -->
            <div
              v-if="screenshots.length > 0"
              class="backdrop-blur-md rounded-2xl p-8 border transition-all duration-500"
              :class="
                props.isDarkMode
                  ? 'bg-black/40 border-gray-700/50'
                  : 'bg-white/70 border-gray-200/50'
              "
            >
              <h2
                class="text-2xl font-bold mb-6 flex items-center transition-colors duration-500"
                :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
              >
                <svg
                  class="w-6 h-6 mr-3 transition-colors duration-500"
                  :class="props.isDarkMode ? 'text-purple-400' : 'text-purple-600'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Screenshots
              </h2>

              <!-- Screenshot principal -->
              <div class="mb-6">
                <img
                  :src="screenshots[selectedScreenshot]?.image"
                  alt="Screenshot"
                  class="w-full h-80 object-cover rounded-xl shadow-2xl"
                />
              </div>

              <!-- Thumbnails -->
              <div class="grid grid-cols-4 md:grid-cols-6 gap-3">
                <button
                  v-for="(shot, index) in screenshots.slice(0, 12)"
                  :key="shot.id"
                  @click="selectScreenshot(index)"
                  class="relative group overflow-hidden rounded-lg transition-all duration-300 hover:scale-105"
                  :class="{
                    'ring-2': selectedScreenshot === index,
                    'ring-cyan-400': selectedScreenshot === index && props.isDarkMode,
                    'ring-blue-500': selectedScreenshot === index && !props.isDarkMode,
                  }"
                >
                  <img
                    :src="shot.image"
                    alt="Screenshot thumbnail"
                    class="w-full h-16 object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                  <div
                    v-if="selectedScreenshot === index"
                    class="absolute inset-0 transition-colors duration-300"
                    :class="props.isDarkMode ? 'bg-cyan-400/20' : 'bg-blue-500/20'"
                  ></div>
                </button>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Información del juego -->
            <div
              class="backdrop-blur-md rounded-2xl p-6 border transition-all duration-500"
              :class="
                props.isDarkMode
                  ? 'bg-black/40 border-gray-700/50'
                  : 'bg-white/70 border-gray-200/50'
              "
            >
              <h3
                class="text-xl font-bold mb-6 flex items-center transition-colors duration-500"
                :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
              >
                <svg
                  class="w-5 h-5 mr-2 transition-colors duration-500"
                  :class="props.isDarkMode ? 'text-cyan-400' : 'text-blue-600'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Información
              </h3>

              <div class="space-y-4">
                <!-- Rating -->
                <div
                  class="flex justify-between items-center py-2 border-b transition-colors duration-500"
                  :class="props.isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'"
                >
                  <span
                    class="transition-colors duration-500"
                    :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                  >
                    Rating
                  </span>
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      />
                    </svg>
                    <span
                      class="font-semibold transition-colors duration-500"
                      :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                      {{ formatRating(game.rating) }}
                    </span>
                  </div>
                </div>

                <!-- Fecha de lanzamiento -->
                <div
                  v-if="game.released"
                  class="flex justify-between items-center py-2 border-b transition-colors duration-500"
                  :class="props.isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'"
                >
                  <span
                    class="transition-colors duration-500"
                    :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                  >
                    Lanzamiento
                  </span>
                  <span
                    class="transition-colors duration-500"
                    :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
                  >
                    {{ game.released }}
                  </span>
                </div>

                <!-- Desarrollador -->
                <div
                  v-if="game.developers?.length"
                  class="flex justify-between items-center py-2 border-b transition-colors duration-500"
                  :class="props.isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'"
                >
                  <span
                    class="transition-colors duration-500"
                    :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                  >
                    Desarrollador
                  </span>
                  <span
                    class="text-right transition-colors duration-500"
                    :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
                  >
                    {{ game.developers[0].name }}
                  </span>
                </div>

                <!-- Publisher -->
                <div
                  v-if="game.publishers?.length"
                  class="flex justify-between items-center py-2 border-b transition-colors duration-500"
                  :class="props.isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'"
                >
                  <span
                    class="transition-colors duration-500"
                    :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                  >
                    Publisher
                  </span>
                  <span
                    class="text-right transition-colors duration-500"
                    :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
                  >
                    {{ game.publishers[0].name }}
                  </span>
                </div>

                <!-- ESRB Rating -->
                <div v-if="game.esrb_rating" class="flex justify-between items-center py-2">
                  <span
                    class="transition-colors duration-500"
                    :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                  >
                    ESRB
                  </span>
                  <span
                    class="transition-colors duration-500"
                    :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
                  >
                    {{ game.esrb_rating.name }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Géneros -->
            <div
              v-if="formattedGenres.length"
              class="backdrop-blur-md rounded-2xl p-6 border transition-all duration-500"
              :class="
                props.isDarkMode
                  ? 'bg-black/40 border-gray-700/50'
                  : 'bg-white/70 border-gray-200/50'
              "
            >
              <h3
                class="text-xl font-bold mb-4 flex items-center transition-colors duration-500"
                :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
              >
                <svg
                  class="w-5 h-5 mr-2 transition-colors duration-500"
                  :class="props.isDarkMode ? 'text-purple-400' : 'text-purple-600'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Géneros
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="genre in formattedGenres"
                  :key="genre"
                  class="px-3 py-1 rounded-full text-sm border transition-all duration-300"
                  :class="
                    props.isDarkMode
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30'
                      : 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200'
                  "
                >
                  {{ genre }}
                </span>
              </div>
            </div>

            <!-- Plataformas -->
            <div
              v-if="formattedPlatforms.length"
              class="backdrop-blur-md rounded-2xl p-6 border transition-all duration-500"
              :class="
                props.isDarkMode
                  ? 'bg-black/40 border-gray-700/50'
                  : 'bg-white/70 border-gray-200/50'
              "
            >
              <h3
                class="text-xl font-bold mb-4 flex items-center transition-colors duration-500"
                :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
              >
                <svg
                  class="w-5 h-5 mr-2 transition-colors duration-500"
                  :class="props.isDarkMode ? 'text-green-400' : 'text-green-600'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Plataformas
              </h3>
              <div class="grid grid-cols-1 gap-2">
                <button
                  v-for="platform in formattedPlatforms.slice(0, 8)"
                  :key="platform"
                  @click="goToGamesWithPlatform(platform)"
                  class="px-3 py-2 rounded-lg text-sm border text-center transition-all duration-300 hover:scale-105"
                  :class="
                    props.isDarkMode
                      ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30'
                      : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
                  "
                >
                  {{ platform }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notificación flotante -->
    <div v-if="showMessage" class="fixed top-4 right-4 z-[9999] animate-slide-in max-w-sm">
      <div
        :class="[
          messageData.type === 'success' ? 'bg-green-500/90 border-green-400' : '',
          messageData.type === 'error' ? 'bg-red-500/90 border-red-400' : '',
          messageData.type === 'warning' ? 'bg-yellow-500/90 border-yellow-400' : '',
          messageData.type === 'info' ? 'bg-blue-500/90 border-blue-400' : '',
          'backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-2xl border flex items-center space-x-3',
        ]"
      >
        <!-- Icono según el tipo -->
        <svg
          v-if="messageData.type === 'success'"
          class="w-6 h-6 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else-if="messageData.type === 'error'"
          class="w-6 h-6 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <svg
          v-else-if="messageData.type === 'warning'"
          class="w-6 h-6 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <div class="flex-1 min-w-0">
          <p v-if="messageData.title" class="font-bold text-sm">{{ messageData.title }}</p>
          <p class="text-sm" :class="{ 'mt-1': messageData.title }">{{ messageData.message }}</p>
        </div>

        <!-- Botón cerrar -->
        <button
          @click="showMessage = false"
          class="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.5s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

/* Estilos para el contenido HTML - Tema Oscuro */
.prose-invert h1,
.prose-invert h2,
.prose-invert h3 {
  @apply text-white font-bold;
}

.prose-invert p {
  @apply text-gray-300 mb-4;
}

.prose-invert a {
  @apply text-cyan-400 hover:text-cyan-300;
}

.prose-invert strong {
  @apply text-white font-semibold;
}

.prose-invert ul,
.prose-invert ol {
  @apply text-gray-300;
}

/* Estilos para el contenido HTML - Tema Claro */
.prose-gray h1,
.prose-gray h2,
.prose-gray h3 {
  @apply text-gray-900 font-bold;
}

.prose-gray p {
  @apply text-gray-700 mb-4;
}

.prose-gray a {
  @apply text-blue-600 hover:text-blue-500;
}

.prose-gray strong {
  @apply text-gray-900 font-semibold;
}

.prose-gray ul,
.prose-gray ol {
  @apply text-gray-700;
}
</style>
