<template>
  <div class="experience-timeline">
    <div class="timeline-container">
      <div ref="timelineLine" class="timeline-line"></div>

      <div
        v-for="(experience, index) in experiences"
        :key="experience.id"
        ref="timelineItems"
        class="timeline-item"
        :class="{ 'timeline-item-right': index % 2 === 1 }"
      >
        <div ref="timelineDots" class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-card">
            <div class="timeline-header">
              <h3 class="position">{{ experience.position }}</h3>
              <span class="period">{{ experience.period }}</span>
            </div>
            <div class="company">
              <IconImg name="building" />
              <span>{{ experience.company }}</span>
            </div>
            <p class="description">{{ experience.description }}</p>
            <div class="technologies">
              <span
                v-for="tech in experience.technologies"
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            <div v-if="experience.achievements" class="achievements">
              <h4>Logros principales:</h4>
              <ul>
                <li
                  v-for="achievement in experience.achievements"
                  :key="achievement"
                >
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const timelineLine = ref(null);
const timelineItems = ref([]);
const timelineDots = ref([]);

const experiences = ref([
  {
    id: 1,
    position: "Senior Frontend Developer",
    company: "Digital Bank",
    period: "2023 - Presente",
    description:
      "Contribuyo en el desarrollo de aplicaciones web modernas utilizando Vue.js y C#, implementando arquitecturas escalables y optimizadas para el rendimiento.",
    technologies: [
      "Vue.js",
      "CSS",
      "Figma",
      "TypeScript",
      "C#",
      "Git",
      "Vuetify",
      "SignalR",
    ],
    /* achievements: [
      "Trabajo en diversos proyectos y aplicaciones para la empresa.",
    ], */
  },
  {
    id: 2,
    position: "Frontend Developer & UI",
    company: "Check Digital",
    period: "2021 - 2023",
    description:
      "Desarrollé sitios web y aplicaciones interactivas para clientes de diversos sectores, enfocándome en la experiencia de usuario y las mejores prácticas de desarrollo.",
    technologies: [
      "JavaScript",
      "Vue.js",
      "SCSS",
      "Webpack",
      "Git",
      "Adobe XD",
      "Ant Design",
      "Laravel",
    ],
    /*  achievements: [
      "Desarrollé proyectos internos para Check Digital clave para el crecimiento de la empresa.",
    ], */
  },
  {
    id: 3,
    position: "Junior Web Developer",
    company: "Freelance",
    period: "2020 - 2022",
    description:
      "Inicié mi carrera profesional desarrollando componentes web y colaborando en proyectos de transformación digital, aprendiendo las bases del desarrollo frontend.",
    technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap"],
    /*  achievements: [
      "Participe en la creación de Recoders.cl, una comunidad de personas que se han ReConvertido hacia el Mundo TI.",
      "Participe en Koders.cl enfocada en reconversión al mundo digital. Así como en actualización de procesos de Mindset Digital",
      "Contribuí al desarrollo de página web de la comunidad y desarrollo tecnológicos de aplicaciones internas.",
    ], */
  },
]);

onMounted(() => {
  if (!import.meta.client) return;

  // Animación de la línea de tiempo
  gsap.fromTo(
    timelineLine.value,
    { height: 0 },
    {
      height: "100%",
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".experience-timeline",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    }
  );

  // Animación de los elementos de la timeline
  timelineItems.value.forEach((item, index) => {
    const isRight = index % 2 === 1;

    gsap.fromTo(
      item,
      {
        x: isRight ? 100 : -100,
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: index * 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Animación de los puntos de la timeline
  timelineDots.value.forEach((dot, index) => {
    gsap.fromTo(
      dot,
      { scale: 0, backgroundColor: "#e2e8f0" },
      {
        scale: 1,
        backgroundColor: "var(--accent-color)",
        duration: 0.5,
        delay: index * 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: dot,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
});
</script>

<style lang="scss" scoped>
.experience-timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;

  .timeline-container {
    position: relative;
  }

  .timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(
      180deg,
      var(--accent-color),
      var(--accent-secondary)
    );
    transform: translateX(-50%);
    border-radius: 2px;

    @media (max-width: 768px) {
      left: 30px;
    }
  }

  .timeline-item {
    position: relative;
    margin-bottom: 4rem;
    width: 50%;
    padding-right: 3rem;

    &.timeline-item-right {
      left: 50%;
      padding-right: 0;
      padding-left: 3rem;
    }

    @media (max-width: 768px) {
      width: 100%;
      left: 0 !important;
      padding-left: 4rem;
      padding-right: 0;
    }

    .timeline-dot {
      position: absolute;
      right: -8px;
      top: 2rem;
      width: 16px;
      height: 16px;
      background: var(--accent-color);
      border-radius: 50%;
      border: 4px solid var(--bg-primary);
      box-shadow: 0 0 0 4px var(--accent-color);
      z-index: 2;

      .timeline-item-right & {
        left: -8px;
        right: auto;
      }

      @media (max-width: 768px) {
        left: 22px;
        right: auto;
      }
    }

    .timeline-content {
      .timeline-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        padding: 2rem;
        box-shadow: var(--shadow-md);
        transition: all var(--transition-normal);
        position: relative;

        &:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
        }

        &::before {
          content: "";
          position: absolute;
          top: 2rem;
          right: -10px;
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 10px solid var(--bg-secondary);

          .timeline-item-right & {
            left: -10px;
            right: auto;
            border-left: none;
            border-right: 10px solid var(--bg-secondary);
          }

          @media (max-width: 768px) {
            left: -10px;
            right: auto;
            border-left: none;
            border-right: 10px solid var(--bg-secondary);
          }
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;

          .position {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-primary);
            margin: 0;
          }

          .period {
            background: var(--accent-color);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
            white-space: nowrap;
          }
        }

        .company {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 1rem;

          :deep(svg) {
            width: 16px;
            height: 16px;
            color: var(--accent-color);
          }
        }

        .description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;

          .tech-tag {
            background: var(--bg-tertiary);
            color: var(--accent-color);
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            border: 1px solid var(--accent-color);
          }
        }

        .achievements {
          h4 {
            color: var(--text-primary);
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
          }

          ul {
            list-style: none;
            padding: 0;

            li {
              position: relative;
              padding-left: 1.5rem;
              color: var(--text-secondary);
              margin-bottom: 0.5rem;
              line-height: 1.5;

              &::before {
                content: "✓";
                position: absolute;
                left: 0;
                color: var(--accent-color);
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}
</style>
