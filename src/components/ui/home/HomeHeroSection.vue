<template>
  <section class="text-center py-20">
    <div class="max-w-4xl mx-auto">
      <h1
        class="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up"
        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
      >
        Descubre tu próximo
        <span
          class="bg-gradient-to-r bg-clip-text text-transparent animate-gradient-x"
          :class="
            isDarkMode
              ? 'from-cyan-400 via-purple-400 to-pink-400'
              : 'from-orange-500 via-yellow-500 to-red-500'
          "
        >
          juego favorito
        </span>
      </h1>

      <p
        class="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300"
        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
      >
        Explora miles de juegos, crea tu Top 5 personal y encuentra tu próxima aventura gaming
      </p>

      <div class="animate-fade-in-up animation-delay-600">
        <button
          @click="$emit('start-exploring')"
          :disabled="loading"
          class="group relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl"
          :class="
            isDarkMode
              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-cyan-500/25 hover:shadow-cyan-500/50'
              : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white shadow-yellow-500/25 hover:shadow-yellow-500/50'
          "
        >
          <div class="flex items-center space-x-3">
            <svg
              v-if="!loading"
              class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <LoadingSpinner v-else size="sm" />
            <span>{{
              loading ? 'Cargando...' : showGameList ? 'Explorar más juegos' : 'Comenzar a explorar'
            }}</span>
          </div>

          <!-- Efectos de partículas -->
          <div
            class="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping opacity-0 group-hover:opacity-100"
            :class="isDarkMode ? 'bg-cyan-300' : 'bg-yellow-300'"
          ></div>
          <div
            class="absolute -bottom-1 -left-1 w-2 h-2 rounded-full animate-ping opacity-0 group-hover:opacity-100 animation-delay-300"
            :class="isDarkMode ? 'bg-purple-300' : 'bg-orange-300'"
          ></div>
        </button>
      </div>

      <!-- Indicadores de scroll -->
      <div v-if="!showGameList" class="mt-16 animate-bounce">
        <svg
          class="w-6 h-6 mx-auto opacity-50"
          :class="isDarkMode ? 'text-white' : 'text-gray-600'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import LoadingSpinner from '@/components/ui/common/LoadingSpinner.vue'

defineProps({
  isDarkMode: Boolean,
  loading: Boolean,
  showGameList: Boolean,
})

defineEmits(['start-exploring'])
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradient-x {
  0%,
  100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}
</style>
