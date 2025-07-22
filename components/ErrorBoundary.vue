<template>
  <div
    v-if="hasError"
    class="error-boundary"
    :class="`severity-${errorSeverity}`"
  >
    <div class="error-content">
      <div class="error-header">
        <div class="error-icon">
          <Icon :name="getErrorIcon()" />
        </div>
        <div class="error-info">
          <h3 class="error-title">{{ getErrorTitle() }}</h3>
          <p class="error-message">{{ errorMessage }}</p>
        </div>
      </div>

      <div class="error-details">
        <details>
          <summary>Detalles técnicos</summary>
          <div class="error-stack">
            <p><strong>Contexto:</strong> {{ errorContext }}</p>
            <p><strong>Timestamp:</strong> {{ errorTimestamp }}</p>
            <p v-if="errorStack"><strong>Stack:</strong></p>
            <pre v-if="errorStack">{{ errorStack }}</pre>
          </div>
        </details>
      </div>

      <div class="error-actions">
        <BaseButton @click="retry" variant="primary" size="small">
          <Icon name="refresh-cw" />
          Reintentar
        </BaseButton>
        <BaseButton
          @click="reportError"
          variant="outline"
          size="small"
          v-if="canReport"
        >
          <Icon name="flag" />
          Reportar
        </BaseButton>
        <BaseButton
          @click="dismiss"
          variant="ghost"
          size="small"
          v-if="canDismiss"
        >
          <Icon name="x" />
          Descartar
        </BaseButton>
      </div>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured, computed } from "vue";
import { useErrorHandler } from "~/composables/useErrorHandler";

const props = defineProps({
  fallback: {
    type: String,
    default: "default",
  },
  showDetails: {
    type: Boolean,
    default: process.dev,
  },
  canRetry: {
    type: Boolean,
    default: true,
  },
  canReport: {
    type: Boolean,
    default: true,
  },
  canDismiss: {
    type: Boolean,
    default: false,
  },
  onError: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits(["error", "retry", "dismiss"]);

const { handleCriticalError, ERROR_SEVERITY } = useErrorHandler();

const hasError = ref(false);
const errorMessage = ref("");
const errorContext = ref("");
const errorTimestamp = ref("");
const errorStack = ref("");
const errorSeverity = ref(ERROR_SEVERITY.MEDIUM);
const retryCount = ref(0);

const getErrorIcon = () => {
  switch (errorSeverity.value) {
    case ERROR_SEVERITY.CRITICAL:
      return "alert-circle";
    case ERROR_SEVERITY.HIGH:
      return "alert-triangle";
    case ERROR_SEVERITY.MEDIUM:
      return "info";
    default:
      return "alert-circle";
  }
};

const getErrorTitle = () => {
  switch (errorSeverity.value) {
    case ERROR_SEVERITY.CRITICAL:
      return "Error Crítico";
    case ERROR_SEVERITY.HIGH:
      return "Error Importante";
    case ERROR_SEVERITY.MEDIUM:
      return "Algo salió mal";
    default:
      return "Error";
  }
};

const retry = () => {
  retryCount.value++;
  hasError.value = false;
  errorMessage.value = "";
  errorContext.value = "";
  errorStack.value = "";

  emit("retry", retryCount.value);

  // Si falla muchas veces, recargar la página
  if (retryCount.value >= 3) {
    window.location.reload();
  }
};

const reportError = () => {
  // Enviar reporte de error
  if (window.clarity) {
    window.clarity("event", "error_reported", {
      error_message: errorMessage.value,
      error_context: errorContext.value,
      retry_count: retryCount.value,
    });
  }

  // Aquí puedes integrar con tu sistema de reporte de errores
  console.log("Error reported:", {
    message: errorMessage.value,
    context: errorContext.value,
    timestamp: errorTimestamp.value,
  });
};

const dismiss = () => {
  hasError.value = false;
  emit("dismiss");
};

onErrorCaptured((error, instance, info) => {
  hasError.value = true;
  errorMessage.value = error.message || "Error desconocido";
  errorContext.value = info || "Componente desconocido";
  errorTimestamp.value = new Date().toLocaleString();
  errorStack.value = error.stack;

  // Determinar severidad basada en el tipo de error
  if (
    error.name === "ChunkLoadError" ||
    error.message.includes("Loading chunk")
  ) {
    errorSeverity.value = ERROR_SEVERITY.HIGH;
  } else if (error.message.includes("Network Error")) {
    errorSeverity.value = ERROR_SEVERITY.HIGH;
  } else {
    errorSeverity.value = ERROR_SEVERITY.MEDIUM;
  }

  // Log error
  const errorInfo = handleCriticalError(
    error,
    `ErrorBoundary: ${errorContext.value}`
  );

  // Call custom error handler if provided
  if (props.onError) {
    props.onError(error, errorInfo);
  }

  emit("error", error, errorInfo);

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
  border-radius: var(--radius-lg);
  border: 2px solid var(--border-color);
  background: var(--bg-secondary);

  &.severity-critical {
    border-color: #dc2626;
    background: rgba(220, 38, 38, 0.05);
  }

  &.severity-high {
    border-color: #ea580c;
    background: rgba(234, 88, 12, 0.05);
  }

  &.severity-medium {
    border-color: #ca8a04;
    background: rgba(202, 138, 4, 0.05);
  }

  .error-content {
    text-align: center;
    max-width: 500px;
    width: 100%;

    .error-header {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1.5rem;
      text-align: left;

      @media (max-width: 640px) {
        flex-direction: column;
        text-align: center;
        align-items: center;
      }

      .error-icon {
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .severity-critical & {
          background: rgba(220, 38, 38, 0.1);
          color: #dc2626;
        }

        .severity-high & {
          background: rgba(234, 88, 12, 0.1);
          color: #ea580c;
        }

        .severity-medium & {
          background: rgba(202, 138, 4, 0.1);
          color: #ca8a04;
        }

        :deep(svg) {
          width: 24px;
          height: 24px;
        }
      }

      .error-info {
        flex: 1;

        .error-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .error-message {
          color: var(--text-secondary);
          line-height: 1.5;
        }
      }
    }

    .error-details {
      margin-bottom: 1.5rem;
      text-align: left;

      details {
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        padding: 1rem;

        summary {
          cursor: pointer;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.5rem;

          &:hover {
            color: var(--accent-color);
          }
        }

        .error-stack {
          font-size: 0.875rem;
          color: var(--text-secondary);

          p {
            margin-bottom: 0.5rem;
          }

          pre {
            background: var(--bg-tertiary);
            padding: 0.75rem;
            border-radius: var(--radius-sm);
            overflow-x: auto;
            font-size: 0.75rem;
            line-height: 1.4;
            margin-top: 0.5rem;
          }
        }
      }
    }

    .error-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;

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
</style>
