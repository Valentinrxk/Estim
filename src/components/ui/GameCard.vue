<template>
  <div
    class="group relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20"
  >
    <div class="relative overflow-hidden h-48">
      <img
        :src="game.background_image || '/placeholder.svg?height=300&width=400'"
        :alt="game.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"
      ></div>

      <div
        class="absolute top-3 right-3 bg-black bg-opacity-70 rounded-full px-2 py-1 flex items-center space-x-1"
      >
        <span class="text-yellow-400 text-sm">★</span>
        <span class="text-white text-sm font-medium">{{ game.rating }}</span>
      </div>
    </div>

    <div class="p-4">
      <h3 class="font-bold text-lg text-white mb-2 game-title">
        {{ game.name }}
      </h3>

      <div class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="genre in game.genres?.slice(0, 2)"
          :key="genre.id || genre"
          class="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
        >
          {{ typeof genre === 'string' ? genre : genre.name }}
        </span>
      </div>

      <p class="text-gray-400 text-sm game-description">
        {{ game.description_raw || 'No hay descripción disponible.' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.game-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

.game-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}
</style>

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
