<script setup>
const props = defineProps({
  loading: Boolean,
  resultsText: String,
  currentPage: Number,
  totalPages: Number,
  isDarkMode: Boolean,
})

const subtitleClasses = props.isDarkMode ? 'text-gray-300' : 'text-gray-600'
</script>

<template>
  <div
    v-if="!loading"
    class="mb-8 text-center transition-colors duration-500"
    :class="subtitleClasses"
  >
    <p class="text-lg font-semibold">{{ resultsText }}</p>
    <p v-if="totalPages > 1" class="text-sm mt-2 opacity-75">
      Página {{ currentPage }} de {{ totalPages }}
    </p>
  </div>
</template>
