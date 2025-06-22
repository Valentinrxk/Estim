<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value),
  },
  showText: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: 'Angelito puto...',
  },
})

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
}
</script>

<template>
  <div class="flex flex-col items-center justify-center space-y-4">
    <div class="relative">
      <div
        :class="[
          sizeClasses[size],
          'animate-spin rounded-full border-4 border-gray-700 border-t-cyan-400',
        ]"
      ></div>
    </div>

    <div v-if="showText" class="text-center">
      <p class="text-white font-semibold text-lg">{{ loadingText }}</p>
      <div class="flex justify-center space-x-1 mt-2">
        <div class="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
        <div
          class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
          style="animation-delay: 0.1s"
        ></div>
        <div
          class="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
          style="animation-delay: 0.2s"
        ></div>
      </div>
    </div>
  </div>
</template>
