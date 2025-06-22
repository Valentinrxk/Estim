<template>
  <div class="relative">
    <div v-if="game.background_image" class="relative h-96 rounded-2xl overflow-hidden">
      <img :src="game.background_image" :alt="game.name" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

      <div class="absolute bottom-0 left-0 right-0 p-8">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div class="flex-1">
            <h1 class="text-4xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {{ game.name }}
            </h1>

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

          <div class="lg:flex-shrink-0">
            <button
              @click="$emit('add-to-top5')"
              :disabled="isGameInTop5"
              class="group relative px-8 py-4 bg-gradient-to-r text-white rounded-xl font-bold transition-all duration-300 shadow-2xl"
              :class="
                isGameInTop5
                  ? 'from-gray-600 to-gray-700 cursor-not-allowed'
                  : 'from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 hover:scale-105 shadow-yellow-500/25 hover:shadow-yellow-500/50'
              "
            >
              <div class="flex items-center space-x-3">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
                <span>{{ isGameInTop5 ? '¡En tu Top 5!' : 'Agregar a Top 5' }}</span>
              </div>

              <!-- Efectos de partículas solo si no está en Top 5 -->
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
</template>

<script setup>
defineProps({
  game: Object,
  isDarkMode: Boolean,
  isGameInTop5: Boolean,
})

defineEmits(['add-to-top5'])

const formatRating = (rating) => (rating ? rating.toFixed(1) : 'N/A')

const formatMetacritic = (score) => {
  if (!score) return { score: 'N/A', color: 'text-gray-400' }
  if (score >= 75) return { score, color: 'text-green-400' }
  if (score >= 50) return { score, color: 'text-yellow-400' }
  return { score, color: 'text-red-400' }
}
</script>

<style scoped>
.animation-delay-300 {
  animation-delay: 0.3s;
}
</style>
