<template>
  <div class="relative">
    <!-- Imagen de fondo con overlay -->
    <div v-if="game.background_image" class="relative h-96 rounded-2xl overflow-hidden">
      <img :src="game.background_image" :alt="game.name" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

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
              @click="$emit('addToTop5')"
              :disabled="isInTop5"
              class="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/50"
            >
              <div class="flex items-center space-x-3">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
                <span>{{ isInTop5 ? '¡En tu Top 5!' : 'Agregar a Top 5' }}</span>
              </div>

              <!-- Efecto de partículas -->
              <div
                v-if="!isInTop5"
                class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping opacity-0 group-hover:opacity-100"
              ></div>
              <div
                v-if="!isInTop5"
                class="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-300 rounded-full animate-ping opacity-0 group-hover:opacity-100 animation-delay-300"
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  game: Object,
  isInTop5: Boolean,
  isDarkMode: Boolean,
})

defineEmits(['addToTop5'])

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
</script>

<style scoped>
.animation-delay-300 {
  animation-delay: 0.3s;
}
</style>
