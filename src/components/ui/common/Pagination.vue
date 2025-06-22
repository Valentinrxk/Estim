<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  hasNextPage: Boolean,
  hasPreviousPage: Boolean,
  paginationPages: Array,
  isDarkMode: Boolean,
})

const emit = defineEmits(['previous', 'next', 'goToPage'])
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="flex flex-col sm:flex-row items-center justify-center gap-6 py-8"
    aria-label="Navegación de páginas"
  >
    <button
      @click="emit('previous')"
      :disabled="!hasPreviousPage"
      class="flex items-center px-8 py-4 bg-gradient-to-r text-white rounded-xl font-bold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 text-lg"
      :class="
        props.isDarkMode
          ? 'from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 shadow-gray-500/25'
          : 'from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 shadow-gray-500/25'
      "
    >
      <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Anterior
    </button>

    <div class="flex flex-wrap justify-center gap-3" role="group" aria-label="Páginas">
      <button
        v-for="pageNum in paginationPages"
        :key="pageNum"
        @click="emit('goToPage', pageNum)"
        :disabled="pageNum === currentPage"
        :class="
          pageNum === currentPage
            ? props.isDarkMode
              ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
            : props.isDarkMode
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white shadow-gray-500/25'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900 shadow-gray-300/25'
        "
        class="px-5 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 disabled:cursor-default min-w-[3.5rem] text-lg shadow-lg"
      >
        {{ pageNum }}
      </button>
    </div>

    <button
      @click="emit('next')"
      :disabled="!hasNextPage"
      class="flex items-center px-8 py-4 bg-gradient-to-r text-white rounded-xl font-bold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 text-lg"
      :class="
        props.isDarkMode
          ? 'from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 shadow-gray-500/25'
          : 'from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 shadow-gray-500/25'
      "
    >
      Siguiente
      <svg class="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </nav>
</template>
