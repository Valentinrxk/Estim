<template>
  <header class="text-center mb-12">
    <div class="inline-block relative mb-6">
      <h1 class="text-6xl lg:text-8xl font-bold">
        <span
          class="bg-gradient-to-r bg-clip-text text-transparent drop-shadow-2xl transition-all duration-500"
          :class="
            isDarkMode
              ? 'from-yellow-400 via-orange-500 to-red-500'
              : 'from-yellow-600 via-orange-600 to-red-600'
          "
        >
          MI TOP 5
        </span>
      </h1>

      <div
        class="absolute -inset-4 blur-xl rounded-full animate-pulse transition-all duration-500"
        :class="
          isDarkMode
            ? 'bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20'
            : 'bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-red-500/30'
        "
      />
    </div>

    <p
      class="text-xl mb-8 max-w-2xl mx-auto transition-colors duration-500"
      :class="textClasses.secondary"
    >
      Los juegos que han conquistado tu corazón gamer. Tu hall of fame personal.
    </p>

    <!-- Statistics -->
    <div class="flex flex-wrap justify-center gap-6 mb-8">
      <div
        v-for="(stat, index) in statsConfig"
        :key="index"
        class="backdrop-blur-md rounded-2xl p-6 border transition-all duration-500"
        :class="[stat.border, isDarkMode ? 'bg-black/40' : 'bg-white/60']"
      >
        <div class="text-4xl font-bold mb-2 transition-colors duration-500" :class="stat.color">
          {{ stat.value }}
        </div>
        <div
          class="text-sm uppercase tracking-wider transition-colors duration-500"
          :class="textClasses.muted"
        >
          {{ stat.label }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    default: false,
  },
  stats: {
    type: Object,
    default: () => ({
      total: 0,
      averageRating: '0.0',
      isFull: false,
    }),
  },
})

const textClasses = computed(() => ({
  secondary: props.isDarkMode ? 'text-gray-300' : 'text-gray-600',
  muted: props.isDarkMode ? 'text-gray-500' : 'text-gray-600',
}))

// Valores seguros con verificación defensiva
const safeStats = computed(() => ({
  total: props.stats?.total ?? 0,
  averageRating: props.stats?.averageRating ?? '0.0',
  isFull: props.stats?.isFull ?? false,
}))

const statsConfig = computed(() => [
  {
    value: `${safeStats.value.total}/5`,
    label: 'Juegos Legendarios',
    color: props.isDarkMode ? 'text-yellow-400' : 'text-yellow-600',
    border: props.isDarkMode ? 'border-yellow-500/30' : 'border-yellow-400/40',
  },
  {
    value: safeStats.value.averageRating,
    label: 'Rating Promedio',
    color: props.isDarkMode ? 'text-cyan-400' : 'text-blue-600',
    border: props.isDarkMode ? 'border-cyan-500/30' : 'border-blue-400/40',
  },
  {
    value: safeStats.value.isFull ? '🔥' : '📈',
    label: safeStats.value.isFull ? 'Completo' : 'En Progreso',
    color: props.isDarkMode ? 'text-purple-400' : 'text-purple-600',
    border: props.isDarkMode ? 'border-purple-500/30' : 'border-purple-400/40',
  },
])
</script>
