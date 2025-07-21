"use client";

import { useRouter } from "vue-router";
import { useClarity } from "@/composables/useClarity";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  const { initClarity } = useClarity();

  // Inicializar Clarity cuando el plugin se carga
  initClarity();

  // Opcional: Agregar tracking de navegación
  const router = useRouter();

  router.afterEach((to) => {
    // Esperar un poco para que la página se cargue completamente
    setTimeout(() => {
      if (window.clarity) {
        window.clarity("set", "page", to.path);
      }
    }, 100);
  });
});
