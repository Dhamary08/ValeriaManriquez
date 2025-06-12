// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },

  // CSS Configuration
  css: ["~/assets/scss/main.scss"],
  compatibilityDate: "2025-05-15",
  // Modules
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Inter: [300, 400, 500, 600, 700],
          "Playfair Display": [400, 500, 600, 700],
        },
      },
    ],
  ],

  // Auto-import components
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  // SEO Configuration
  app: {
    head: {
      title: "Mi Portafolio Personal",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Portafolio personal de desarrollador web especializado en Vue.js y Nuxt.js",
        },
        {
          name: "keywords",
          content: "desarrollador, web, vue, nuxt, javascript, frontend",
        },
        { property: "og:title", content: "Mi Portafolio Personal" },
        {
          property: "og:description",
          content: "Portafolio personal de desarrollador web",
        },
        { property: "og:type", content: "website" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // Build configuration
  build: {
    transpile: ["gsap"],
  },

  // Runtime config
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  },
});
