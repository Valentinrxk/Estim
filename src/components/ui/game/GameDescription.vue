<!-- components/ui/game/GameDescription.vue -->
<template>
  <div
    class="backdrop-blur-md rounded-2xl p-8 border transition-all duration-500"
    :class="isDarkMode ? 'bg-black/40 border-gray-700/50' : 'bg-white/70 border-gray-200/50'"
  >
    <h2
      class="text-2xl font-bold mb-6 flex items-center transition-colors duration-500"
      :class="isDarkMode ? 'text-white' : 'text-gray-900'"
    >
      <svg
        class="w-6 h-6 mr-3 transition-colors duration-500"
        :class="isDarkMode ? 'text-cyan-400' : 'text-blue-600'"
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
      :class="isDarkMode ? 'prose-invert text-gray-300' : 'prose-gray text-gray-700'"
    ></div>
    <p
      v-else
      class="italic transition-colors duration-500"
      :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
    >
      No hay descripción disponible.
    </p>
  </div>
</template>

<script setup>
defineProps({
  game: Object,
  isDarkMode: Boolean,
})
</script>
