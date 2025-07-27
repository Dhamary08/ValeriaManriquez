"use client";

import { defineNuxtPlugin } from "#app";
import { useClarity } from "~/composables/useClarity";
import { useRouter } from "vue-router";

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const { initClarity } = useClarity();

  if (!process.client) return;

  // Inicializar Clarity cuando el plugin se carga
  try {
    initClarity();
  } catch (error) {
    console.warn("Error initializing Clarity:", error);
  }

  // Opcional: Agregar tracking de navegación
  router.afterEach((to) => {
    // Esperar un poco para que la página se cargue completamente
    setTimeout(() => {
      try {
        if (window.clarity && typeof window.clarity === "function") {
          window.clarity("set", "page", to.path);
        }
      } catch (error) {
        console.warn("Error tracking page navigation:", error);
      }
    }, 100);
  });
});
