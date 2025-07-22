"use client";

import { useTheme } from "~/composables/useTheme";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  // Solo ejecutar en el cliente
  const { initTheme } = useTheme();

  // Inicializar tema inmediatamente para evitar flash
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

  if (shouldUseDark) {
    document.documentElement.classList.add("dark-mode");
  }

  // Inicializar completamente el tema
  initTheme();
});
