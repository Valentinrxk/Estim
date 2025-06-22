<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  isDarkMode: Boolean,
})

const emit = defineEmits(['toggle-dark-mode', 'navigate-home'])

const toggleDarkMode = () => {
  emit('toggle-dark-mode')
}

const goHome = () => {
  router.push({ name: 'home' })
}

const isGames = computed(() => route.name === 'games')
const isTop5 = computed(() => route.name === 'top5')

// Clases dinámicas basadas en el tema
const headerClasses = computed(() => ({
  'bg-black/95 border-cyan-500/30': props.isDarkMode,
  'bg-white/95 border-blue-500/30 shadow-lg': !props.isDarkMode,
}))

const logoClasses = computed(() => ({
  'from-cyan-400 via-purple-500 to-pink-500 shadow-cyan-500/25': props.isDarkMode,
  'from-blue-500 via-purple-600 to-pink-600 shadow-blue-500/25': !props.isDarkMode,
}))

const textClasses = computed(() => ({
  'text-white': props.isDarkMode,
  'text-gray-900': !props.isDarkMode,
}))

const navLinkClasses = computed(() => ({
  'text-gray-300 hover:text-cyan-400': props.isDarkMode,
  'text-gray-600 hover:text-blue-600': !props.isDarkMode,
}))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl border-b px-4 py-3 shadow-2xl transition-all duration-500"
    :class="[headerClasses, props.isDarkMode ? 'shadow-black/50' : 'shadow-gray-200/50']"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo Gamer -->
      <button
        @click="goHome"
        class="group flex items-center space-x-3 hover:scale-105 transition-all duration-300"
      >
        <div
          class="relative w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:rotate-12"
          :class="logoClasses"
        >
          <!-- Gaming Controller Icon -->
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M7.97 16.06c.8 0 1.54-.37 2.03-.99l.84-1.06c.2-.25.51-.4.84-.4s.64.15.84.4l.84 1.06c.49.62 1.23.99 2.03.99 1.46 0 2.61-1.15 2.61-2.61V9.61C18 8.15 16.85 7 15.39 7H8.61C7.15 7 6 8.15 6 9.61v3.84c0 1.46 1.15 2.61 2.61 2.61h-.64zM9.5 10.5c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5zm0 2c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5zm4-2c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5zm0 2c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5z"
            />
          </svg>

          <!-- Efectos de brillo -->
          <div
            class="absolute -inset-1 bg-gradient-to-br rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"
            :class="logoClasses"
          ></div>
        </div>

        <div class="flex flex-col items-start">
          <span
            class="text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-300"
            :class="
              props.isDarkMode ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
            "
          >
            ESTIM
          </span>
          <span
            class="text-xs font-medium"
            :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'"
          >
            Descubre tu juego ideal
          </span>
        </div>
      </button>

      <!-- Menú navegación -->
      <nav class="hidden lg:flex items-center space-x-2">
        <router-link
          to="/"
          class="group flex items-center space-x-2 transition-all duration-300 font-medium px-4 py-2.5 rounded-xl relative overflow-hidden"
          :class="[
            navLinkClasses,
            route.name === 'home'
              ? props.isDarkMode
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 shadow-lg shadow-cyan-500/20'
                : 'text-blue-600 bg-blue-500/10 border border-blue-500/30 shadow-lg shadow-blue-500/20'
              : props.isDarkMode
                ? 'hover:bg-gray-800/50'
                : 'hover:bg-gray-100/50',
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span>Home</span>
          <div
            v-if="route.name === 'home'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r"
            :class="
              props.isDarkMode ? 'from-cyan-400 to-purple-400' : 'from-blue-500 to-purple-500'
            "
          ></div>
        </router-link>

        <router-link
          to="/games"
          class="group flex items-center space-x-2 transition-all duration-300 font-medium px-4 py-2.5 rounded-xl relative overflow-hidden"
          :class="[
            navLinkClasses,
            isGames
              ? props.isDarkMode
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 shadow-lg shadow-cyan-500/20'
                : 'text-blue-600 bg-blue-500/10 border border-blue-500/30 shadow-lg shadow-blue-500/20'
              : props.isDarkMode
                ? 'hover:bg-gray-800/50'
                : 'hover:bg-gray-100/50',
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Games</span>
          <div
            v-if="isGames"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r"
            :class="
              props.isDarkMode ? 'from-cyan-400 to-purple-400' : 'from-blue-500 to-purple-500'
            "
          ></div>
        </router-link>

        <router-link
          to="/top5"
          class="group flex items-center space-x-2 transition-all duration-300 font-medium px-4 py-2.5 rounded-xl relative overflow-hidden"
          :class="[
            props.isDarkMode
              ? 'text-gray-300 hover:text-yellow-400'
              : 'text-gray-600 hover:text-orange-600',
            isTop5
              ? props.isDarkMode
                ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 shadow-lg shadow-yellow-500/20'
                : 'text-orange-600 bg-orange-500/10 border border-orange-500/30 shadow-lg shadow-orange-500/20'
              : props.isDarkMode
                ? 'hover:bg-gray-800/50'
                : 'hover:bg-gray-100/50',
          ]"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
          <span>Top 5</span>
          <div
            v-if="isTop5"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r"
            :class="
              props.isDarkMode ? 'from-yellow-400 to-orange-400' : 'from-orange-500 to-red-500'
            "
          ></div>
        </router-link>
      </nav>

      <!-- Menú móvil -->
      <nav class="flex lg:hidden items-center space-x-1">
        <router-link
          to="/"
          class="p-2 rounded-lg transition-colors duration-300"
          :class="{
            [props.isDarkMode ? 'text-cyan-400 bg-cyan-500/20' : 'text-blue-600 bg-blue-500/20']:
              route.name === 'home',
            [props.isDarkMode
              ? 'text-gray-400 hover:text-cyan-400'
              : 'text-gray-500 hover:text-blue-600']: route.name !== 'home',
          }"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </router-link>

        <router-link
          to="/games"
          class="p-2 rounded-lg transition-colors duration-300"
          :class="{
            [props.isDarkMode ? 'text-cyan-400 bg-cyan-500/20' : 'text-blue-600 bg-blue-500/20']:
              isGames,
            [props.isDarkMode
              ? 'text-gray-400 hover:text-cyan-400'
              : 'text-gray-500 hover:text-blue-600']: !isGames,
          }"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </router-link>

        <router-link
          to="/top5"
          class="p-2 rounded-lg transition-colors duration-300"
          :class="{
            [props.isDarkMode
              ? 'text-yellow-400 bg-yellow-500/20'
              : 'text-orange-600 bg-orange-500/20']: isTop5,
            [props.isDarkMode
              ? 'text-gray-400 hover:text-yellow-400'
              : 'text-gray-500 hover:text-orange-600']: !isTop5,
          }"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </router-link>
      </nav>

      <!-- Controles -->
      <div class="flex items-center space-x-3">
        <!-- Toggle Dark Mode -->
        <button
          @click="toggleDarkMode"
          class="group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold transition-all duration-500 hover:scale-105 shadow-lg overflow-hidden"
          :class="
            props.isDarkMode
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/25 hover:shadow-purple-500/40'
              : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-gray-500/25 hover:shadow-gray-500/40'
          "
        >
          <!-- Efecto de brillo en hover -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
          ></div>

          <!-- Icono con animación -->
          <div class="relative z-10 transition-transform duration-500 group-hover:rotate-180">
            <svg
              v-if="props.isDarkMode"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </div>

          <span class="text-sm font-semibold hidden sm:inline relative z-10">
            {{ props.isDarkMode ? 'Light Mode' : 'Dark Mode' }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>
