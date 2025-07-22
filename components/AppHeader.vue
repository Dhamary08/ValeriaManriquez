<template>
  <header class="app-header" :class="{ scrolled: isScrolled }">
    <!-- Skip link para accesibilidad -->
    <a href="#main-content" class="skip-link">Saltar al contenido principal</a>

    <div class="container">
      <div class="header-content">
        <div class="logo">
          <NuxtLink to="/" class="logo-link" aria-label="Ir al inicio">
            <span class="logo-text">VM</span>
          </NuxtLink>
        </div>

        <nav
          class="navigation"
          :class="{ 'mobile-open': isMobileMenuOpen }"
          aria-label="Navegación principal"
        >
          <ul class="nav-list" role="list">
            <li class="nav-item">
              <a
                href="#hero"
                class="nav-link"
                @click="closeMenu"
                aria-label="Ir a la sección de inicio"
                >Inicio</a
              >
            </li>
            <li class="nav-item">
              <a
                href="#about"
                class="nav-link"
                @click="closeMenu"
                aria-label="Ir a la sección quién soy"
                >Quién Soy</a
              >
            </li>
            <li class="nav-item">
              <a
                href="#experience"
                class="nav-link"
                @click="closeMenu"
                aria-label="Ir a la sección de experiencia"
                >Experiencia</a
              >
            </li>
            <li class="nav-item">
              <a
                href="#education"
                class="nav-link"
                @click="closeMenu"
                aria-label="Ir a la sección de educación"
                >Educación</a
              >
            </li>
            <li class="nav-item">
              <a
                href="#work"
                class="nav-link"
                @click="closeMenu"
                aria-label="Ir a la sección de trabajo"
                >Trabajo</a
              >
            </li>
            <li class="nav-item">
              <a
                href="#contact"
                class="nav-link"
                @click="closeMenu"
                aria-label="Ir a la sección de contacto"
                >Contacto</a
              >
            </li>
          </ul>
        </nav>

        <div class="header-actions">
          <ThemeToggle />
          <button
            class="mobile-menu-toggle"
            @click="toggleMobileMenu"
            :class="{ active: isMobileMenuOpen }"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Abrir menú de navegación"
            aria-controls="mobile-navigation"
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
import { useErrorHandler } from "~/composables/useErrorHandler";

const { handleError } = useErrorHandler();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  try {
    isScrolled.value = window.scrollY > 50;
  } catch (error) {
    handleError(error, "AppHeader scroll handler");
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;

  // Prevenir scroll del body cuando el menú está abierto
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
};

// Cerrar menú con Escape
const handleKeydown = (event) => {
  if (event.key === "Escape" && isMobileMenuOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = ""; // Cleanup
});
</script>

<style lang="scss" scoped>
// Mejoras de accesibilidad
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--accent-color);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 10000;
  font-weight: 500;

  &:focus {
    top: 6px;
  }
}

.nav-link {
  position: relative;

  // Mejorar área de click en móvil
  @media (max-width: 768px) {
    padding: 0.75rem 0;
    display: block;
  }

  // Focus visible
  &:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
    border-radius: 4px;
  }
}

.mobile-menu-toggle {
  // Mejorar área de click
  padding: 0.75rem;

  &:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
    border-radius: 4px;
  }
}
</style>
