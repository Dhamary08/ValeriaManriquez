<template>
  <div class="home-page">
    <!-- Main content landmark -->
    <main id="main-content">
      <!-- Hero Section -->
      <section id="hero" class="hero-section" aria-labelledby="hero-title">
        <div class="container">
          <div class="hero-content">
            <h1 id="hero-title" class="hero-title">
              <span class="line">Hola, soy</span>
              <span class="line highlight">Tu Nombre</span>
            </h1>
            <p class="hero-subtitle">
              Desarrollador Frontend especializado en Vue.js y Nuxt.js con más
              de 3 años de experiencia creando experiencias web excepcionales
            </p>
            <div class="hero-cta">
              <BaseButton
                @click="scrollToSection('about')"
                variant="primary"
                aria-label="Conocer más sobre mi experiencia"
              >
                Conoce más sobre mí
              </BaseButton>
              <BaseButton
                @click="scrollToSection('contact')"
                variant="outline"
                aria-label="Ir al formulario de contacto"
              >
                Contacto
              </BaseButton>
            </div>
          </div>
          <div class="hero-visual" aria-hidden="true">
            <div class="floating-elements">
              <div class="element element-1"></div>
              <div class="element element-2"></div>
              <div class="element element-3"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="about-section" aria-labelledby="about-title">
        <div class="container">
          <SectionTitle
            title="Quién Soy"
            subtitle="Conoce mi historia"
            id="about-title"
          />
          <div class="about-content">
            <div class="about-text">
              <p class="about-paragraph">
                Soy un desarrollador frontend apasionado por crear experiencias
                web excepcionales. Con más de 3 años de experiencia en Vue.js y
                Nuxt.js, me especializo en desarrollar aplicaciones modernas y
                performantes.
              </p>
              <p class="about-paragraph">
                Mi enfoque se centra en escribir código limpio, crear interfaces
                intuitivas y optimizar la experiencia del usuario. Siempre estoy
                aprendiendo nuevas tecnologías y mejores prácticas.
              </p>

              <!-- Skills con loading state -->
              <div class="skills-section">
                <h3>Habilidades Técnicas</h3>
                <Suspense>
                  <template #default>
                    <div class="skills-grid">
                      <SkillCard
                        v-for="skill in skills"
                        :key="skill.name"
                        :skill="skill"
                      />
                    </div>
                  </template>
                  <template #fallback>
                    <div class="skills-grid">
                      <SkeletonLoader v-for="n in 6" :key="n" variant="card" />
                    </div>
                  </template>
                </Suspense>
              </div>
            </div>
            <div class="about-image">
              <div class="image-container">
                <LazyImage
                  src="/user-1.png"
                  alt="Foto personal del desarrollador"
                  width="300"
                  height="400"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section
        id="experience"
        class="experience-section"
        aria-labelledby="experience-title"
      >
        <div class="container">
          <SectionTitle
            title="Experiencia Laboral"
            subtitle="Mi trayectoria profesional"
            id="experience-title"
          />
          <ErrorBoundary>
            <Suspense>
              <template #default>
                <ExperienceTimeline />
              </template>
              <template #fallback>
                <div class="timeline-skeleton">
                  <SkeletonLoader v-for="n in 3" :key="n" variant="timeline" />
                </div>
              </template>
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>

      <!-- Education Section -->
      <section
        id="education"
        class="education-section"
        aria-labelledby="education-title"
      >
        <div class="container">
          <SectionTitle
            title="Formación Académica"
            subtitle="Mi educación"
            id="education-title"
          />
          <ErrorBoundary>
            <Suspense>
              <template #default>
                <EducationCarousel />
              </template>
              <template #fallback>
                <SkeletonLoader variant="card" />
              </template>
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>

      <!-- Work Section -->
      <section id="work" class="work-section" aria-labelledby="work-title">
        <div class="container">
          <SectionTitle
            title="Mi Portafolio"
            subtitle="Proyectos destacados"
            id="work-title"
          />
          <Suspense>
            <template #default>
              <div class="projects-grid" role="list">
                <ProjectCard
                  v-for="project in projects"
                  :key="project.id"
                  :project="project"
                  role="listitem"
                />
              </div>
            </template>
            <template #fallback>
              <div class="projects-grid">
                <SkeletonLoader v-for="n in 3" :key="n" variant="card" />
              </div>
            </template>
          </Suspense>
        </div>
      </section>

      <!-- Contact Section -->
      <section
        id="contact"
        class="contact-section"
        aria-labelledby="contact-title"
      >
        <div class="container">
          <SectionTitle
            title="Contacto"
            subtitle="Hablemos de tu proyecto"
            id="contact-title"
          />
          <div class="contact-content">
            <div class="contact-info">
              <ContactInfo />
            </div>
            <div class="contact-form">
              <ErrorBoundary>
                <ContactForm />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useHead } from "#app";
import { useErrorHandler } from "~/composables/useErrorHandler";
import { usePerformance } from "~/composables/usePerformance";
import { useGsapAnimations } from "~/composables/useGsapAnimations";

const { handleError } = useErrorHandler();
const { trackCustomMetric } = usePerformance();

// SEO mejorado
useHead({
  title: "Inicio",
  meta: [
    {
      name: "description",
      content:
        "Portfolio de desarrollador frontend especializado en Vue.js, Nuxt.js y JavaScript. Más de 3 años creando aplicaciones web modernas y performantes.",
    },
    {
      name: "keywords",
      content:
        "desarrollador frontend, vue.js, nuxt.js, javascript, portfolio, experiencia laboral, proyectos web",
    },
  ],
});

// Data
const skills = ref([
  { name: "Vue.js", level: 90, icon: "vue" },
  { name: "Nuxt.js", level: 85, icon: "nuxt" },
  { name: "JavaScript", level: 88, icon: "javascript" },
  { name: "TypeScript", level: 80, icon: "typescript" },
  { name: "SCSS/CSS", level: 85, icon: "css" },
  { name: "Node.js", level: 75, icon: "nodejs" },
]);

const projects = ref([
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "Plataforma de comercio electrónico desarrollada con Nuxt 3 y Supabase, con sistema de pagos integrado y panel de administración completo.",
    image: "/placeholder-1.svg?height=250&width=400&text=E-commerce+Platform",
    technologies: ["Nuxt.js", "Vue 3", "Supabase", "Stripe"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Aplicación de gestión de tareas con funcionalidades avanzadas como colaboración en tiempo real y notificaciones push.",
    image: "/placeholder-1.svg?height=250&width=400&text=Task+Management+App",
    technologies: ["Vue.js", "Pinia", "Firebase", "Tailwind"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "Sitio web de portafolio con animaciones GSAP, diseño responsive y optimizado para Core Web Vitals.",
    image: "/placeholder-1.svg?height=250&width=400&text=Portfolio+Website",
    technologies: ["Nuxt.js", "GSAP", "SCSS", "Netlify"],
    demoUrl: "#",
    codeUrl: "#",
  },
]);

// Methods con error handling
const scrollToSection = (sectionId) => {
  try {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const targetPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Track scroll action
      trackCustomMetric("section_scroll", sectionId);
    }
  } catch (error) {
    handleError(error, "scrollToSection");
  }
};

// Lifecycle
onMounted(async () => {
  try {
    // Esperar a que el DOM esté completamente renderizado
    await nextTick();

    // Pequeño delay para asegurar que todos los componentes estén montados
    setTimeout(() => {
      const { initializePageAnimations } = useGsapAnimations();
      initializePageAnimations();
    }, 100);

    // Track page load time
    const loadTime = performance.now();
    trackCustomMetric("page_load_time", Math.round(loadTime));
  } catch (error) {
    handleError(error, "page initialization");
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/home.scss";

// Mejoras de accesibilidad
.skills-section {
  h3 {
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }
}

.timeline-skeleton,
.projects-grid {
  display: grid;
  gap: var(--space-lg);
}

.timeline-skeleton {
  max-width: 800px;
  margin: 0 auto;
}

// Mejorar contraste para accesibilidad
.hero-subtitle {
  color: var(--text-secondary);
  font-size: 1.125rem;

  // Asegurar contraste mínimo
  .dark-mode & {
    color: var(--text-secondary);
  }
}

// Responsive improvements
@media (max-width: 768px) {
  .hero-cta {
    flex-direction: column;
    gap: 1rem;

    .base-button {
      width: 100%;
    }
  }

  .about-content {
    gap: var(--space-2xl);
  }

  .contact-content {
    gap: var(--space-2xl);
  }
}
</style>
