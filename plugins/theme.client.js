"use client";

import { useTheme } from "~/composables/useTheme";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  const { initTheme } = useTheme();
  const isClient = typeof window !== "undefined";

  // Solo ejecutar en el cliente
  if (isClient) {
    // Inicializar tema inmediatamente para evitar flash
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    if (shouldUseDark) {
      document.documentElement.classList.add("dark-mode");
    }

    // Inicializar completamente el tema
    initTheme();
  }
});
