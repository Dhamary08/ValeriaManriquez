<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section id="hero" class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="line">Hola, soy</span>
            <span class="line highlight">Valeria</span>
          </h1>
          <p
            class="hero-subtitle"
            style="
              border-left: 0.5rem solid var(--border-color);
              padding-left: 12px;
            "
          >
            Ingeniera Industrial <br />
            Desarrolladora Frontend
          </p>
          <div class="hero-cta">
            <BaseButton variant="primary" @click="scrollToSection('about')">
              Conoce más sobre mí
            </BaseButton>
            <BaseButton variant="outline" @click="scrollToSection('contact')">
              Contacto
            </BaseButton>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-elements">
            <div class="element element-1"></div>
            <div class="element element-2"></div>
            <div class="element element-3"></div>
            <div class="element element-4"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about-section">
      <div class="container">
        <SectionTitle title="Quién Soy" subtitle="Conoce mi historia" />
        <div class="about-content">
          <div class="about-text">
            <p class="about-paragraph">
              Soy un desarrollador frontend apasionado por crear experiencias
              web excepcionales. Con más de 4 años de experiencia en Vue.js,
              Vite y Nuxt.js entre otros, me especializo en desarrollar
              aplicaciones modernas y performantes.
            </p>
            <p class="about-paragraph">
              Mi enfoque se centra en escribir código limpio, crear interfaces
              intuitivas y optimizar la experiencia del usuario. Siempre estoy
              aprendiendo nuevas tecnologías y mejores prácticas.
            </p>
            <div class="skills-grid">
              <SkillCard
                v-for="skill in skills"
                :key="skill.name"
                :skill="skill"
              />
            </div>
          </div>
          <div class="about-image">
            <div class="image-container">
              <img
                src="/placeholder.png?height=400&width=300"
                alt="Foto personal"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="experience-section">
      <div class="container">
        <SectionTitle
          title="Experiencia Laboral"
          subtitle="Mi trayectoria profesional"
        />
        <ExperienceTimeline />
      </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="education-section">
      <div class="container">
        <SectionTitle title="Formación Académica" subtitle="Mi educación" />
        <EducationCarousel />
      </div>
    </section>

    <!-- Work Section -->
    <section id="work" class="work-section">
      <div class="container">
        <SectionTitle title="Mi Portafolio" subtitle="Proyectos destacados" />
        <div class="projects-grid">
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
          />
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <div class="container">
        <SectionTitle title="Contacto" subtitle="Hablemos de tu proyecto" />
        <div class="contact-content">
          <div class="contact-info">
            <ContactInfo />
          </div>
          <div class="contact-form">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useHead } from "#app";
// Lifecycle
import { useGsapAnimations } from "~/composables/useGsapAnimations";

// SEO
useHead({
  title: "Inicio - Mi Portafolio Personal",
  meta: [
    {
      name: "description",
      content:
        "Portafolio personal de desarrollador frontend especializado en Vue.js y Nuxt.js",
    },
  ],
});

// Data
const skills = ref([
  { name: "Vue.js", level: 90, icon: "vue" },
  { name: "Vuetify", level: 75, icon: "nodejs" },
  { name: "Nuxt.js", level: 85, icon: "nuxt" },
  { name: "JavaScript", level: 88, icon: "javascript" },
  { name: "TypeScript", level: 80, icon: "typescript" },
  { name: "SCSS/CSS", level: 85, icon: "css" },
  { name: "Node.js", level: 75, icon: "nodejs" },
  { name: "HTML", level: 75, icon: "nodejs" },
]);

const projects = ref([
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "Plataforma de comercio electrónico desarrollada con Nuxt 3 y Supabase",
    image: "/placeholder-1.svg?height=250&width=400",
    technologies: ["Nuxt.js", "Vue 3", "Supabase", "Stripe"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Aplicación de gestión de tareas con funcionalidades avanzadas",
    image: "/placeholder-1.svg?height=250&width=400",
    technologies: ["Vue.js", "Pinia", "Firebase", "Tailwind"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "Sitio web de portafolio con animaciones GSAP y diseño responsive",
    image: "/placeholder-1.svg?height=250&width=400",
    technologies: ["Nuxt.js", "GSAP", "SCSS", "Netlify"],
    demoUrl: "#",
    codeUrl: "#",
  },
]);

// Methods
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(() => {
  const { initializePageAnimations } = useGsapAnimations();
  initializePageAnimations();
});
</script>
