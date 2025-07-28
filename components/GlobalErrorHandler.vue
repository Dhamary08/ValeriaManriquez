<template>
  <Teleport to="body">
    <div
      v-if="globalError"
      class="global-error-overlay"
      @click="handleOverlayClick"
    >
      <div class="global-error-modal" @click.stop>
        <div class="error-header">
          <h2>Error Crítico del Sistema</h2>
          <button
            @click="clearGlobalError"
            class="close-btn"
            aria-label="Cerrar"
          >
            <IconImg name="x" />
          </button>
        </div>

        <div class="error-body">
          <div class="error-icon">
            <IconImg name="alert-circle" />
          </div>
          <div class="error-content">
            <p class="error-message">{{ globalError.message }}</p>
            <p class="error-context">Contexto: {{ globalError.context }}</p>
          </div>
        </div>

        <div class="error-actions">
          <BaseButton @click="reloadPage" variant="primary">
            <IconImg name="refresh-cw" />
            Recargar Página
          </BaseButton>
          <BaseButton @click="reportAndDismiss" variant="outline">
            <IconImg name="flag" />
            Reportar y Continuar
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Toast notifications para errores no críticos -->
    <div class="error-toasts">
      <TransitionGroup name="toast" tag="div">
        <div
          v-for="error in visibleErrors"
          :key="error.id"
          class="error-toast"
          :class="`severity-${error.severity}`"
        >
          <div class="toast-content">
            <Icon :name="getToastIcon(error.severity)" />
            <div class="toast-text">
              <p class="toast-message">{{ error.message }}</p>
              <p class="toast-context">{{ error.context }}</p>
            </div>
          </div>
          <button @click="removeError(error.id)" class="toast-close">
            <IconImg name="x" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from "vue";
import { useErrorHandler } from "~/composables/useErrorHandler";

const { errors, globalError, removeError, clearGlobalError, ERROR_SEVERITY } =
  useErrorHandler();

// Solo mostrar los últimos 3 errores como toasts
const visibleErrors = computed(() => {
  return errors.value
    .filter((error) => error.severity !== ERROR_SEVERITY.LOW)
    .slice(-3);
});

const getToastIcon = (severity) => {
  switch (severity) {
    case ERROR_SEVERITY.HIGH:
      return "alert-triangle";
    case ERROR_SEVERITY.MEDIUM:
      return "info";
    default:
      return "alert-circle";
  }
};

const handleOverlayClick = () => {
  // Solo cerrar si no es un error crítico
  if (
    globalError.value &&
    globalError.value.severity !== ERROR_SEVERITY.CRITICAL
  ) {
    clearGlobalError();
  }
};

const reloadPage = () => {
  window.location.reload();
};

const reportAndDismiss = () => {
  // Reportar error
  if (window.clarity) {
    window.clarity("event", "critical_error_dismissed", {
      error_message: globalError.value.message,
      error_context: globalError.value.context,
    });
  }

  clearGlobalError();
};
</script>

<style lang="scss" scoped>
.global-error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;

  .global-error-modal {
    background: var(--bg-primary);
    border-radius: var(--radius-xl);
    max-width: 500px;
    width: 100%;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);

    .error-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);

      h2 {
        color: #dc2626;
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
      }

      .close-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: var(--radius-md);
        color: var(--text-secondary);

        &:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        :deep(svg) {
          width: 20px;
          height: 20px;
        }
      }
    }

    .error-body {
      padding: 1.5rem;
      display: flex;
      gap: 1rem;

      .error-icon {
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        background: rgba(220, 38, 38, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #dc2626;

        :deep(svg) {
          width: 24px;
          height: 24px;
        }
      }

      .error-content {
        flex: 1;

        .error-message {
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .error-context {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
      }
    }

    .error-actions {
      padding: 1.5rem;
      border-top: 1px solid var(--border-color);
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;

      .base-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        :deep(svg) {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}

.error-toasts {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 400px;

  .error-toast {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1rem;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;

    &.severity-high {
      border-left: 4px solid #ea580c;
    }

    &.severity-medium {
      border-left: 4px solid #ca8a04;
    }

    .toast-content {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      flex: 1;

      :deep(svg) {
        width: 20px;
        height: 20px;
        margin-top: 0.125rem;
        flex-shrink: 0;
      }

      .severity-high & :deep(svg) {
        color: #ea580c;
      }

      .severity-medium & :deep(svg) {
        color: #ca8a04;
      }

      .toast-text {
        flex: 1;

        .toast-message {
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          font-size: 0.875rem;
        }

        .toast-context {
          color: var(--text-secondary);
          font-size: 0.75rem;
        }
      }
    }

    .toast-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      flex-shrink: 0;

      &:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
      }

      :deep(svg) {
        width: 16px;
        height: 16px;
      }
    }
  }
}

// Transiciones para toasts
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
