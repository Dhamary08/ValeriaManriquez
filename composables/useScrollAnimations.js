import { onMounted, onUnmounted } from "vue";

export const useScrollAnimations = () => {
  const initSmoothScroll = () => {
    if (!import.meta.client) return;

    // Simple smooth scroll implementation
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const headerHeight = 80;
          const targetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  };

  const initScrollEffects = () => {
    if (!import.meta.client) return;

    let ticking = false;

    const updateScrollEffects = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(".parallax");

      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick);

    return () => {
      window.removeEventListener("scroll", requestTick);
    };
  };

  onMounted(() => {
    initSmoothScroll();
    const cleanup = initScrollEffects();

    onUnmounted(() => {
      if (cleanup) cleanup();
    });
  });

  return {
    initSmoothScroll,
    initScrollEffects,
  };
};
