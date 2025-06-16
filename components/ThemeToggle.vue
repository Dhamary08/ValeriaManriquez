<template>
  <button
    class="theme-toggle"
    :aria-label="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
    @click="toggleTheme"
  >
    <div class="toggle-track">
      <div class="toggle-thumb" :class="{ dark: isDarkMode }">
        <IconImg :name="isDarkMode ? 'moon' : 'sun'" />
      </div>
    </div>
  </button>
</template>

<script setup>
import { useTheme } from "@/composables/useTheme";

const { isDarkMode, toggleTheme } = useTheme();
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

      :deep(svg) {
        width: 12px;
        height: 12px;
        color: white;
      }
    }
  }
}
</style>
