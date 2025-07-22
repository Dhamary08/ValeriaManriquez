import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  if (process.client) {
    // Registrar plugins de GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Configuración global de GSAP
    gsap.config({
      nullTargetWarn: false,
      trialWarn: false,
    });

    // Configuración de ScrollTrigger
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
  }
});
