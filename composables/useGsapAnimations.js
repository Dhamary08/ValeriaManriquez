import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugin solo en el cliente
if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGsapAnimations = () => {
  const initializeLayoutAnimations = () => {
    if (!process.client) return;

    try {
      // Header animation
      gsap.fromTo(
        ".app-header",
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    } catch (error) {
      console.warn("Error en animaciones de layout:", error);
    }
  };

  const initializePageAnimations = () => {
    if (!process.client) return;

    try {
      // Hero animations
      const tl = gsap.timeline();

      // Verificar que los elementos existen antes de animar
      const heroTitle = document.querySelector(".hero-title .line");
      const heroSubtitle = document.querySelector(".hero-subtitle");
      const heroCta = document.querySelector(".hero-cta");
      const floatingElements = document.querySelectorAll(
        ".floating-elements .element"
      );

      if (heroTitle) {
        tl.fromTo(
          ".hero-title .line",
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" }
        );
      }

      if (heroSubtitle) {
        tl.fromTo(
          ".hero-subtitle",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );
      }

      if (heroCta) {
        tl.fromTo(
          ".hero-cta",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        );
      }

      if (floatingElements.length > 0) {
        tl.fromTo(
          ".floating-elements .element",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 0.1,
            duration: 1,
            stagger: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        );
      }

      // Section animations with ScrollTrigger
      const sectionTitles = document.querySelectorAll(".section-title");
      sectionTitles.forEach((title) => {
        gsap.fromTo(
          title,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Skill cards animation
      const skillCards = document.querySelectorAll(".skill-card");
      skillCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Project cards animation
      const projectCards = document.querySelectorAll(".project-card");
      projectCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Contact section animation
      const contactContent = document.querySelector(".contact-content");
      if (contactContent) {
        const contactChildren = contactContent.children;
        gsap.fromTo(
          contactChildren,
          { x: (index) => (index === 0 ? -50 : 50), opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".contact-content",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Timeline animations
      const timelineItems = document.querySelectorAll(".timeline-item");
      timelineItems.forEach((item, index) => {
        const isRight = index % 2 === 1;

        gsap.fromTo(
          item,
          {
            x: isRight ? 100 : -100,
            opacity: 0,
            scale: 0.9,
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

      // Education carousel entrance animation
      const educationCarousel = document.querySelector(".education-carousel");
      if (educationCarousel) {
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
      }
    } catch (error) {
      console.warn("Error en animaciones de página:", error);
    }
  };

  const animatePageTransition = (from, to) => {
    if (!process.client) return Promise.resolve();

    return new Promise((resolve) => {
      try {
        const tl = gsap.timeline({
          onComplete: resolve,
        });

        if (from) {
          tl.to(from, {
            opacity: 0,
            y: -50,
            duration: 0.3,
            ease: "power2.in",
          });
        }

        if (to) {
          tl.fromTo(
            to,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        }
      } catch (error) {
        console.warn("Error en transición de página:", error);
        resolve();
      }
    });
  };

  return {
    initializeLayoutAnimations,
    initializePageAnimations,
    animatePageTransition,
  };
};
