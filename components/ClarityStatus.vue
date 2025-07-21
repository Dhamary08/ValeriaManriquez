<template>
  <div v-if="showStatus" class="clarity-status">
    <div
      class="status-indicator"
      :class="{ active: isActive, error: hasError }"
    >
      <Icon name="activity" />
      <span class="status-text">
        {{ statusText }}
      </span>
      <button @click="toggleDetails" class="toggle-btn">
        <Icon :name="showDetails ? 'chevron-up' : 'chevron-down'" />
      </button>
    </div>

    <div v-if="showDetails" class="status-details">
      <div class="detail-item">
        <strong>Project ID:</strong> {{ clarityProjectId || "No configurado" }}
      </div>
      <div class="detail-item">
        <strong>Estado:</strong> {{ isActive ? "Activo" : "Inactivo" }}
      </div>
      <div class="detail-item">
        <strong>Eventos rastreados:</strong> {{ eventCount }}
      </div>
      <div class="detail-item">
        <strong>Última actividad:</strong> {{ lastActivity || "Ninguna" }}
      </div>

      <div class="actions">
        <button @click="testEvent" class="test-btn">Probar Evento</button>
        <button @click="upgradeSession" class="upgrade-btn">
          Actualizar Sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useClarity } from "~/composables/useClarity";
import { useRuntimeConfig } from "#app";

const {
  trackEvent,
  upgradeSession: clarityUpgradeSession,
  setCustomTag,
} = useClarity();
const config = useRuntimeConfig();

const showStatus = ref(false);
const showDetails = ref(false);
const isActive = ref(false);
const hasError = ref(false);
const eventCount = ref(0);
const lastActivity = ref("");

const clarityProjectId = computed(() => config.public.clarityProjectId);

const statusText = computed(() => {
  if (hasError.value) return "Error en Clarity";
  if (isActive.value) return "Clarity Activo";
  return "Clarity Inactivo";
});

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

const testEvent = () => {
  trackEvent("clarity_test_event", {
    timestamp: new Date().toISOString(),
    test_data: "Component test",
  });
  eventCount.value++;
  lastActivity.value = new Date().toLocaleTimeString();
};

const upgradeSession = () => {
  clarityUpgradeSession();
  lastActivity.value = `Session upgraded at ${new Date().toLocaleTimeString()}`;
};

onMounted(() => {
  // Solo mostrar en desarrollo o si está habilitado explícitamente
  showStatus.value =
    process.dev || config.public.clarityProjectId?.includes("debug");

  // Verificar si Clarity está activo
  const checkClarity = () => {
    if (window.clarity) {
      isActive.value = true;
      hasError.value = false;
      setCustomTag("component_status", "active");
    } else {
      isActive.value = false;
      hasError.value = !clarityProjectId.value;
    }
  };

  // Verificar inmediatamente y luego cada 5 segundos
  checkClarity();
  setInterval(checkClarity, 5000);
});
</script>

<style lang="scss" scoped>
.clarity-status {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  font-family: monospace;
  font-size: 12px;

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      border-color: #22c55e;
      background: rgba(34, 197, 94, 0.1);

      :deep(svg) {
        color: #22c55e;
      }
    }

    &.error {
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.1);

      :deep(svg) {
        color: #ef4444;
      }
    }

    .status-text {
      color: var(--text-primary);
      font-weight: 500;
    }

    .toggle-btn {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: var(--text-secondary);

      :deep(svg) {
        width: 14px;
        height: 14px;
      }
    }
  }

  .status-details {
    margin-top: 8px;
    padding: 12px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    min-width: 250px;

    .detail-item {
      margin-bottom: 8px;
      color: var(--text-secondary);

      strong {
        color: var(--text-primary);
      }
    }

    .actions {
      display: flex;
      gap: 8px;
      margin-top: 12px;

      button {
        padding: 4px 8px;
        border: 1px solid var(--border-color);
        background: var(--bg-primary);
        color: var(--text-primary);
        border-radius: 4px;
        cursor: pointer;
        font-size: 11px;

        &:hover {
          background: var(--bg-tertiary);
        }
      }
    }
  }
}
</style>
