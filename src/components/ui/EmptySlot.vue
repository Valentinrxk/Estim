<template>
  <div class="relative group cursor-pointer" @click="$emit('click')">
    <!-- Número de posición -->
    <div class="absolute -top-6 -left-6 z-30">
      <div
        class="w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl border-4 group-hover:border-gray-500 transition-colors duration-300"
        :class="
          isDarkMode
            ? 'bg-gray-700 text-gray-400 border-gray-600'
            : 'bg-gray-200 text-gray-500 border-gray-300'
        "
      >
        {{ position }}
      </div>
    </div>

    <!-- Card del slot vacío -->
    <div
      class="rounded-3xl border-2 border-dashed h-80 flex flex-col items-center justify-center transition-all duration-300 p-6"
      :class="cardClasses"
    >
      <!-- Icono con animaciones -->
      <div class="relative mb-6">
        <svg
          class="w-16 h-16 group-hover:scale-110 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          :class="iconColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>

        <!-- Puntos decorativos animados -->
        <div
          class="absolute -top-2 -right-2 w-3 h-3 rounded-full animate-pulse"
          :class="isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'"
        />
        <div
          class="absolute -bottom-2 -left-2 w-2 h-2 rounded-full animate-pulse animation-delay-1000"
          :class="isDarkMode ? 'bg-purple-400' : 'bg-purple-500'"
        />
        <div
          class="absolute top-1/2 -right-4 w-1 h-1 rounded-full animate-pulse animation-delay-2000"
          :class="isDarkMode ? 'bg-yellow-400' : 'bg-yellow-500'"
        />
      </div>

      <!-- Contenido -->
      <div class="text-center">
        <h3 class="text-lg font-bold mb-2 transition-colors duration-300" :class="titleColor">
          Espacio Vacío
        </h3>
        <p
          class="text-sm mb-4 px-2 leading-relaxed transition-colors duration-300"
          :class="textColor"
        >
          Este espacio espera a tu próximo juego favorito. Añade un título que te haya marcado y haz
          que tu Top 5 sea realmente legendario.
        </p>

        <!-- Botón -->
        <div
          class="group/btn inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
          :class="buttonClasses"
        >
          <svg
            class="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span class="bg-gradient-to-r bg-clip-text text-transparent" :class="buttonTextGradient">
            Explorar Juegos Épicos
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  position: Number,
  isDarkMode: Boolean,
})

defineEmits(['click'])

const cardClasses = computed(() =>
  props.isDarkMode
    ? 'bg-gray-800/40 border-gray-600 hover:border-gray-500 text-gray-500 hover:text-gray-400 group-hover:bg-gray-800/60'
    : 'bg-gray-100/60 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-500 group-hover:bg-gray-50/80',
)

const iconColor = computed(() =>
  props.isDarkMode
    ? 'text-gray-500 group-hover:text-gray-400'
    : 'text-gray-400 group-hover:text-gray-500',
)

const titleColor = computed(() =>
  props.isDarkMode
    ? 'text-gray-300 group-hover:text-gray-200'
    : 'text-gray-700 group-hover:text-gray-800',
)

const textColor = computed(() =>
  props.isDarkMode
    ? 'text-gray-500 group-hover:text-gray-400'
    : 'text-gray-600 group-hover:text-gray-500',
)

const buttonClasses = computed(() =>
  props.isDarkMode
    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 hover:border-cyan-400/50'
    : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-blue-400/50',
)

const buttonTextGradient = computed(() =>
  props.isDarkMode ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600',
)
</script>

<style scoped>
.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
