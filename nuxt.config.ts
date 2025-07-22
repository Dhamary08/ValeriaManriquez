import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },

  // CSS Configuration
  css: ["~/assets/scss/main.scss"],

  // Modules
  modules: [
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
  ],

  // Google Fonts
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
      "Playfair Display": [400, 500, 600, 700],
    },
    display: "swap", // Mejorar performance
    preload: true,
  },

  // Image optimization
  image: {
    quality: 80,
    format: ["webp", "jpg"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Auto-import components y composables
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  // Auto-import composables
  imports: {
    dirs: ["composables/**"],
  },

  // SEO Configuration mejorado
  app: {
    head: {
      title: "Mi Portafolio Personal - Desarrollador Frontend",
      titleTemplate: "%s | Portfolio",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Portafolio personal de desarrollador frontend especializado en Vue.js, Nuxt.js y experiencias web modernas. Más de 3 años creando aplicaciones performantes.",
        },
        {
          name: "keywords",
          content:
            "desarrollador frontend, vue.js, nuxt.js, javascript, typescript, portfolio, web developer, españa",
        },
        { name: "author", content: "Tu Nombre" },
        { name: "robots", content: "index, follow" },

        // Open Graph
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Mi Portafolio Personal - Desarrollador Frontend",
        },
        {
          property: "og:description",
          content:
            "Portafolio personal de desarrollador frontend especializado en Vue.js y Nuxt.js",
        },
        { property: "og:site_name", content: "Portfolio" },
        { property: "og:locale", content: "es_ES" },

        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Mi Portafolio Personal - Desarrollador Frontend",
        },
        {
          name: "twitter:description",
          content: "Portafolio personal de desarrollador frontend",
        },

        // PWA
        { name: "theme-color", content: "#3b82f6" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "canonical",
          href: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
        },
        // Preconnect para mejor performance
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Tu Nombre",
            jobTitle: "Frontend Developer",
            description:
              "Desarrollador frontend especializado en Vue.js y Nuxt.js",
            url: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
            sameAs: [
              "https://github.com/tu-usuario",
              "https://linkedin.com/in/tu-perfil",
            ],
            knowsAbout: [
              "Vue.js",
              "Nuxt.js",
              "JavaScript",
              "TypeScript",
              "SCSS",
              "GSAP",
            ],
          }),
        },
        {
          type: "text/javascript",
          innerHTML: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NUXT_CLARITY_PROJECT_ID || ""}");
          `,
        },
      ],
    },
  },

  // Build configuration optimizada
  build: {
    transpile: ["gsap"],
  },

  // Optimizaciones de performance
  experimental: {
    payloadExtraction: false, // Mejor para sitios estáticos
  },

  // Nitro optimizations
  nitro: {
    compressPublicAssets: true,
    minify: true,
  },

  // Runtime config
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
      clarityProjectId: process.env.NUXT_CLARITY_PROJECT_ID || "",
    },
  },

  // Vite optimizations
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/scss/abstracts/_variables.scss"; @use "~/assets/scss/abstracts/_mixins.scss";',
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            gsap: ["gsap"],
            icons: ["lucide-vue-next"],
          },
        },
      },
    },
  },
});
