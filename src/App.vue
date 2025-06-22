<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const isDarkMode = ref(true)

// Cargar preferencia del usuario desde localStorage
const loadThemePreference = () => {
  const savedTheme = localStorage.getItem('gamehub-theme')
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  } else {
    // Si no hay preferencia guardada, usar la preferencia del sistema
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

// Guardar preferencia en localStorage
const saveThemePreference = () => {
  localStorage.setItem('gamehub-theme', isDarkMode.value ? 'dark' : 'light')
}

// Aplicar tema al documento
const applyTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  } else {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
  }
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}

// Watchers y lifecycle
watch(isDarkMode, () => {
  applyTheme()
  saveThemePreference()
})

onMounted(() => {
  loadThemePreference()
  applyTheme()
})
</script>

<template>
  <div
    :class="{
      dark: isDarkMode,
      light: !isDarkMode,
    }"
    class="min-h-screen transition-colors duration-500 flex flex-col"
    :style="{
      backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
      color: isDarkMode ? '#e2e8f0' : '#1e293b',
    }"
  >
    <AppHeader :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />

    <!-- Main content con padding-top para compensar el header fijo -->
    <main class="flex-1 pt-20">
      <RouterView :isDarkMode="isDarkMode" />
    </main>

    <!-- Footer -->
    <AppFooter :isDarkMode="isDarkMode" />
  </div>
</template>

<style>
/* Variables CSS para temas */
:root {
  --transition-theme: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.light {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #e2e8f0;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-tertiary: #64748b;
  --border-primary: #e2e8f0;
  --border-secondary: #cbd5e1;
  --accent-primary: #0ea5e9;
  --accent-secondary: #8b5cf6;
}

.dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --border-primary: #334155;
  --border-secondary: #475569;
  --accent-primary: #06b6d4;
  --accent-secondary: #a855f7;
}

/* Asegurar que el scroll sea suave */
html {
  scroll-behavior: smooth;
}

/* Evitar que el contenido se mueva cuando aparece el scrollbar */
body {
  overflow-y: scroll;
  transition: var(--transition-theme);
}

/* Transiciones globales para el cambio de tema */
* {
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}
</style>
