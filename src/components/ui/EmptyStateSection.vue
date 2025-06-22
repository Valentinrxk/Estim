<template>
  <section class="text-center py-20">
    <div class="relative mb-12">
      <div class="relative inline-block">
        <svg
          class="w-40 h-40 mx-auto animate-bounce transition-colors duration-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          :class="isDarkMode ? 'text-gray-500' : 'text-gray-600'"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>

        <div
          class="absolute -top-4 -right-4 w-4 h-4 rounded-full animate-ping"
          :class="isDarkMode ? 'bg-yellow-400' : 'bg-yellow-500'"
        />
        <div
          class="absolute -bottom-4 -left-4 w-3 h-3 rounded-full animate-ping animation-delay-1000"
          :class="isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'"
        />
        <div
          class="absolute top-1/2 -right-8 w-2 h-2 rounded-full animate-ping animation-delay-2000"
          :class="isDarkMode ? 'bg-purple-400' : 'bg-purple-500'"
        />
      </div>
    </div>

    <h2
      class="text-4xl font-bold mb-6 transition-colors duration-500"
      :class="isDarkMode ? 'text-white' : 'text-gray-900'"
    >
      Tu Hall of Fame está esperando
    </h2>

    <p
      class="text-xl mb-12 max-w-2xl mx-auto leading-relaxed transition-colors duration-500"
      :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
    >
      Explora el universo gaming y descubre esos títulos que merecen un lugar en tu olimpo personal.
      ¡Cada juego cuenta una historia épica!
    </p>

    <button
      @click="$emit('goToGames')"
      class="group relative inline-flex items-center px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 hover:scale-110 shadow-2xl text-white"
      :class="buttonClasses"
    >
      <div
        class="absolute -inset-1 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"
        :class="buttonClasses"
      />

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
        <div class="ml-4 w-2 h-2 bg-white rounded-full animate-pulse" />
      </div>
    </button>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isDarkMode: Boolean,
})

defineEmits(['goToGames'])

const buttonClasses = computed(() =>
  props.isDarkMode
    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400'
    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400',
)
</script>

<style scoped>
.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
