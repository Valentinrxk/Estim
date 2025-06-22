<template>
  <div v-if="isVisible" class="fixed top-4 right-4 z-[9999] animate-slide-in max-w-sm">
    <div
      :class="[
        typeClasses[type].bg,
        typeClasses[type].border,
        'backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-2xl border flex items-center space-x-3',
      ]"
    >
      <!-- Icono según el tipo -->
      <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="typeClasses[type].icon"
        />
      </svg>

      <div class="flex-1 min-w-0">
        <p v-if="title" class="font-bold text-sm">{{ title }}</p>
        <p class="text-sm" :class="{ 'mt-1': title }">{{ message }}</p>
      </div>

      <!-- Botón cerrar -->
      <button
        @click="$emit('close')"
        class="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value),
  },
  title: String,
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  show: Boolean,
})

defineEmits(['close'])

const isVisible = ref(false)

const typeClasses = {
  success: {
    bg: 'bg-green-500/90',
    border: 'border-green-400',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  error: {
    bg: 'bg-red-500/90',
    border: 'border-red-400',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
  },
  warning: {
    bg: 'bg-yellow-500/90',
    border: 'border-yellow-400',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
  },
  info: {
    bg: 'bg-blue-500/90',
    border: 'border-blue-400',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
}

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      isVisible.value = true
      if (props.duration > 0) {
        setTimeout(() => {
          isVisible.value = false
        }, props.duration)
      }
    } else {
      isVisible.value = false
    }
  },
  { immediate: true },
)
</script>

<style scoped>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.5s ease-out forwards;
}
</style>
