<script setup>
const props = defineProps({
  isDarkMode: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div
      class="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
      :class="props.isDarkMode ? 'bg-cyan-500' : 'bg-blue-400'"
    />
    <div
      class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
      :class="props.isDarkMode ? 'bg-pink-500' : 'bg-purple-400'"
    />
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"
      :class="props.isDarkMode ? 'bg-yellow-500' : 'bg-pink-300'"
    />
  </div>
</template>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
