<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useTop5 } from '@/composables/useTop5'

const { currentTop5, reorderTop5, removeFromTop5 } = useTop5()

const props = defineProps({
  isOpen: Boolean,
  isDarkMode: Boolean,
})

const emit = defineEmits(['close', 'save'])

// Estado local para el reordenamiento
const localTop5 = ref([])
const draggedIndex = ref(null)
const dragOverIndex = ref(null)
const hasChanges = ref(false)

// Variable para debug (solo en desarrollo)
const isDevelopment = import.meta.env.DEV

// Debug: Verificar estado del Top5
watch(
  () => currentTop5.value,
  (newValue) => {
    if (isDevelopment) {
      console.log('🎮 Top5 actualizado en modal:', newValue.length, newValue)
    }
  },
  { immediate: true, deep: true },
)

// Inicializar la lista local cuando se abre el modal
const loadTop5 = () => {
  if (currentTop5.value.length > 0) {
    localTop5.value = [...currentTop5.value]
    hasChanges.value = false
    if (isDevelopment) {
      console.log('✅ Modal inicializado con:', localTop5.value.length, 'juegos')
    }
  } else {
    if (isDevelopment) {
      console.warn('⚠️ Top5 está vacío al abrir modal')
    }
    // Intentar recargar desde localStorage
    const { loadFromStorage } = useTop5()
    loadFromStorage()
    setTimeout(() => {
      if (currentTop5.value.length > 0) {
        localTop5.value = [...currentTop5.value]
        if (isDevelopment) {
          console.log('✅ Top5 recargado:', localTop5.value.length, 'juegos')
        }
      }
    }, 100)
  }
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isDevelopment) {
      console.log('🔄 Modal isOpen:', isOpen, 'Top5 length:', currentTop5.value.length)
    }
    if (isOpen) {
      nextTick(() => {
        loadTop5()
      })
    }
  },
  { immediate: true },
)

// Detectar cambios
watch(
  localTop5,
  () => {
    hasChanges.value = JSON.stringify(localTop5.value) !== JSON.stringify(currentTop5.value)
  },
  { deep: true },
)

const handleDragStart = (event, index) => {
  draggedIndex.value = index
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/html', event.target)
}

const handleDragOver = (event, index) => {
  event.preventDefault()
  dragOverIndex.value = index
}

const handleDragLeave = () => {
  dragOverIndex.value = null
}

const handleDrop = (event, dropIndex) => {
  event.preventDefault()

  if (draggedIndex.value !== null && draggedIndex.value !== dropIndex) {
    const draggedItem = localTop5.value[draggedIndex.value]
    const newList = [...localTop5.value]

    // Remover el elemento arrastrado
    newList.splice(draggedIndex.value, 1)

    // Insertar en la nueva posición
    newList.splice(dropIndex, 0, draggedItem)

    localTop5.value = newList
  }

  draggedIndex.value = null
  dragOverIndex.value = null
}

const handleRemoveGame = (gameId) => {
  localTop5.value = localTop5.value.filter((game) => game.id !== gameId)
}

const handleSave = () => {
  if (hasChanges.value) {
    if (isDevelopment) {
      console.log('💾 Guardando cambios:', localTop5.value.length, 'juegos')
    }
    // Actualizar el orden en el composable
    reorderTop5(localTop5.value)
    emit('save')
  }
  emit('close')
}

const handleCancel = () => {
  if (hasChanges.value) {
    if (confirm('¿Descartar los cambios realizados?')) {
      emit('close')
    }
  } else {
    emit('close')
  }
}

const getRankingColor = (index) => {
  switch (index) {
    case 0:
      return props.isDarkMode ? 'from-yellow-400 to-orange-500' : 'from-yellow-500 to-orange-600'
    case 1:
      return props.isDarkMode ? 'from-gray-300 to-gray-500' : 'from-gray-400 to-gray-600'
    case 2:
      return props.isDarkMode ? 'from-orange-400 to-orange-600' : 'from-orange-500 to-orange-700'
    default:
      return props.isDarkMode ? 'from-purple-400 to-purple-600' : 'from-purple-500 to-purple-700'
  }
}

const getRankingIcon = (index) => {
  if (index === 0) return '👑'
  if (index === 1) return '🥈'
  if (index === 2) return '🥉'
  return '⭐'
}
</script>

<template>
  <!-- Modal Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    @click.self="handleCancel"
  >
    <!-- Backdrop -->
    <div
      class="absolute inset-0 backdrop-blur-xl transition-all duration-500"
      :class="props.isDarkMode ? 'bg-black/80' : 'bg-white/80'"
    ></div>

    <!-- Modal Content -->
    <div
      class="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border shadow-2xl transition-all duration-500 animate-modal-in"
      :class="
        props.isDarkMode ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'
      "
    >
      <!-- Header -->
      <div
        class="sticky top-0 z-10 backdrop-blur-xl border-b px-8 py-6 transition-all duration-500"
        :class="
          props.isDarkMode ? 'bg-gray-900/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
        "
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
              :class="
                props.isDarkMode
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                  : 'bg-gradient-to-br from-yellow-500 to-orange-600'
              "
            >
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </div>
            <div>
              <h2
                class="text-3xl font-bold transition-colors duration-500"
                :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
              >
                Reordenar Top 5
              </h2>
              <p
                class="text-sm transition-colors duration-500"
                :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
              >
                Arrastra y suelta para cambiar el orden de tus juegos favoritos
              </p>
            </div>
          </div>

          <!-- Botón cerrar -->
          <button
            @click="handleCancel"
            class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            :class="
              props.isDarkMode
                ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white'
                : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 hover:text-gray-900'
            "
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <!-- Content -->
      <div class="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
        <!-- Debug info (solo en desarrollo) -->
        <div
          v-if="isDevelopment"
          class="mb-4 p-4 rounded-lg border text-sm"
          :class="
            props.isDarkMode
              ? 'bg-gray-800/50 border-gray-700 text-gray-300'
              : 'bg-gray-100/50 border-gray-300 text-gray-700'
          "
        >
          <strong>Debug:</strong>
          Top5 global: {{ currentTop5.length }} | Top5 local: {{ localTop5.length }} | Cambios:
          {{ hasChanges }}
        </div>

        <!-- Instrucciones -->
        <div
          class="mb-8 p-6 rounded-2xl border transition-all duration-500"
          :class="
            props.isDarkMode
              ? 'bg-cyan-500/10 border-cyan-500/30'
              : 'bg-blue-500/10 border-blue-500/30'
          "
        >
          <div class="flex items-start space-x-4">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              :class="
                props.isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-500/20 text-blue-600'
              "
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3
                class="font-bold mb-2 transition-colors duration-500"
                :class="props.isDarkMode ? 'text-cyan-400' : 'text-blue-600'"
              >
                ¿Cómo reordenar?
              </h3>
              <ul
                class="text-sm space-y-1 transition-colors duration-500"
                :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'"
              >
                <li>• <strong>Arrastra</strong> cualquier juego para moverlo</li>
                <li>• <strong>Suelta</strong> en la posición deseada</li>
                <li>• <strong>Elimina</strong> juegos con el botón ❌</li>
                <li>• <strong>Guarda</strong> los cambios al finalizar</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Lista de juegos -->
        <div v-if="localTop5.length > 0" class="space-y-4">
          <div
            v-for="(game, index) in localTop5"
            :key="game.id"
            :draggable="true"
            @dragstart="handleDragStart($event, index)"
            @dragover="handleDragOver($event, index)"
            @dragleave="handleDragLeave"
            @drop="handleDrop($event, index)"
            class="group relative cursor-move transition-all duration-300"
            :class="{
              'scale-105 rotate-1': draggedIndex === index,
              'scale-102 -rotate-1': dragOverIndex === index && draggedIndex !== index,
              'hover:scale-102': draggedIndex !== index,
            }"
          >
            <!-- Indicador de drop zone -->
            <div
              v-if="dragOverIndex === index && draggedIndex !== index"
              class="absolute -inset-2 rounded-2xl border-2 border-dashed animate-pulse transition-colors duration-300"
              :class="props.isDarkMode ? 'border-cyan-400' : 'border-blue-500'"
            ></div>

            <!-- Card del juego -->
            <div
              class="relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 group-hover:shadow-2xl"
              :class="[
                props.isDarkMode
                  ? 'bg-black/60 border-gray-700/50 hover:border-cyan-400/50'
                  : 'bg-white/80 border-gray-200/50 hover:border-blue-400/50',
                draggedIndex === index ? 'shadow-2xl ring-2 ring-cyan-400' : '',
              ]"
            >
              <!-- Número de ranking -->
              <div class="absolute -top-4 -left-4 z-10">
                <div
                  :class="`w-12 h-12 bg-gradient-to-br ${getRankingColor(index)} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-4 border-white`"
                >
                  {{ index + 1 }}
                </div>
              </div>

              <!-- Icono especial para top 3 -->
              <div v-if="index < 3" class="absolute -top-2 -right-2 text-2xl">
                {{ getRankingIcon(index) }}
              </div>

              <!-- Handle de arrastre -->
              <div
                class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              </div>

              <div class="flex items-center space-x-6">
                <!-- Imagen del juego -->
                <div class="flex-shrink-0">
                  <img
                    :src="game.background_image || '/placeholder.svg?height=100&width=150'"
                    :alt="game.name"
                    class="w-24 h-16 object-cover rounded-xl shadow-lg"
                    loading="lazy"
                  />
                </div>

                <!-- Info del juego -->
                <div class="flex-1 min-w-0">
                  <h3
                    class="text-xl font-bold mb-2 truncate transition-colors duration-500"
                    :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
                  >
                    {{ game.name }}
                  </h3>

                  <div class="flex items-center space-x-4">
                    <!-- Rating -->
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        />
                      </svg>
                      <span
                        class="text-sm font-semibold transition-colors duration-500"
                        :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                      >
                        {{ game.rating?.toFixed(1) || 'N/A' }}
                      </span>
                    </div>

                    <!-- Fecha agregado -->
                    <span
                      class="text-xs transition-colors duration-500"
                      :class="props.isDarkMode ? 'text-gray-500' : 'text-gray-600'"
                    >
                      Agregado: {{ new Date(game.addedAt || Date.now()).toLocaleDateString() }}
                    </span>
                  </div>
                </div>

                <!-- Botón eliminar -->
                <button
                  @click="handleRemoveGame(game.id)"
                  class="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                  :class="
                    props.isDarkMode
                      ? 'bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300'
                      : 'bg-red-100/60 hover:bg-red-200/60 text-red-600 hover:text-red-700'
                  "
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          </div>
        </div>

        <!-- Estado vacío -->
        <div v-else class="text-center py-12">
          <div
            class="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-colors duration-500"
            :class="
              props.isDarkMode ? 'bg-gray-800/50 text-gray-600' : 'bg-gray-100/50 text-gray-400'
            "
          >
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3
            class="text-xl font-bold mb-2 transition-colors duration-500"
            :class="props.isDarkMode ? 'text-white' : 'text-gray-900'"
          >
            Top 5 vacío
          </h3>
          <p
            class="transition-colors duration-500"
            :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
          >
            Agrega juegos a tu Top 5 para poder reordenarlos
          </p>

          <!-- Botón para recargar -->
          <button
            @click="loadTop5"
            class="mt-4 px-4 py-2 rounded-lg border transition-all duration-300"
            :class="
              props.isDarkMode
                ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50'
                : 'bg-gray-100/50 border-gray-300 text-gray-700 hover:bg-gray-200/50'
            "
          >
            🔄 Recargar Top 5
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="sticky bottom-0 backdrop-blur-xl border-t px-8 py-6 transition-all duration-500"
        :class="
          props.isDarkMode ? 'bg-gray-900/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
        "
      >
        <div class="flex items-center justify-between">
          <!-- Indicador de cambios -->
          <div class="flex items-center space-x-3">
            <div
              v-if="hasChanges"
              class="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300"
              :class="
                props.isDarkMode
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-yellow-100/60 text-yellow-700 border border-yellow-300/50'
              "
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <span class="text-sm font-semibold">Cambios sin guardar</span>
            </div>
            <span
              v-else
              class="text-sm transition-colors duration-500"
              :class="props.isDarkMode ? 'text-gray-500' : 'text-gray-600'"
            >
              {{ localTop5.length }} juegos en tu Top 5
            </span>
          </div>

          <!-- Botones de acción -->
          <div class="flex items-center space-x-4">
            <button
              @click="handleCancel"
              class="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              :class="
                props.isDarkMode
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50'
                  : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700 hover:text-gray-900 border border-gray-300/50'
              "
            >
              Cancelar
            </button>

            <button
              @click="handleSave"
              :disabled="!hasChanges && localTop5.length === currentTop5.length"
              class="px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              :class="
                props.isDarkMode
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white shadow-lg shadow-blue-500/25'
              "
            >
              {{ hasChanges ? 'Guardar Cambios' : 'Cerrar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modal-in {
  animation: modal-in 0.3s ease-out forwards;
}

/* Estilos para drag and drop */
.cursor-move:hover {
  cursor: grab;
}

.cursor-move:active {
  cursor: grabbing;
}

/* Transiciones suaves para el reordenamiento */
.group {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
</style>
