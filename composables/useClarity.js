import { useRuntimeConfig } from "#app";

export const useClarity = () => {
  const config = useRuntimeConfig();

  const initClarity = () => {
    if (!process.client || !config.public.clarityProjectId) return;

    // Verificar si Clarity ya está inicializado
    if (window.clarity) {
      console.log("Clarity ya está inicializado");
      return;
    }

    // Inicializar Clarity correctamente - CORREGIDO
    window.clarity = () => {
      // Usar rest parameters en lugar de arguments
      const args = Array.from(arguments);
      (window.clarity.q = window.clarity.q || []).push(args);
    };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${config.public.clarityProjectId}`;

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  };

  const trackEvent = (eventName, eventData = {}) => {
    if (!process.client || !window.clarity) return;

    try {
      window.clarity("event", eventName, eventData);
      console.log(`Clarity event tracked: ${eventName}`, eventData);
    } catch (error) {
      console.error("Error tracking Clarity event:", error);
    }
  };

  const identifyUser = (userId, sessionData = {}) => {
    if (!process.client || !window.clarity) return;

    try {
      window.clarity("identify", userId, sessionData);
      console.log(`Clarity user identified: ${userId}`, sessionData);
    } catch (error) {
      console.error("Error identifying user in Clarity:", error);
    }
  };

  const setCustomTag = (key, value) => {
    if (!process.client || !window.clarity) return;

    try {
      window.clarity("set", key, value);
      console.log(`Clarity custom tag set: ${key} = ${value}`);
    } catch (error) {
      console.error("Error setting Clarity custom tag:", error);
    }
  };

  const upgradeSession = () => {
    if (!process.client || !window.clarity) return;

    try {
      window.clarity("upgrade");
      console.log("Clarity session upgraded");
    } catch (error) {
      console.error("Error upgrading Clarity session:", error);
    }
  };

  return {
    initClarity,
    trackEvent,
    identifyUser,
    setCustomTag,
    upgradeSession,
  };
};
