import { ref, onMounted } from "vue";

export const usePerformance = () => {
  const metrics = ref({});
  const isSupported = ref(false);

  const measurePerformance = () => {
    if (!process.client) return;

    // Check if Performance API is supported
    isSupported.value =
      "performance" in window && "getEntriesByType" in performance;

    if (!isSupported.value) return;

    // Measure Core Web Vitals
    measureCLS();
    measureFID();
    measureLCP();
    measureFCP();
    measureTTFB();
  };

  const measureCLS = () => {
    if ("LayoutShift" in window) {
      let clsValue = 0;
      const clsEntries = [];

      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsEntries.push(entry);
            clsValue += entry.value;
          }
        }
        metrics.value.cls = clsValue;
      });

      observer.observe({ type: "layout-shift", buffered: true });
    }
  };

  const measureFID = () => {
    if ("PerformanceEventTiming" in window) {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.processingStart && entry.startTime) {
            metrics.value.fid = entry.processingStart - entry.startTime;
            break;
          }
        }
      });

      observer.observe({ type: "first-input", buffered: true });
    }
  };

  const measureLCP = () => {
    if ("LargestContentfulPaint" in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.value.lcp = lastEntry.startTime;
      });

      observer.observe({ type: "largest-contentful-paint", buffered: true });
    }
  };

  const measureFCP = () => {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          metrics.value.fcp = entry.startTime;
          break;
        }
      }
    });

    observer.observe({ type: "paint", buffered: true });
  };

  const measureTTFB = () => {
    const navigationEntry = performance.getEntriesByType("navigation")[0];
    if (navigationEntry) {
      metrics.value.ttfb =
        navigationEntry.responseStart - navigationEntry.requestStart;
    }
  };

  const trackCustomMetric = (name, value) => {
    metrics.value[name] = value;

    // Send to analytics
    if (window.clarity) {
      window.clarity("event", "performance_metric", {
        metric_name: name,
        metric_value: value,
      });
    }
  };

  const getPerformanceReport = () => {
    return {
      ...metrics.value,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      connection: navigator.connection
        ? {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
          }
        : null,
    };
  };

  onMounted(() => {
    measurePerformance();
  });

  return {
    metrics,
    isSupported,
    trackCustomMetric,
    getPerformanceReport,
  };
};
