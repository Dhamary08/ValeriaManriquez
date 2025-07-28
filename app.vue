<template>
  <div id="app">
    <!-- Skip link para accesibilidad -->
    <a href="#main-content" class="skip-link"> Skip to main content </a>

    <ErrorBoundary>
      <!-- Solo mostrar después de la hidratación -->
      <ClientOnly>
        <ClarityStatus />
      </ClientOnly>

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ErrorBoundary>

    <!-- Global Error Handler -->
    <GlobalErrorHandler />
  </div>
</template>

<script setup>
import { computed, onMounted, onErrorCaptured, onUnmounted } from "vue";
import { useTheme } from "~/composables/useTheme";
import { useRuntimeConfig } from "#app";
import { useHead } from "#app";
import { useErrorHandler } from "~/composables/useErrorHandler";

const { isDarkMode, initTheme } = useTheme();
const config = useRuntimeConfig();
const { handleCriticalError } = useErrorHandler();

const showClarityStatus = computed(() => {
  return process.dev && config.public.clarityProjectId;
});

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

// Global error handler - MEJORADO
onErrorCaptured((error, instance, info) => {
  try {
    handleCriticalError(error, `Global: ${info}`);
  } catch (handlerError) {
    console.error("Error in error handler:", handlerError);
  }
  return false;
});

// Unhandled promise rejections - MEJORADO
const handleUnhandledRejection = (event) => {
  try {
    const error =
      event.reason instanceof Error ? event.reason : new Error(event.reason);
    handleCriticalError(error, "Unhandled Promise Rejection");
  } catch (handlerError) {
    console.error("Error handling unhandled rejection:", handlerError);
  }
};

// Global JavaScript errors - MEJORADO
const handleGlobalJavaScriptError = (event) => {
  try {
    const error = event.error || new Error(event.message);
    handleCriticalError(error, "Global JavaScript Error");
  } catch (handlerError) {
    console.error("Error handling global JS error:", handlerError);
  }
};

const initListeners = () => {
  if (process.client) {
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleGlobalJavaScriptError);
  }
};

const removeListeners = () => {
  if (process.client) {
    window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    window.removeEventListener("error", handleGlobalJavaScriptError);
  }
};

onMounted(() => {
  try {
    initTheme();
    initListeners();

    if (process.client) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );
      if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty("--transition-fast", "0s");
        document.documentElement.style.setProperty("--transition-normal", "0s");
        document.documentElement.style.setProperty("--transition-slow", "0s");
      }
    }
  } catch (error) {
    console.error("Error in app initialization:", error);
  }
});

onUnmounted(() => {
  removeListeners();
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
