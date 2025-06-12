import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (!import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGsapAnimations = () => {
  const initializeLayoutAnimations = () => {
    if (!import.meta.client) return;

    // Header animation
    gsap.fromTo(
      ".app-header",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  };

  const initializePageAnimations = () => {
    if (!import.meta.client) return;

    // Hero animations
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-title .line",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" }
    )
      .fromTo(
        ".hero-subtitle",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        ".hero-cta",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
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

    // Section animations with ScrollTrigger
    gsap.utils.toArray(".section-title").forEach((title) => {
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
    gsap.utils.toArray(".skill-card").forEach((card, index) => {
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
    gsap.utils.toArray(".project-card").forEach((card, index) => {
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
    gsap.fromTo(
      ".contact-content > div",
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
  };

  const animatePageTransition = (from, to) => {
    if (!import.meta.client) return Promise.resolve();

    return new Promise((resolve) => {
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
    });
  };

  return {
    initializeLayoutAnimations,
    initializePageAnimations,
    animatePageTransition,
  };
};
