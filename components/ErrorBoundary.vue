<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-content">
      <div class="error-icon">⚠️</div>
      <h2>Algo salió mal</h2>
      <p>{{ errorMessage }}</p>
      <button @click="retry" class="retry-button">Intentar de nuevo</button>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from "vue";

const hasError = ref(false);
const errorMessage = ref("");

const retry = () => {
  hasError.value = false;
  errorMessage.value = "";
  // Reload the page or reset component state
  window.location.reload();
};

onErrorCaptured((error) => {
  hasError.value = true;
  errorMessage.value = error.message || "Error desconocido";

  // Log error for monitoring
  console.error("Error capturado:", error);

  // Track error if analytics available
  if (window.clarity) {
    window.clarity("event", "component_error", {
      error: error.message,
      stack: error.stack,
    });
  }

  return false; // Prevent error from propagating
});
</script>

<style lang="scss" scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 2rem;

  .error-content {
    text-align: center;
    max-width: 400px;

    .error-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h2 {
      color: var(--error-color);
      margin-bottom: 1rem;
    }

    p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .retry-button {
      padding: 0.75rem 1.5rem;
      background: var(--accent-color);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;

      &:hover {
        background: var(--accent-secondary);
      }
    }
  }
}
</style>
