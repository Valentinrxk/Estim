<script setup>
const props = defineProps({
  isDarkMode: Boolean,
})

const currentYear = new Date().getFullYear()

const socialLinks = [
  {
    name: 'Discord',
    icon: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z',
    url: '#',
  },
  {
    name: 'Twitter',
    icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
    url: '#',
  },
  {
    name: 'GitHub',
    icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    url: '#',
  },
]

const quickLinks = [
  { name: 'Explorar Juegos', path: '/games' },
  { name: 'Mi Top 5', path: '/top5' },
  { name: 'Inicio', path: '/' },
]
</script>

<template>
  <footer
    class="relative backdrop-blur-xl border-t mt-auto transition-all duration-500"
    :class="
      props.isDarkMode
        ? 'bg-black/95 border-cyan-500/30'
        : 'bg-white/95 border-blue-500/30 shadow-lg'
    "
  >
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-20 -left-20 w-40 h-40 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"
        :class="props.isDarkMode ? 'bg-cyan-500' : 'bg-blue-500'"
      ></div>
      <div
        class="absolute -top-20 -right-20 w-40 h-40 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"
        :class="props.isDarkMode ? 'bg-purple-500' : 'bg-purple-600'"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-3 mb-6">
            <div
              class="w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg transition-all duration-300"
              :class="
                props.isDarkMode
                  ? 'from-cyan-400 via-purple-500 to-pink-500 shadow-cyan-500/25'
                  : 'from-blue-500 via-purple-600 to-pink-600 shadow-blue-500/25'
              "
            >
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M7.97 16.06c.8 0 1.54-.37 2.03-.99l.84-1.06c.2-.25.51-.4.84-.4s.64.15.84.4l.84 1.06c.49.62 1.23.99 2.03.99 1.46 0 2.61-1.15 2.61-2.61V9.61C18 8.15 16.85 7 15.39 7H8.61C7.15 7 6 8.15 6 9.61v3.84c0 1.46 1.15 2.61 2.61 2.61h-.64zM9.5 10.5c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5zm0 2c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5zm4-2c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5zm0 2c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5z"
                />
              </svg>
            </div>
            <div>
              <h3
                class="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300"
                :class="
                  props.isDarkMode ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
                "
              >
                ESTIM
              </h3>
              <p
                class="text-sm transition-colors duration-300"
                :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'"
              >
                Descubre tu juego ideal.
              </p>
            </div>
          </div>

          <p
            class="leading-relaxed mb-6 max-w-md transition-colors duration-300"
            :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-600'"
          >
            Descubre, explora y organiza tu universo gaming. Encuentra tu próxima aventura épica y
            crea tu hall of fame personal.
          </p>

          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              class="group w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border"
              :class="
                props.isDarkMode
                  ? 'bg-gray-800/50 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border-gray-700/50 hover:border-cyan-500/30'
                  : 'bg-gray-100/50 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 border-gray-300/50 hover:border-blue-500/30'
              "
            >
              <svg
                class="w-5 h-5 transition-colors duration-300"
                :class="
                  props.isDarkMode
                    ? 'text-gray-400 group-hover:text-cyan-400'
                    : 'text-gray-500 group-hover:text-blue-600'
                "
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path :d="social.icon" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4
            class="font-bold text-lg mb-6 flex items-center transition-colors duration-300"
            :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
          >
            <svg
              class="w-5 h-5 mr-2 transition-colors duration-300"
              :class="props.isDarkMode ? 'text-cyan-400' : 'text-blue-600'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            Enlaces Rápidos
          </h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <router-link
                :to="link.path"
                class="group flex items-center transition-colors duration-300"
                :class="
                  props.isDarkMode
                    ? 'text-gray-400 hover:text-cyan-400'
                    : 'text-gray-600 hover:text-blue-600'
                "
              >
                <svg
                  class="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span class="group-hover:translate-x-1 transition-transform duration-300">{{
                  link.name
                }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4
            class="font-bold text-lg mb-6 flex items-center transition-colors duration-300"
            :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
          >
            <svg
              class="w-5 h-5 mr-2 transition-colors duration-300"
              :class="props.isDarkMode ? 'text-purple-400' : 'text-purple-600'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Gaming Stats
          </h4>
          <div class="space-y-4">
            <div
              class="rounded-xl p-4 border transition-colors duration-300"
              :class="
                props.isDarkMode
                  ? 'bg-gray-800/30 border-gray-700/30'
                  : 'bg-gray-50/50 border-gray-200/50'
              "
            >
              <div
                class="text-2xl font-bold mb-1 transition-colors duration-300"
                :class="props.isDarkMode ? 'text-cyan-400' : 'text-blue-600'"
              >
                500K+
              </div>
              <div
                class="text-sm transition-colors duration-300"
                :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'"
              >
                Juegos Disponibles
              </div>
            </div>
            <div
              class="rounded-xl p-4 border transition-colors duration-300"
              :class="
                props.isDarkMode
                  ? 'bg-gray-800/30 border-gray-700/30'
                  : 'bg-gray-50/50 border-gray-200/50'
              "
            >
              <div
                class="text-2xl font-bold mb-1 transition-colors duration-300"
                :class="props.isDarkMode ? 'text-purple-400' : 'text-purple-600'"
              >
                10K+
              </div>
              <div
                class="text-sm transition-colors duration-300"
                :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'"
              >
                Gamers Activos
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="h-px bg-gradient-to-r from-transparent to-transparent mb-8 transition-colors duration-300"
        :class="props.isDarkMode ? 'via-cyan-500/50' : 'via-blue-500/50'"
      ></div>

      <!-- Copyright y enlaces  -->
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div class="flex items-center space-x-2">
          <svg
            class="w-4 h-4 transition-colors duration-300"
            :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <p
            class="transition-colors duration-500 text-center"
            :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
          >
            © 91218 <span class="font-semibold">ESTIM</span>. Hecho con
            <span class="text-red-500 animate-pulse">💜</span>
            para
            <span
              class="font-semibold transition-colors duration-300"
              :class="props.isDarkMode ? 'text-cyan-500' : 'text-blue-600'"
              >angelito/luca</span
            >
            por
            <span>🪡</span>
          </p>
        </div>

        <div class="flex items-center space-x-6 text-sm">
          <a
            href="https://cap.org.ar/wp-content/uploads/2025/06/AFP__20250601__48UQ8MZ__v2__HighRes__FblArgHuracanPlatense-scaled.jpg"
            target="_blank"
            class="transition-colors duration-300"
            :class="
              props.isDarkMode
                ? 'text-gray-400 hover:text-cyan-400'
                : 'text-gray-600 hover:text-blue-600'
            "
          >
            Política de Privacidad
          </a>
          <a
            href="https://media.tenor.com/29Ok5pc0ivAAAAAM/gatinho-gato.gif"
            target="_blank"
            class="transition-colors duration-300"
            :class="
              props.isDarkMode
                ? 'text-gray-400 hover:text-cyan-400'
                : 'text-gray-600 hover:text-blue-600'
            "
          >
            Términos de Uso
          </a>
          <a
            href="https://wa.link/44n9t9"
            target="_blank"
            class="transition-colors duration-300"
            :class="
              props.isDarkMode
                ? 'text-gray-400 hover:text-cyan-400'
                : 'text-gray-600 hover:text-blue-600'
            "
          >
            Contacto
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
