import { ref } from "vue";

export const useErrorHandler = () => {
  const errors = ref([]);
  const isLoading = ref(false);
  const globalError = ref(null);

  // Tipos de errores
  const ERROR_TYPES = {
    NETWORK: "network",
    VALIDATION: "validation",
    ANIMATION: "animation",
    COMPONENT: "component",
    FORM: "form",
    CRITICAL: "critical",
  };

  // Severidad de errores
  const ERROR_SEVERITY = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
    CRITICAL: "critical",
  };

  const handleError = (
    error,
    context = "",
    type = ERROR_TYPES.COMPONENT,
    severity = ERROR_SEVERITY.MEDIUM
  ) => {
    console.error(`Error in ${context}:`, error);

    const errorInfo = {
      id: Date.now(),
      message: error.message || "Error desconocido",
      context,
      type,
      severity,
      timestamp: new Date().toISOString(),
      stack: error.stack,
      userAgent: typeof window !== "undefined" ? navigator.userAgent : "server",
      url: typeof window !== "undefined" ? window.location.href : "server",
    };

    // Solo agregar a la lista si no es crítico (los críticos van a globalError)
    if (severity !== ERROR_SEVERITY.CRITICAL) {
      errors.value.push(errorInfo);
    } else {
      globalError.value = errorInfo;
    }

    // Track error for analytics
    if (typeof window !== "undefined" && window.clarity) {
      window.clarity("event", "error_handled", {
        error_message: errorInfo.message,
        error_context: context,
        error_type: type,
        error_severity: severity,
        error_id: errorInfo.id,
      });
    }

    // Log to external service in production
    if (process.env.NODE_ENV === "production") {
      logToExternalService(errorInfo);
    }

    // Auto-remove non-critical errors after timeout
    if (severity !== ERROR_SEVERITY.CRITICAL) {
      const timeout = severity === ERROR_SEVERITY.HIGH ? 10000 : 5000;
      setTimeout(() => {
        removeError(errorInfo.id);
      }, timeout);
    }

    return errorInfo;
  };

  const handleAsyncError = async (
    asyncFn,
    context = "",
    type = ERROR_TYPES.COMPONENT
  ) => {
    isLoading.value = true;
    try {
      const result = await asyncFn();
      return { success: true, data: result };
    } catch (error) {
      const errorInfo = handleError(error, context, type);
      return { success: false, error: errorInfo };
    } finally {
      isLoading.value = false;
    }
  };

  const handleFormError = (error, fieldName = "") => {
    const context = fieldName ? `form field: ${fieldName}` : "form submission";
    return handleError(error, context, ERROR_TYPES.FORM, ERROR_SEVERITY.MEDIUM);
  };

  const handleNetworkError = (error, endpoint = "") => {
    const context = endpoint
      ? `network request: ${endpoint}`
      : "network request";
    const severity =
      error.code === "NETWORK_ERROR"
        ? ERROR_SEVERITY.HIGH
        : ERROR_SEVERITY.MEDIUM;
    return handleError(error, context, ERROR_TYPES.NETWORK, severity);
  };

  const handleAnimationError = (error, animationName = "") => {
    const context = animationName ? `animation: ${animationName}` : "animation";
    // Las animaciones no son críticas, solo log
    return handleError(
      error,
      context,
      ERROR_TYPES.ANIMATION,
      ERROR_SEVERITY.LOW
    );
  };

  const handleCriticalError = (error, context = "") => {
    return handleError(
      error,
      context,
      ERROR_TYPES.CRITICAL,
      ERROR_SEVERITY.CRITICAL
    );
  };

  const removeError = (errorId) => {
    const index = errors.value.findIndex((error) => error.id === errorId);
    if (index > -1) {
      errors.value.splice(index, 1);
    }
  };

  const clearErrors = () => {
    errors.value = [];
    globalError.value = null;
  };

  const clearGlobalError = () => {
    globalError.value = null;
  };

  const logToExternalService = (errorInfo) => {
    // Aquí puedes integrar con servicios como Sentry, LogRocket, etc.
    if (typeof window !== "undefined") {
      // Ejemplo con fetch a tu endpoint de logging
      fetch("/api/log-error", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(errorInfo),
      }).catch(() => {
        // Silently fail if logging service is down
      });
    }
  };

  const getErrorStats = () => {
    const stats = {
      total: errors.value.length,
      byType: {},
      bySeverity: {},
      recent: errors.value.slice(-5),
    };

    errors.value.forEach((error) => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
      stats.bySeverity[error.severity] =
        (stats.bySeverity[error.severity] || 0) + 1;
    });

    return stats;
  };

  // Retry mechanism
  const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;

        if (attempt === maxRetries) {
          handleError(
            error,
            `retry operation (${maxRetries} attempts)`,
            ERROR_TYPES.NETWORK,
            ERROR_SEVERITY.HIGH
          );
          throw error;
        }

        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, attempt - 1))
        );
      }
    }
  };

  return {
    errors,
    globalError,
    isLoading,
    ERROR_TYPES,
    ERROR_SEVERITY,
    handleError,
    handleAsyncError,
    handleFormError,
    handleNetworkError,
    handleAnimationError,
    handleCriticalError,
    removeError,
    clearErrors,
    clearGlobalError,
    getErrorStats,
    retryOperation,
  };
};
