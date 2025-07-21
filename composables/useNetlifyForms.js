export const useNetlifyForms = () => {
  const submitForm = async (formName, formData) => {
    try {
      const encode = (data) => {
        return Object.keys(data)
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
          )
          .join("&");
      };

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encode({
          "form-name": formName,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true, data: response };
    } catch (error) {
      console.error("Netlify form submission error:", error);
      return { success: false, error: error.message };
    }
  };

  const validateNetlifyForm = (formData, rules = {}) => {
    const errors = {};

    Object.keys(rules).forEach((field) => {
      const rule = rules[field];
      const value = formData[field];

      if (rule.required && (!value || !value.toString().trim())) {
        errors[field] = rule.message || `${field} es requerido`;
      }

      if (rule.email && value && !/\S+@\S+\.\S+/.test(value)) {
        errors[field] = rule.emailMessage || "Email no válido";
      }

      if (rule.minLength && value && value.length < rule.minLength) {
        errors[field] =
          rule.minLengthMessage || `Mínimo ${rule.minLength} caracteres`;
      }

      if (rule.maxLength && value && value.length > rule.maxLength) {
        errors[field] =
          rule.maxLengthMessage || `Máximo ${rule.maxLength} caracteres`;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  return {
    submitForm,
    validateNetlifyForm,
  };
};
