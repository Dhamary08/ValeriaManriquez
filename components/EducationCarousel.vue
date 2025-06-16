<template>
  <div class="education-carousel">
    <div ref="carouselContainer" class="carousel-container">
      <div
        v-for="education in educations"
        :key="education.id"
        ref="educationCards"
        class="education-card"
      >
        <div class="card-content">
          <div class="education-icon">
            <IconImg :name="education.icon" />
          </div>
          <div class="education-info">
            <h3 class="degree">{{ education.degree }}</h3>
            <div class="institution">
              <IconImg name="graduation-cap" />
              <span>{{ education.institution }}</span>
            </div>
            <div class="period">{{ education.period }}</div>
            <p class="description">{{ education.description }}</p>
            <div v-if="education.highlights" class="highlights">
              <div
                v-for="highlight in education.highlights"
                :key="highlight"
                class="highlight-item"
              >
                <IconImg name="star" />
                <span>{{ highlight }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-background"></div>
      </div>
    </div>

    <div class="carousel-controls">
      <button
        class="control-btn prev"
        :disabled="currentSlide === 0"
        @click="previousSlide"
      >
        <IconImg name="chevron-left" />
      </button>
      <div class="slide-indicators">
        <button
          v-for="(_, index) in educations"
          :key="index"
          class="indicator"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></button>
      </div>
      <button
        class="control-btn next"
        :disabled="currentSlide === educations.length - 1"
        @click="nextSlide"
      >
        <IconImg name="chevron-right" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const carouselContainer = ref(null);
const educationCards = ref([]);
const currentSlide = ref(0);
let autoplayInterval = null;
let tl = null;

const educations = ref([
  {
    id: 2,
    degree: "Diplomado UI | UX | Agile",
    institution: "Universidad Santiago de Chile",
    period: "2025",
    description:
      "Desarrollo de habilidades prácticas y metodologías ágiles para abordar proyectos de diseño digital de manera eficiente y efectiva. Adquiriendo conocimientos teóricos y prácticos en investigación y diseño de experiencia de usuario e interfaces digitales.",
    highlights: [],
    icon: "award",
  },
  {
    id: 3,
    degree: "Bootcamp de Java",
    institution: "Talento Digital",
    period: "2020",
    description:
      "Programadora Front y Back End, con conocimiento de la cadena de desarrollo de software y páginas web, manejo de múltiples lenguajes y tecnologías.",
    highlights: [],
    icon: "award",
  },
  {
    id: 4,
    degree: "Ingeniería Civil Industrial mención Bioprocesos",
    institution: "Universidad de La Frontera",
    period: "2019",
    description:
      "Formación que me permite entablar iniciativas de negocio, desempeñarme en empresas productivas y de servicios, tanto públicas como privadas. Entre los últimos ramos cursados están Logística y Distribución, Sistemas de Gestión de Calidad y Gestión de Operaciones.",
    highlights: [],
    icon: "award",
  },
]);

const nextSlide = () => {
  if (currentSlide.value < educations.value.length - 1) {
    currentSlide.value++;
    updateCarousel();
  }
};

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
    updateCarousel();
  }
};

const goToSlide = (index) => {
  currentSlide.value = index;
  updateCarousel();
};

const updateCarousel = () => {
  if (!import.meta.client || !educationCards.value.length) return;

  // Detener animación anterior
  if (tl) tl.kill();

  // Crear nueva timeline
  tl = gsap.timeline();

  educationCards.value.forEach((card, index) => {
    if (index === currentSlide.value) {
      // Carta activa
      tl.to(
        card,
        {
          x: 0,
          scale: 1,
          opacity: 1,
          zIndex: 3,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        0
      );

      // Animación del texto
      const textElements = card.querySelectorAll(
        ".degree, .institution, .period, .description, .highlight-item"
      );
      tl.fromTo(
        textElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.3
      );
    } else if (index < currentSlide.value) {
      // Cartas anteriores
      tl.to(
        card,
        {
          x: -100,
          scale: 0.8,
          opacity: 0.3,
          zIndex: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        0
      );
    } else {
      // Cartas siguientes
      tl.to(
        card,
        {
          x: 100,
          scale: 0.8,
          opacity: 0.3,
          zIndex: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        0
      );
    }
  });
};

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    if (currentSlide.value < educations.value.length - 1) {
      nextSlide();
    } else {
      currentSlide.value = 0;
      updateCarousel();
    }
  }, 5000);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

onMounted(() => {
  if (!import.meta.client) return;

  // Animación inicial de entrada
  gsap.fromTo(
    ".education-carousel",
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".education-carousel",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Configurar carousel inicial
  setTimeout(() => {
    updateCarousel();
    startAutoplay();
  }, 500);
});

onUnmounted(() => {
  stopAutoplay();
  if (tl) tl.kill();
});
</script>

<style lang="scss" scoped>
.education-carousel {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;

  .carousel-container {
    position: relative;
    height: 400px;
    overflow: hidden;
    border-radius: var(--radius-xl);

    .education-card {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      overflow: hidden;
      cursor: pointer;
      transition: all var(--transition-normal);

      &:hover {
        .card-background {
          transform: scale(1.1);
        }
      }

      .card-content {
        position: relative;
        z-index: 2;
        padding: 2.5rem;
        height: 100%;
        display: flex;
        align-items: center;
        gap: 2rem;

        @media (max-width: 768px) {
          flex-direction: column;
          text-align: center;
          padding: 2rem;
        }

        .education-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(
            135deg,
            var(--accent-color),
            var(--accent-secondary)
          );
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;

          :deep(svg) {
            width: 40px;
            height: 40px;
            color: white;
          }
        }

        .education-info {
          flex: 1;

          .degree {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 1rem;
            font-family: "Playfair Display", serif;

            @media (max-width: 768px) {
              font-size: 1.25rem;
            }
          }

          .institution {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--accent-color);
            font-weight: 500;
            margin-bottom: 0.5rem;

            @media (max-width: 768px) {
              justify-content: center;
            }

            :deep(svg) {
              width: 18px;
              height: 18px;
            }
          }

          .period {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }

          .description {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          .highlights {
            .highlight-item {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              color: var(--text-secondary);
              margin-bottom: 0.5rem;
              font-size: 0.9rem;

              @media (max-width: 768px) {
                justify-content: center;
              }

              :deep(svg) {
                width: 14px;
                height: 14px;
                color: var(--accent-color);
              }
            }
          }
        }
      }

      .card-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(var(--accent-color-rgb), 0.05),
          rgba(var(--accent-color-rgb), 0.02)
        );
        transition: transform var(--transition-slow);
      }
    }
  }

  .carousel-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;

    .control-btn {
      width: 50px;
      height: 50px;
      background: var(--bg-secondary);
      border: 2px solid var(--border-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-normal);

      &:hover:not(:disabled) {
        background: var(--accent-color);
        border-color: var(--accent-color);
        color: white;
        transform: scale(1.1);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      :deep(svg) {
        width: 20px;
        height: 20px;
      }
    }

    .slide-indicators {
      display: flex;
      gap: 0.5rem;

      .indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--border-color);
        border: none;
        cursor: pointer;
        transition: all var(--transition-normal);

        &.active {
          background: var(--accent-color);
          transform: scale(1.2);
        }

        &:hover {
          background: var(--accent-secondary);
        }
      }
    }
  }
}
</style>
