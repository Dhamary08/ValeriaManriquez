import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useErrorHandler } from "~/composables/useErrorHandler";

// Registrar plugin solo en el cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGsapAnimations = () => {
  const { handleAnimationError, retryOperation } = useErrorHandler();

  const safeAnimate = (selector, fromProps, toProps, context = "animation") => {
    try {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`No elements found for selector: ${selector}`);
        return null;
      }

      return gsap.fromTo(elements, fromProps, toProps);
    } catch (error) {
      handleAnimationError(error, context);
      return null;
    }
  };

  const initializeLayoutAnimations = () => {
    if (!typeof window !== "undefined") return;

    try {
      // Header animation con verificación
      const header = document.querySelector(".app-header");
      if (header) {
        safeAnimate(
          ".app-header",
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          "header-animation"
        );
      }
    } catch (error) {
      handleAnimationError(error, "layout animations");
    }
  };

  const initializePageAnimations = async () => {
    if (!typeof window !== "undefined") return;

    try {
      // Usar retry para animaciones críticas
      await retryOperation(
        async () => {
          // Hero animations
          const tl = gsap.timeline();

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
              {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
              }
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

          return tl;
        },
        2,
        500
      ); // 2 reintentos con 500ms de delay

      // Section animations con manejo de errores individual
      const sectionTitles = document.querySelectorAll(".section-title");
      sectionTitles.forEach((title, index) => {
        try {
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
                onRefresh: () => {
                  // Callback para cuando ScrollTrigger se actualiza
                },
                onError: (error) => {
                  handleAnimationError(error, `section-title-${index}`);
                },
              },
            }
          );
        } catch (error) {
          handleAnimationError(error, `section-title-animation-${index}`);
        }
      });

      // Resto de animaciones con manejo similar...
      animateSkillCards();
      animateProjectCards();
      animateContactSection();
      animateTimeline();
      animateEducationCarousel();
    } catch (error) {
      handleAnimationError(error, "page animations initialization");
    }
  };

  const animateSkillCards = () => {
    try {
      const skillCards = document.querySelectorAll(".skill-card");
      skillCards.forEach((card, index) => {
        safeAnimate(
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
          },
          `skill-card-${index}`
        );
      });
    } catch (error) {
      handleAnimationError(error, "skill cards animation");
    }
  };

  const animateProjectCards = () => {
    try {
      const projectCards = document.querySelectorAll(".project-card");
      projectCards.forEach((card, index) => {
        safeAnimate(
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
          },
          `project-card-${index}`
        );
      });
    } catch (error) {
      handleAnimationError(error, "project cards animation");
    }
  };

  const animateContactSection = () => {
    try {
      const contactContent = document.querySelector(".contact-content");
      if (contactContent) {
        const contactChildren = contactContent.children;
        safeAnimate(
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
          },
          "contact-section"
        );
      }
    } catch (error) {
      handleAnimationError(error, "contact section animation");
    }
  };

  const animateTimeline = () => {
    try {
      const timelineItems = document.querySelectorAll(".timeline-item");
      timelineItems.forEach((item, index) => {
        const isRight = index % 2 === 1;

        safeAnimate(
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
          },
          `timeline-item-${index}`
        );
      });
    } catch (error) {
      handleAnimationError(error, "timeline animation");
    }
  };

  const animateEducationCarousel = () => {
    try {
      const educationCarousel = document.querySelector(".education-carousel");
      if (educationCarousel) {
        safeAnimate(
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
          },
          "education-carousel"
        );
      }
    } catch (error) {
      handleAnimationError(error, "education carousel animation");
    }
  };

  const animatePageTransition = (from, to) => {
    if (!typeof window !== "undefined") return Promise.resolve();

    return new Promise((resolve) => {
      try {
        const tl = gsap.timeline({
          onComplete: resolve,
          onError: (error) => {
            handleAnimationError(error, "page transition");
            resolve(); // Resolver de todos modos
          },
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
        handleAnimationError(error, "page transition");
        resolve();
      }
    });
  };

  return {
    initializeLayoutAnimations,
    initializePageAnimations,
    animatePageTransition,
    safeAnimate,
  };
};
