<template>
  <div class="layout">
    <AppHeader />
    <main class="main-content">
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useGsapAnimations } from "~/composables/useGsapAnimations";

onMounted(() => {
  // Initialize GSAP animations for layout
  const { initializeLayoutAnimations } = useGsapAnimations();
  initializeLayoutAnimations();
});
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 80px; // Account for fixed header
}
</style>
