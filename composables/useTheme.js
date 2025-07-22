import { ref, readonly, onMounted } from "vue";

const isDarkMode = ref(false);

export const useTheme = () => {
  const isClient = typeof window !== "undefined";

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    updateTheme();
  };

  const updateTheme = () => {
    if (isClient) {
      const htmlElement = document.documentElement;

      if (isDarkMode.value) {
        htmlElement.classList.add("dark-mode");
      } else {
        htmlElement.classList.remove("dark-mode");
      }

      // Guardar preferencia en localStorage
      localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
    }
  };

  const initTheme = () => {
    if (isClient) {
      // Verificar preferencia guardada
      const savedTheme = localStorage.getItem("theme");

      // Verificar preferencia del sistema
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      // Establecer tema inicial
      if (savedTheme) {
        isDarkMode.value = savedTheme === "dark";
      } else {
        isDarkMode.value = prefersDark;
      }

      updateTheme();

      // Escuchar cambios en la preferencia del sistema
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        if (!localStorage.getItem("theme")) {
          isDarkMode.value = e.matches;
          updateTheme();
        }
      };

      mediaQuery.addEventListener("change", handleChange);

      // Cleanup function
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  };

  onMounted(() => {
    initTheme();
  });

  return {
    isDarkMode: readonly(isDarkMode),
    toggleTheme,
    initTheme,
  };
};
