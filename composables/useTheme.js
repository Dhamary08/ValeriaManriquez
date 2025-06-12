import { ref, readonly, onMounted } from "vue";

export const useTheme = () => {
  const isDarkMode = ref(false);

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    updateTheme();
  };

  const updateTheme = () => {
    if (import.meta.client) {
      document.documentElement.classList.toggle("dark-mode", isDarkMode.value);
      localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
    }
  };

  const initTheme = () => {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      isDarkMode.value = savedTheme ? savedTheme === "dark" : prefersDark;
      updateTheme();
    }
  };

  onMounted(() => {
    initTheme();
  });

  return {
    isDarkMode: readonly(isDarkMode),
    toggleTheme,
  };
};
