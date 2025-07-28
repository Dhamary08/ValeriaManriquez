import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  const isClient = typeof window !== "undefined";
  // Solo ejecutar en el cliente
  if (isClient) {
    // Inicializar tema inmediatamente para evitar flash
    const initializeThemeSync = () => {
      try {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

        const htmlElement = document.documentElement;

        if (shouldUseDark) {
          htmlElement.classList.add("dark-mode");
        } else {
          htmlElement.classList.remove("dark-mode");
        }
      } catch (error) {
        console.warn("Error initializing theme:", error);
      }
    };

    // Ejecutar inmediatamente
    initializeThemeSync();
  }
});
