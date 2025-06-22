<template>
  <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
    <button
      @click="$emit('goToGames')"
      class="group inline-flex items-center px-8 py-4 backdrop-blur-md border rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl"
      :class="primaryButtonClasses"
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
        :class="isDarkMode ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'"
      >
        Descubrir Más Juegos
      </span>
    </button>

    <div class="flex items-center space-x-4">
      <button
        v-if="showReorderButton"
        @click="$emit('openModal')"
        class="group inline-flex items-center px-8 py-4 border rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        :class="secondaryButtonClasses"
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
        @click="$emit('clearAll')"
        class="group inline-flex items-center px-8 py-4 border rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        :class="dangerButtonClasses"
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
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isDarkMode: Boolean,
  showReorderButton: Boolean,
})

defineEmits(['goToGames', 'openModal', 'clearAll'])

const primaryButtonClasses = computed(() =>
  props.isDarkMode
    ? 'bg-black/40 border-cyan-500/30 hover:border-cyan-400 text-white shadow-cyan-500/25'
    : 'bg-white/60 border-blue-500/30 hover:border-blue-400 text-gray-900',
)

const secondaryButtonClasses = computed(() =>
  props.isDarkMode
    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-400 text-purple-400'
    : 'bg-gradient-to-r from-purple-100/60 to-pink-100/60 border-purple-300/50 hover:border-purple-400 text-purple-600',
)

const dangerButtonClasses = computed(() =>
  props.isDarkMode
    ? 'bg-red-500/20 border-red-500/30 hover:border-red-400 text-red-400'
    : 'bg-red-100/60 border-red-300/50 hover:border-red-400 text-red-600',
)
</script>
