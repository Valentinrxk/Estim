<template>
  <div class="space-y-6">
    <!-- Información del juego -->
    <div
      class="backdrop-blur-md rounded-2xl p-6 border transition-all duration-500"
      :class="isDarkMode ? 'bg-black/40 border-gray-700/50' : 'bg-white/70 border-gray-200/50'"
    >
      <h3
        class="text-xl font-bold mb-6 flex items-center transition-colors duration-500"
        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
      >
        <svg
          class="w-5 h-5 mr-2 transition-colors duration-500"
          :class="isDarkMode ? 'text-cyan-400' : 'text-blue-600'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Información
      </h3>

      <div class="space-y-4">
        <div
          class="flex justify-between items-center py-2 border-b transition-colors duration-500"
          :class="isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'"
        >
          <span :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Rating</span>
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            <span
              class="font-semibold transition-colors duration-500"
              :class="isDarkMode ? 'text-white' : 'text-gray-900'"
            >
              {{ formatRating(game.rating) }}
            </span>
          </div>
        </div>

        <div
          v-if="game.released"
          class="flex justify-between items-center py-2 border-b transition-colors duration-500"
          :class="isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'"
        >
          <span :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Lanzamiento</span>
          <span :class="isDarkMode ? 'text-white' : 'text-gray-900'">{{ game.released }}</span>
        </div>

        <div
          v-if="game.developers?.length"
          class="flex justify-between items-center py-2 border-b transition-colors duration-500"
          :class="isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'"
        >
          <span :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Desarrollador</span>
          <span
            class="text-right transition-colors duration-500"
            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
          >
            {{ game.developers[0].name }}
          </span>
        </div>

        <div
          v-if="game.publishers?.length"
          class="flex justify-between items-center py-2"
          :class="isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'"
        >
          <span :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">Publisher</span>
          <span
            class="text-right transition-colors duration-500"
            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
          >
            {{ game.publishers[0].name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Géneros -->
    <div
      v-if="formattedGenres.length"
      class="backdrop-blur-md rounded-2xl p-6 border transition-all duration-500"
      :class="isDarkMode ? 'bg-black/40 border-gray-700/50' : 'bg-white/70 border-gray-200/50'"
    >
      <h3
        class="text-xl font-bold mb-4 flex items-center transition-colors duration-500"
        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
      >
        <svg
          class="w-5 h-5 mr-2 transition-colors duration-500"
          :class="isDarkMode ? 'text-purple-400' : 'text-purple-600'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
        Géneros
      </h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="genre in formattedGenres"
          :key="genre"
          class="px-3 py-1 rounded-full text-sm border transition-all duration-300"
          :class="
            isDarkMode
              ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30'
              : 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200'
          "
        >
          {{ genre }}
        </span>
      </div>
    </div>

    <!-- Plataformas -->
    <div
      v-if="formattedPlatforms.length"
      class="backdrop-blur-md rounded-2xl p-6 border transition-all duration-500"
      :class="isDarkMode ? 'bg-black/40 border-gray-700/50' : 'bg-white/70 border-gray-200/50'"
    >
      <h3
        class="text-xl font-bold mb-4 flex items-center transition-colors duration-500"
        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
      >
        <svg
          class="w-5 h-5 mr-2 transition-colors duration-500"
          :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Plataformas
      </h3>
      <div class="grid grid-cols-1 gap-2">
        <button
          v-for="platform in formattedPlatforms.slice(0, 8)"
          :key="platform"
          @click="goToGamesWithPlatform(platform)"
          class="px-3 py-2 rounded-lg text-sm border text-center transition-all duration-300 hover:scale-105 cursor-pointer"
          :class="
            isDarkMode
              ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30'
              : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
          "
        >
          {{ platform }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  game: Object,
  isDarkMode: Boolean,
})

const router = useRouter()

const formattedGenres = computed(() => {
  return props.game?.genres?.map((genre) => genre.name) || []
})

const formattedPlatforms = computed(() => {
  return props.game?.platforms?.map((platform) => platform.platform.name) || []
})

const formatRating = (rating) => (rating ? rating.toFixed(1) : 'N/A')

const goToGamesWithPlatform = (platformName) => {
  const platformMap = {
    PC: 4,
    'PlayStation 5': 187,
    'PlayStation 4': 18,
    'Xbox One': 1,
    'Xbox Series S/X': 186,
    'Nintendo Switch': 7,
    iOS: 3,
    Android: 21,
    'PlayStation 3': 16,
    'Xbox 360': 14,
    'Nintendo 3DS': 8,
    'PS Vita': 19,
    'Wii U': 10,
    Wii: 11,
    'Nintendo DS': 9,
    'GameBoy Advance': 12,
    PSP: 13,
    macOS: 5,
    Linux: 6,
    Web: 171,
  }

  const platformId = platformMap[platformName]
  if (platformId) {
    router.push({
      path: '/games',
      query: {
        platforms: platformId.toString(),
        search: `plataforma: ${platformName}`,
      },
    })
  } else {
    router.push({
      path: '/games',
      query: {
        search: platformName,
      },
    })
  }
}
</script>
