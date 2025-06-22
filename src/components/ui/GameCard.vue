<template>
  <article class="relative group transform transition-all duration-500 hover:scale-105">
    <!-- Ranking Badge -->
    <div class="absolute -top-6 -left-6 z-30">
      <div
        class="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl border-4 border-white transform rotate-12 group-hover:rotate-0 transition-transform duration-500"
        :class="`bg-gradient-to-br ${rankingGradient}`"
      >
        {{ index + 1 }}
      </div>
      <div
        class="absolute inset-0 w-16 h-16 rounded-full blur-lg opacity-50 animate-pulse"
        :class="`bg-gradient-to-br ${rankingGradient}`"
      />
    </div>

    <!-- Special Icon for Top 3 -->
    <div v-if="index < 3" class="absolute -top-4 -right-4 z-30 text-3xl animate-bounce">
      {{ rankingIcon }}
    </div>

    <!-- Game Card -->
    <div
      class="relative backdrop-blur-xl rounded-3xl overflow-hidden border transition-all duration-500 group-hover:shadow-2xl"
      :class="cardClasses"
    >
      <!-- Image -->
      <div class="relative h-64 overflow-hidden">
        <img
          :src="game.background_image || '/placeholder.svg?height=300&width=400'"
          :alt="game.name"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <!-- Remove Button -->
        <button
          @click="$emit('remove', game.id)"
          class="absolute top-4 right-4 w-10 h-10 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm"
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

        <!-- Position Badge -->
        <div
          class="absolute bottom-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-white text-sm font-bold border border-white/20"
        >
          #{{ index + 1 }} en tu Top
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-4">
        <h3
          class="font-bold text-xl leading-tight line-clamp-2 transition-colors duration-300"
          :class="titleClasses"
        >
          {{ game.name }}
        </h3>

        <!-- Rating and Actions -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            <span class="text-yellow-400 font-bold">{{ game.rating?.toFixed(1) || 'N/A' }}</span>
          </div>

          <button
            @click="$emit('click', game.id)"
            class="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border"
            :class="buttonClasses"
          >
            Ver Detalles
          </button>
        </div>

        <!-- Date Added -->
        <div
          class="text-xs transition-colors duration-500"
          :class="isDarkMode ? 'text-gray-500' : 'text-gray-600'"
        >
          Agregado: {{ new Date(game.addedAt || Date.now()).toLocaleDateString() }}
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  game: Object,
  index: Number,
  isDarkMode: Boolean,
})

defineEmits(['remove', 'click'])

const RANKING_ICONS = ['👑', '🥈', '🥉', '⭐', '⭐']
const RANKING_GRADIENTS = {
  dark: [
    'from-yellow-400 to-orange-500',
    'from-gray-300 to-gray-500',
    'from-orange-400 to-orange-600',
    'from-purple-400 to-purple-600',
    'from-purple-400 to-purple-600',
  ],
  light: [
    'from-yellow-500 to-orange-600',
    'from-gray-400 to-gray-600',
    'from-orange-500 to-orange-700',
    'from-purple-500 to-purple-700',
    'from-purple-500 to-purple-700',
  ],
}

const rankingGradient = computed(() => {
  const gradients = props.isDarkMode ? RANKING_GRADIENTS.dark : RANKING_GRADIENTS.light
  return gradients[props.index] || gradients[4]
})

const rankingIcon = computed(() => RANKING_ICONS[props.index] || '⭐')

const cardClasses = computed(() =>
  props.isDarkMode
    ? 'bg-black/60 border-gray-700/50 hover:border-cyan-400/50 group-hover:shadow-cyan-500/25'
    : 'bg-white/70 border-gray-200/50 hover:border-blue-400/50 group-hover:shadow-blue-500/25',
)

const titleClasses = computed(() =>
  props.isDarkMode
    ? 'text-white group-hover:text-cyan-400'
    : 'text-gray-900 group-hover:text-blue-600',
)

const buttonClasses = computed(() =>
  props.isDarkMode
    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/40 hover:to-purple-500/40 text-cyan-400 border-cyan-500/30'
    : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 text-blue-600 border-blue-500/30',
)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
