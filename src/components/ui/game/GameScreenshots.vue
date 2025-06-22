<!-- components/ui/game/GameScreenshots.vue -->
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
        :class="isDarkMode ? 'text-purple-400' : 'text-purple-600'"
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

    <div class="mb-6">
      <img
        :src="screenshots[selectedScreenshot]?.image"
        alt="Screenshot"
        class="w-full h-80 object-cover rounded-xl shadow-2xl"
      />
    </div>

    <div class="grid grid-cols-4 md:grid-cols-6 gap-3">
      <button
        v-for="(shot, index) in screenshots.slice(0, 12)"
        :key="shot.id"
        @click="selectedScreenshot = index"
        class="relative group overflow-hidden rounded-lg transition-all duration-300 hover:scale-105"
        :class="{
          'ring-2': selectedScreenshot === index,
          'ring-cyan-400': selectedScreenshot === index && isDarkMode,
          'ring-blue-500': selectedScreenshot === index && !isDarkMode,
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
          :class="isDarkMode ? 'bg-cyan-400/20' : 'bg-blue-500/20'"
        ></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  screenshots: Array,
  isDarkMode: Boolean,
})

const selectedScreenshot = ref(0)
</script>
