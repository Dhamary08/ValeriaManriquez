<template>
  <button
    class="theme-toggle"
    @click="handleToggleTheme"
    :aria-label="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
  >
    <div class="toggle-track">
      <div class="toggle-thumb" :class="{ dark: isDarkMode }">
        <Icon :name="isDarkMode ? 'moon' : 'sun'" />
      </div>
    </div>
  </button>
</template>

<script setup>
import { useTheme } from "@/composables/useTheme";
import { useClarity } from "~/composables/useClarity";

const { isDarkMode, toggleTheme } = useTheme();
const { trackEvent, setCustomTag } = useClarity();

const handleToggleTheme = () => {
  const newTheme = !isDarkMode.value ? "dark" : "light";

  // Track theme change
  trackEvent("theme_toggle", {
    from_theme: isDarkMode.value ? "dark" : "light",
    to_theme: newTheme,
  });

  // Set custom tag for current theme
  setCustomTag("theme", newTheme);

  toggleTheme();
};
</script>

<style lang="scss" scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  .toggle-track {
    width: 50px;
    height: 26px;
    background: var(--bg-secondary);
    border-radius: 13px;
    position: relative;
    transition: all 0.3s ease;
    border: 2px solid var(--border-color);

    .toggle-thumb {
      width: 20px;
      height: 20px;
      background: var(--accent-color);
      border-radius: 50%;
      position: absolute;
      top: 1px;
      left: 1px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &.dark {
        transform: translateX(24px);
      }

      svg {
        width: 12px;
        height: 12px;
        color: white;
      }
    }
  }
}
</style>
