<template>
  <section class="mb-16">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold transition-colors duration-500" :class="textClasses.primary">
        🎯 Juegos Recomendados
      </h2>

      <button
        @click="$emit('viewAll')"
        class="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        :class="viewAllButtonClasses"
      >
        Ver Todos
      </button>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <LoadingSpinner size="lg" :showText="true" loadingText="Angelito Putin..." />
    </div>

    <div v-else-if="error" class="flex justify-center py-12">
      <div class="max-w-md w-full">
        <ErrorMessage
          :type="error.type"
          title="Error al cargar juegos"
          :message="error.message"
          :details="error.details"
          @retry="$emit('retry')"
          @dismiss="() => {}"
        />
      </div>
    </div>

    <!-- Games Grid -->
    <div
      v-else-if="games.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <article
        v-for="game in games.slice(0, 8)"
        :key="game.id"
        @click="$emit('gameClick', game.id)"
        class="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      >
        <div
          class="rounded-2xl overflow-hidden border transition-all duration-300"
          :class="cardClasses.game"
        >
          <div class="relative h-32 overflow-hidden">
            <img
              :src="game.background_image || '/placeholder.svg?height=200&width=300'"
              :alt="game.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div class="p-4">
            <h3
              class="font-bold text-sm line-clamp-2 transition-colors duration-300"
              :class="[textClasses.primary, hoverClasses.text]"
            >
              {{ game.name }}
            </h3>

            <div class="flex items-center mt-2">
              <span class="text-yellow-400 text-xs">⭐</span>
              <span class="text-xs ml-1 transition-colors duration-300" :class="textClasses.muted">
                {{ game.rating?.toFixed(1) || 'N/A' }}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div
        class="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-colors duration-500"
        :class="isDarkMode ? 'bg-gray-800/50 text-gray-600' : 'bg-gray-100/50 text-gray-400'"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3
        class="text-xl font-bold mb-2 transition-colors duration-500"
        :class="textClasses.primary"
      >
        No hay juegos disponibles
      </h3>
      <p class="transition-colors duration-500" :class="textClasses.muted">
        Intenta recargar la página o verifica tu conexión
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import LoadingSpinner from '@/components/ui/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/ui/common/ErrorMessage.vue'

const props = defineProps({
  isDarkMode: Boolean,
  games: Array,
  loading: Boolean,
  error: Object,
})

defineEmits(['gameClick', 'viewAll', 'retry'])

const textClasses = computed(() => ({
  primary: props.isDarkMode ? 'text-white' : 'text-gray-900',
  muted: props.isDarkMode ? 'text-gray-400' : 'text-gray-600',
}))

const cardClasses = computed(() => ({
  game: props.isDarkMode
    ? 'bg-black/40 backdrop-blur-md border-gray-700/50 hover:border-cyan-400/50'
    : 'bg-white/70 backdrop-blur-md border-gray-200/50 hover:border-blue-400/50',
}))

const hoverClasses = computed(() => ({
  text: props.isDarkMode ? 'group-hover:text-cyan-400' : 'group-hover:text-blue-600',
}))

const viewAllButtonClasses = computed(() =>
  props.isDarkMode
    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30'
    : 'bg-blue-500/20 text-blue-600 border border-blue-500/30 hover:bg-blue-500/30',
)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
