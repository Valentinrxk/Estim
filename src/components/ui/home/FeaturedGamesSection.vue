<template>
  <section class="mb-16">
    <h2
      class="text-3xl font-bold text-center mb-12 transition-colors duration-500"
      :class="textClasses.primary"
    >
      🌟 Juegos Destacados
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="game in games"
        :key="game.id"
        @click="$emit('gameClick', game.id)"
        class="group cursor-pointer transform transition-all duration-500 hover:scale-105"
      >
        <div
          class="rounded-3xl overflow-hidden border transition-all duration-500 group-hover:shadow-2xl"
          :class="cardClasses.featured"
        >
          <!-- Game Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="game.background_image"
              :alt="game.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <!-- Rating Badge -->
            <div
              class="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-white text-sm font-bold border border-white/20"
            >
              ⭐ {{ game.rating }}
            </div>
          </div>

          <!-- Game Content -->
          <div class="p-6">
            <h3
              class="font-bold text-xl mb-3 line-clamp-2 transition-colors duration-300"
              :class="[textClasses.primary, hoverClasses.text]"
            >
              {{ game.name }}
            </h3>

            <!-- Genres -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="genre in game.genres"
                :key="genre"
                class="px-3 py-1 rounded-full text-sm border transition-colors duration-300"
                :class="badgeClasses"
              >
                {{ genre }}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isDarkMode: Boolean,
  games: Array,
})

defineEmits(['gameClick'])

const textClasses = computed(() => ({
  primary: props.isDarkMode ? 'text-white' : 'text-gray-900',
}))

const cardClasses = computed(() => ({
  featured: props.isDarkMode
    ? 'bg-black/60 backdrop-blur-xl border-gray-700/50 hover:border-cyan-400/50 group-hover:shadow-cyan-500/25'
    : 'bg-white/80 backdrop-blur-xl border-gray-200/50 hover:border-blue-400/50 group-hover:shadow-blue-500/25',
}))

const hoverClasses = computed(() => ({
  text: props.isDarkMode ? 'group-hover:text-cyan-400' : 'group-hover:text-blue-600',
}))

const badgeClasses = computed(() =>
  props.isDarkMode
    ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30'
    : 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200',
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
