<template>
  <form
    class="contact-form"
    name="contact"
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    action="/contact-success.html"
    @submit.prevent="handleSubmit"
  >
    <input type="hidden" name="form-name" value="contact" />
    <div style="display: none">
      <label>
        Don't fill this out if you're human:
        <input name="bot-field" />
      </label>
    </div>

    <div class="form-group">
      <label for="name" class="form-label">Nombre</label>
      <input
        id="name"
        v-model="form.name"
        name="name"
        type="text"
        class="form-input"
        :class="{ error: errors.name }"
        placeholder="Tu nombre completo"
        required
      />
      <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
    </div>

    <div class="form-group">
      <label for="email" class="form-label">Email</label>
      <input
        id="email"
        v-model="form.email"
        name="email"
        type="email"
        class="form-input"
        :class="{ error: errors.email }"
        placeholder="tu@email.com"
        required
      />
      <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
    </div>

    <div class="form-group">
      <label for="subject" class="form-label">Asunto</label>
      <input
        id="subject"
        v-model="form.subject"
        name="subject"
        type="text"
        class="form-input"
        :class="{ error: errors.subject }"
        placeholder="Asunto del mensaje"
        required
      />
      <span v-if="errors.subject" class="error-message">{{
        errors.subject
      }}</span>
    </div>

    <div class="form-group">
      <label for="message" class="form-label">Mensaje</label>
      <textarea
        id="message"
        v-model="form.message"
        name="message"
        class="form-textarea"
        :class="{ error: errors.message }"
        placeholder="Cuéntame sobre tu proyecto..."
        rows="5"
        required
      ></textarea>
      <span v-if="errors.message" class="error-message">{{
        errors.message
      }}</span>
    </div>

    <input type="hidden" name="user-agent" :value="userAgent" />
    <input type="hidden" name="timestamp" :value="timestamp" />
    <input type="hidden" name="page-url" :value="pageUrl" />

    <BaseButton
      type="submit"
      variant="primary"
      size="large"
      :loading="isSubmitting"
      :disabled="isSubmitting"
      class="submit-button"
    >
      {{ isSubmitting ? "Enviando..." : "Enviar Mensaje" }}
    </BaseButton>

    <div v-if="submitMessage" class="submit-message" :class="submitStatus">
      {{ submitMessage }}
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useClarity } from "~/composables/useClarity";

const { trackEvent, upgradeSession } = useClarity();

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const errors = ref({});
const isSubmitting = ref(false);
const submitMessage = ref("");
const submitStatus = ref("");
const userAgent = ref("");
const timestamp = ref("");
const pageUrl = ref("");

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const validateForm = () => {
  errors.value = {};

  if (!form.name.trim()) {
    errors.value.name = "El nombre es requerido";
  }

  if (!form.email.trim()) {
    errors.value.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.value.email = "El email no es válido";
  }

  if (!form.subject.trim()) {
    errors.value.subject = "El asunto es requerido";
  }

  if (!form.message.trim()) {
    errors.value.message = "El mensaje es requerido";
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    trackEvent("contact_form_validation_error", {
      errors: Object.keys(errors.value),
    });
    return;
  }

  isSubmitting.value = true;

  trackEvent("contact_form_submit_attempt", {
    email: form.email,
    subject: form.subject,
    message_length: form.message.length,
  });

  try {
    const formData = {
      "form-name": "contact",
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      "user-agent": userAgent.value,
      timestamp: timestamp.value,
      "page-url": pageUrl.value,
    };

    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encode(formData),
    });

    if (response.ok) {
      window.location.href = "/contact-success.html";

      trackEvent("contact_form_submit_success", {
        email: form.email,
        subject: form.subject,
        submission_method: "netlify_forms",
      });

      upgradeSession();
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    submitMessage.value = "Error al enviar el mensaje. Inténtalo de nuevo.";
    submitStatus.value = "error";

    trackEvent("contact_form_submit_error", {
      error: error.message || "Unknown error",
      submission_method: "netlify_forms",
    });
  } finally {
    isSubmitting.value = false;

    setTimeout(() => {
      submitMessage.value = "";
      submitStatus.value = "";
    }, 5000);
  }
};

onMounted(() => {
  if (typeof window !== "undefined") {
    userAgent.value = navigator.userAgent;
    timestamp.value = new Date().toISOString();
    pageUrl.value = window.location.href;
  }
});
</script>

<style lang="scss" scoped>
.contact-form {
  .form-group {
    margin-bottom: 1.5rem;

    .form-label {
      display: block;
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      background: var(--bg-primary);
      color: var(--text-primary);
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(var(--accent-color-rgb), 0.1);
      }

      &.error {
        border-color: var(--error-color);
      }

      &::placeholder {
        color: var(--text-tertiary);
      }
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }

    .error-message {
      display: block;
      color: var(--error-color);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  }

  .submit-button {
    width: 100%;
    margin-top: 1rem;
  }

  .submit-message {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;

    &.success {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
      border: 1px solid rgba(34, 197, 94, 0.2);
    }

    &.error {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
  }
}
</style>
