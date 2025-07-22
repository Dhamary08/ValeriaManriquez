<template>
  <div id="app">
    <!-- Componente de estado de Clarity (solo en desarrollo) -->
    <ClarityStatus v-if="$config.public.clarityProjectId" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useTheme } from "~/composables/useTheme";
import { useHead } from "#app";
import ClarityStatus from "~/components/ClarityStatus.vue";
import { onMounted } from "vue";

// SEO
useHead({
  htmlAttrs: {
    lang: "es",
  },
});

// Inicializar tema
const { isDarkMode, initTheme } = useTheme();

// Inicializar tema en el cliente
onMounted(() => {
  initTheme();
});
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", sans-serif;
  line-height: 1.6;
  transition: all 0.3s ease;
}

#app {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.3s ease;
}
</style>
