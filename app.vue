<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useTheme } from "~/composables/useTheme";
import { useHead } from "#app";

const { isDarkMode } = useTheme();

// SEO
useHead({
  htmlAttrs: {
    lang: "es",
  },
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
