// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import clarity from "@microsoft/clarity";

export default withNuxt({
  // Configuración de Clarity
  /* clarity: {
    projectId: "your-clarity-project-id", // Reemplaza con tu ID de proyecto de Clarity
    enable: true, // Habilita Clarity
  }, */
  // Ignorar carpetas o archivos específicos
  ignores: ["dist", "node_modules", ".output", ".nuxt"],

  // Opciones de lenguaje
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    globals: {
      window: "readonly",
      document: "readonly",
    },
  },

  // Opciones del linter
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },

  // Plugins adicionales (si necesitas agregar alguno)
  plugins: {
    // vue: require('eslint-plugin-vue'), // Nuxt ya lo incluye normalmente
  },

  // Extensiones de configuración
  // extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],

  // Reglas personalizadas
  rules: {
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
      },
    ],
    // Puedes agregar más reglas aquí
  },
});
