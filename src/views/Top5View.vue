<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTop5 } from '@/composables/useTop5'
import HeroSection from '@/components/ui/HeroSection.vue'
import EmptyStateSection from '@/components/ui/EmptyStateSection.vue'
import GameCard from '@/components/ui/GameCard.vue'
import EmptySlot from '@/components/ui/EmptySlot.vue'
import Top5ReorderModal from '@/components/ui/common/Top5ReorderModal.vue'

const props = defineProps({
  isDarkMode: Boolean,
})

const router = useRouter()
const { currentTop5, removeFromTop5, clearTop5, getStats } = useTop5()

const showReorderModal = ref(false)
const stats = computed(() => getStats())

const themeClasses = computed(() => ({
  background: props.isDarkMode
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',
}))

const emptySlots = computed(() => {
  const slotsNeeded = Math.max(0, 5 - currentTop5.value.length)
  return Array.from({ length: slotsNeeded }, (_, i) => ({
    position: currentTop5.value.length + i + 1,
    id: `empty-${i}`,
  }))
})

// Handlers
const handlers = {
  gameClick: (gameId) => router.push(`/game/${gameId}`),
  removeGame: (gameId) => {
    const result = removeFromTop5(gameId)
    if (result.success) console.log(result.message)
  },
  clearAll: () => {
    if (confirm('¿Estás seguro de que quieres limpiar tu Top 5?')) {
      clearTop5()
    }
  },
  goToGames: () => router.push('/games'),
  openModal: () => (showReorderModal.value = true),
  closeModal: () => (showReorderModal.value = false),
}

// Preload crítico
onMounted(() => {
  if (currentTop5.value.length > 0) {
    currentTop5.value.slice(0, 3).forEach((game) => {
      if (game.background_image) {
        const img = new Image()
        img.src = game.background_image
      }
    })
  }
})
</script>

<template>
  <div class="min-h-screen transition-all duration-500" :class="themeClasses.background">
    <!-- Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        :class="isDarkMode ? 'bg-yellow-500' : 'bg-yellow-400'"
      />
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
        :class="isDarkMode ? 'bg-pink-500' : 'bg-pink-400'"
      />
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 py-8">
      <!-- Hero Section -->
      <HeroSection :isDarkMode="isDarkMode" :stats="stats" />

      <!-- Empty State -->
      <EmptyStateSection
        v-if="currentTop5.length === 0"
        :isDarkMode="isDarkMode"
        @goToGames="handlers.goToGames"
      />

      <!-- Games List -->
      <section v-else class="space-y-8">
        <!-- Controls -->
        <ControlsSection
          :isDarkMode="isDarkMode"
          :showReorderButton="currentTop5.length > 1"
          @goToGames="handlers.goToGames"
          @openModal="handlers.openModal"
          @clearAll="handlers.clearAll"
        />

        <!-- Games Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          <GameCard
            v-for="(game, index) in currentTop5"
            :key="game.id"
            :game="game"
            :index="index"
            :isDarkMode="isDarkMode"
            @remove="handlers.removeGame"
            @click="handlers.gameClick"
          />

          <EmptySlot
            v-for="slot in emptySlots"
            :key="slot.id"
            :position="slot.position"
            :isDarkMode="isDarkMode"
            @click="handlers.goToGames"
          />
        </div>
      </section>
    </div>

    <!-- Modal -->
    <Top5ReorderModal
      v-if="showReorderModal"
      :isOpen="showReorderModal"
      :isDarkMode="isDarkMode"
      @close="handlers.closeModal"
      @save="handlers.closeModal"
    />
  </div>
</template>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
