<template>
  <div id="app">
    <ErrorBoundary>
      <ClarityStatus v-if="showClarityStatus" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ErrorBoundary>
  </div>
</template>

<script setup>
import {
  useTheme,
  useRuntimeConfig,
  useHead,
  computed,
  onMounted,
} from "#imports";
import ClarityStatus from "~/components/ClarityStatus.vue";
import { useNuxtApp } from "#app";

// Auto-imports ya no necesitan importación explícita
const nuxtApp = useNuxtApp();
const { isDarkMode, initTheme } = useTheme();
const config = useRuntimeConfig();

// SEO mejorado
useHead({
  htmlAttrs: {
    lang: "es",
  },
  meta: [
    { name: "theme-color", content: "#3b82f6" },
    { name: "color-scheme", content: "light dark" },
  ],
});

// Solo mostrar Clarity status en desarrollo
const showClarityStatus = computed(() => {
  return nuxtApp.isDev && config.public.clarityProjectId;
});

// Inicializar tema en el cliente
onMounted(() => {
  initTheme();

  // Soporte para prefers-reduced-motion
  if (typeof window !== "undefined") {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty("--transition-fast", "0s");
      document.documentElement.style.setProperty("--transition-normal", "0s");
      document.documentElement.style.setProperty("--transition-slow", "0s");
    }
  }
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
}

body {
  font-family: "Inter", sans-serif;
  line-height: 1.6;
  transition: all var(--transition-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

#app {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-normal);
}

*:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--accent-color);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 9999;

  &:focus {
    top: 6px;
  }
}
</style>
