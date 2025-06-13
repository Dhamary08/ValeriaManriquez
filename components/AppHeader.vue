<template>
  <header class="app-header" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <NuxtLink to="/" class="logo-link">
            <span class="logo-text">VM</span>
          </NuxtLink>
        </div>

        <nav class="navigation" :class="{ 'mobile-open': isMobileMenuOpen }">
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#hero" class="nav-link" @click="closeMenu">Inicio</a>
            </li>
            <li class="nav-item">
              <a href="#about" class="nav-link" @click="closeMenu">Quién Soy</a>
            </li>
            <li class="nav-item">
              <a href="#work" class="nav-link" @click="closeMenu">Trabajo</a>
            </li>
            <li class="nav-item">
              <a href="#contact" class="nav-link" @click="closeMenu"
                >Contacto</a
              >
            </li>
          </ul>
        </nav>

        <div class="header-actions">
          <ThemeToggle />
          <button
            class="mobile-menu-toggle"
            :class="{ active: isMobileMenuOpen }"
            @click="toggleMobileMenu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
@use "~/assets/scss/components/header.scss" as *;
</style>
