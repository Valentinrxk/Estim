<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTop5 } from '@/composables/useTop5'
import LoadingSpinner from '@/components/ui/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/ui/common/ErrorMessage.vue'
import NotificationToast from '@/components/ui/common/NotificationToast.vue'
import BackButton from '@/components/ui/common/BackButton.vue'
import GameHeroSection from '@/components/ui/game/GameHeroSection.vue'
import GameDescription from '@/components/ui/game/GameDescription.vue'
import GameScreenshots from '@/components/ui/game/GameScreenshots.vue'
import GameInfoSidebar from '@/components/ui/game/GameInfoSidebar.vue'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  isDarkMode: Boolean,
})

const gameId = route.params.id
const game = ref(null)
const screenshots = ref([])
const loading = ref(false)
const error = ref(null)
const showMessage = ref(false)
const messageData = ref({
  type: 'success',
  message: '',
  title: null,
})

const { addToTop5, isInTop5 } = useTop5()

const isGameInTop5 = computed(() => {
  return game.value ? isInTop5(game.value.id) : false
})

const showNotification = (type, message, title = null, duration = 3000) => {
  messageData.value = { type, message, title }
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, duration)
}

const fetchGameDetails = async () => {
  try {
    loading.value = true
    error.value = null

    const [gameRes, screenshotsRes] = await Promise.all([
      fetch(`https://api.rawg.io/api/games/${gameId}?key=${import.meta.env.VITE_RAWG_API_KEY}`),
      fetch(
        `https://api.rawg.io/api/games/${gameId}/screenshots?key=${import.meta.env.VITE_RAWG_API_KEY}`,
      ),
    ])

    if (!gameRes.ok) throw new Error('Failed to fetch game details')

    game.value = await gameRes.json()

    if (screenshotsRes.ok) {
      const screenshotsData = await screenshotsRes.json()
      screenshots.value = screenshotsData.results || []
    }
  } catch (err) {
    error.value = {
      type: 'error',
      message: 'No se pudo cargar el detalle del juego',
      details: err.message,
    }
  } finally {
    loading.value = false
  }
}

const handleAddToTop5 = () => {
  if (!game.value) return

  if (isGameInTop5.value) {
    showNotification('info', 'Este juego ya está en tu Top 5', 'Ya agregado')
    return
  }

  const result = addToTop5({
    id: game.value.id,
    name: game.value.name,
    background_image: game.value.background_image,
    rating: game.value.rating,
  })

  if (result.success) {
    showNotification('success', result.message, '¡Genial!')
  } else {
    if (result.type === 'full') {
      showNotification('warning', result.message, 'Top 5 Completo')
    } else if (result.type === 'duplicate') {
      showNotification('info', result.message, 'Ya está agregado')
    } else {
      showNotification('error', result.message, 'Error')
    }
  }
}

const goBack = () => router.back()
const handleRetry = () => fetchGameDetails()

onMounted(() => {
  fetchGameDetails()
})
</script>

<template>
  <div
    class="min-h-screen transition-all duration-500"
    :class="
      props.isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    "
  >
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse transition-colors duration-500"
        :class="props.isDarkMode ? 'bg-cyan-500' : 'bg-blue-400'"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000 transition-colors duration-500"
        :class="props.isDarkMode ? 'bg-pink-500' : 'bg-purple-400'"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 py-8">
      <BackButton @click="goBack" :isDarkMode="isDarkMode" />

      <div v-if="loading" class="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="xl" :showText="true" loadingText="Cargando juego..." />
      </div>

      <div v-else-if="error" class="min-h-[60vh] flex items-center justify-center relative z-50">
        <div class="max-w-md w-full">
          <ErrorMessage
            :type="error.type"
            title="Error al cargar el juego"
            :message="error.message"
            :details="error.details"
            @retry="handleRetry"
            @dismiss="goBack"
          />
        </div>
      </div>

      <div v-else-if="game" class="space-y-8">
        <GameHeroSection
          :game="game"
          :isDarkMode="isDarkMode"
          :isGameInTop5="isGameInTop5"
          @add-to-top5="handleAddToTop5"
        />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-8">
            <GameDescription :game="game" :isDarkMode="isDarkMode" />
            <GameScreenshots
              v-if="screenshots.length > 0"
              :screenshots="screenshots"
              :isDarkMode="isDarkMode"
            />
          </div>

          <GameInfoSidebar :game="game" :isDarkMode="isDarkMode" />
        </div>
      </div>
    </div>

    <NotificationToast
      v-if="showMessage"
      :type="messageData.type"
      :title="messageData.title"
      :message="messageData.message"
      @close="showMessage = false"
    />
  </div>
</template>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
