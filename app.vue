<template>
  <div id="app">
    <!-- Error Boundary para toda la aplicación -->
    <ErrorBoundary>
      <!-- Componente de estado de Clarity (solo en desarrollo) -->
      <ClarityStatus v-if="showClarityStatus" />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ErrorBoundary>
  </div>
</template>

<script setup>
import { useTheme } from "~/composables/useTheme";
import { useHead } from "#app";
import { computed, onMounted } from "vue";
import { useRuntimeConfig } from "#app";

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

// Inicializar tema
const { isDarkMode, initTheme } = useTheme();
const config = useRuntimeConfig();

// Solo mostrar Clarity status en desarrollo
const showClarityStatus = computed(() => {
  return process.dev && config.public.clarityProjectId;
});

// Inicializar tema en el cliente
onMounted(() => {
  initTheme();

  // Soporte para prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty("--transition-fast", "0s");
    document.documentElement.style.setProperty("--transition-normal", "0s");
    document.documentElement.style.setProperty("--transition-slow", "0s");
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

  // Respetar preferencia de movimiento reducido
  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
}

body {
  font-family: "Inter", sans-serif;
  line-height: 1.6;
  transition: all var(--transition-normal);

  // Mejorar legibilidad
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

// Focus visible para accesibilidad
*:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

// Skip link para accesibilidad
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
