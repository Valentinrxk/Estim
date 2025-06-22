<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'error',
    validator: (value) => ['error', 'warning', 'info', 'success'].includes(value),
  },
  title: {
    type: String,
    default: null,
  },
  message: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['retry', 'dismiss'])

// Configuración de colores y estilos por tipo
const typeConfig = {
  error: {
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    iconColor: 'text-red-400',
    titleColor: 'text-red-400',
    buttonColor: 'bg-red-500 hover:bg-red-600',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
    defaultTitle: 'Error',
  },
  warning: {
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
    titleColor: 'text-yellow-400',
    buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
    defaultTitle: 'Advertencia',
  },
  info: {
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-400',
    buttonColor: 'bg-blue-500 hover:bg-blue-600',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    defaultTitle: 'Información',
  },
  success: {
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-400',
    titleColor: 'text-green-400',
    buttonColor: 'bg-green-500 hover:bg-green-600',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    defaultTitle: 'Éxito',
  },
}

const config = typeConfig[props.type]
const displayTitle = props.title || config.defaultTitle

const handleRetry = () => {
  emit('retry')
}

const handleDismiss = () => {
  emit('dismiss')
}
</script>

<template>
  <div
    :class="[
      config.bgColor,
      config.borderColor,
      'backdrop-blur-md rounded-2xl border p-8 relative z-50',
    ]"
  >
    <div class="flex items-start space-x-4">
      <!-- Icono -->
      <div class="flex-shrink-0">
        <svg
          :class="[config.iconColor, 'w-8 h-8']"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="config.icon" />
        </svg>
      </div>

      <!-- Contenido -->
      <div class="flex-1 min-w-0">
        <h3 :class="[config.titleColor, 'text-xl font-bold mb-2']">
          {{ displayTitle }}
        </h3>

        <p class="text-gray-300 mb-4 leading-relaxed">
          {{ message }}
        </p>

        <div v-if="details" class="bg-black/40 rounded-lg p-4 mb-6">
          <p class="text-gray-400 text-sm font-mono break-words">
            {{ details }}
          </p>
        </div>

        <!-- Botones -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            @click="handleRetry"
            :class="[
              config.buttonColor,
              'px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2',
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Reintentar</span>
          </button>

          <button
            @click="handleDismiss"
            class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Cerrar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
