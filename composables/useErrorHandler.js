import { ref } from "vue";

export const useErrorHandler = () => {
  const errors = ref([]);
  const isLoading = ref(false);

  const handleError = (error, context = "") => {
    console.error(`Error in ${context}:`, error);

    const errorInfo = {
      id: Date.now(),
      message: error.message || "Error desconocido",
      context,
      timestamp: new Date().toISOString(),
    };

    errors.value.push(errorInfo);

    // Track error for analytics
    if (window.clarity) {
      window.clarity("event", "error_handled", {
        error_message: errorInfo.message,
        error_context: context,
        error_id: errorInfo.id,
      });
    }

    // Auto-remove error after 5 seconds
    setTimeout(() => {
      removeError(errorInfo.id);
    }, 5000);

    return errorInfo;
  };

  const removeError = (errorId) => {
    const index = errors.value.findIndex((error) => error.id === errorId);
    if (index > -1) {
      errors.value.splice(index, 1);
    }
  };

  const clearErrors = () => {
    errors.value = [];
  };

  const withErrorHandling = async (asyncFn, context = "") => {
    isLoading.value = true;
    try {
      const result = await asyncFn();
      return { success: true, data: result };
    } catch (error) {
      const errorInfo = handleError(error, context);
      return { success: false, error: errorInfo };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    errors,
    isLoading,
    handleError,
    removeError,
    clearErrors,
    withErrorHandling,
  };
};
