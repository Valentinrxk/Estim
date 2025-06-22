<template>
  <section class="text-center mb-16">
    <div class="mb-8">
      <h1
        class="text-5xl lg:text-7xl font-bold mb-6 transition-colors duration-500"
        :class="textClasses.primary"
      >
        🎮
        <span class="bg-gradient-to-r bg-clip-text text-transparent" :class="gradientClasses.title">
          ESTIM
        </span>
        🎮
      </h1>

      <p
        class="text-xl lg:text-2xl mb-8 transition-colors duration-500"
        :class="textClasses.secondary"
      >
        Descubrí tu próximo juego épico
      </p>

      <!-- Decorative Line -->
      <div
        class="w-32 h-1 mx-auto rounded-full transition-colors duration-500 bg-gradient-to-r"
        :class="gradientClasses.line"
      />
    </div>

    <!-- Main CTA Button -->
    <div v-if="!showGameList" class="mb-16">
      <button
        @click="$emit('startExploring')"
        :disabled="loading"
        class="group relative inline-flex items-center px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 hover:scale-110 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r text-white"
        :class="[gradientClasses.button, shadowClasses]"
      >
        <!-- Glow Effect -->
        <div
          class="absolute -inset-1 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 bg-gradient-to-r"
          :class="gradientClasses.button"
        />

        <div class="relative flex items-center">
          <!-- Loading Spinner -->
          <svg
            v-if="loading"
            class="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>

          <!-- Search Icon -->
          <svg
            v-else
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

          <span>{{ loading ? 'Cargando...' : 'Comenzar' }}</span>
          <div v-if="!loading" class="ml-4 w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showGameList: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['startExploring'])

const textClasses = computed(() => ({
  primary: props.isDarkMode ? 'text-white' : 'text-gray-900',
  secondary: props.isDarkMode ? 'text-gray-300' : 'text-gray-600',
}))

const gradientClasses = computed(() => ({
  title: props.isDarkMode
    ? 'from-cyan-400 via-purple-400 to-pink-400'
    : 'from-blue-600 via-purple-600 to-pink-600',
  line: props.isDarkMode ? 'from-cyan-400 to-purple-400' : 'from-blue-500 to-purple-500',
  button: props.isDarkMode
    ? 'from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400'
    : 'from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400',
}))

const shadowClasses = computed(() =>
  props.isDarkMode
    ? 'shadow-cyan-500/25 hover:shadow-cyan-500/50'
    : 'shadow-blue-500/25 hover:shadow-blue-500/50',
)
</script>
