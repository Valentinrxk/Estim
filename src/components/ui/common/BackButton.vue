<template>
  <button
    @click="$emit('click')"
    class="mb-8 group inline-flex items-center px-6 py-3 backdrop-blur-md border rounded-xl font-semibold transition-all duration-300 hover:scale-105"
    :class="buttonClasses"
  >
    <svg
      class="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    <span
      class="bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300"
      :class="textGradient"
    >
      {{ text }}
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isDarkMode: Boolean,
  text: {
    type: String,
    default: 'Volver',
  },
})

defineEmits(['click'])

const buttonClasses = computed(() =>
  props.isDarkMode
    ? 'bg-black/40 border-cyan-500/30 hover:border-cyan-400 text-white hover:bg-black/60'
    : 'bg-white/60 border-blue-500/30 hover:border-blue-400 text-gray-900 hover:bg-white/80',
)

const textGradient = computed(() =>
  props.isDarkMode ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600',
)
</script>
