<template>
  <div class="skeleton-loader" :class="variant">
    <div v-if="variant === 'card'" class="skeleton-card">
      <div class="skeleton-image"></div>
      <div class="skeleton-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text short"></div>
      </div>
    </div>

    <div v-else-if="variant === 'timeline'" class="skeleton-timeline">
      <div class="skeleton-dot"></div>
      <div class="skeleton-timeline-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
      </div>
    </div>

    <div v-else class="skeleton-default">
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "card", "timeline"].includes(value),
  },
});
</script>

<style lang="scss" scoped>
.skeleton-loader {
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  .skeleton-element {
    background: linear-gradient(
      90deg,
      var(--bg-tertiary) 25%,
      var(--bg-secondary) 37%,
      var(--bg-tertiary) 63%
    );
    background-size: 400px 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    border-radius: 4px;
  }

  .skeleton-card {
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;

    .skeleton-image {
      @extend .skeleton-element;
      height: 200px;
      width: 100%;
    }

    .skeleton-content {
      padding: 1.5rem;

      .skeleton-title {
        @extend .skeleton-element;
        height: 24px;
        width: 70%;
        margin-bottom: 1rem;
      }

      .skeleton-text {
        @extend .skeleton-element;
        height: 16px;
        width: 100%;
        margin-bottom: 0.5rem;

        &.short {
          width: 60%;
        }
      }
    }
  }

  .skeleton-timeline {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    .skeleton-dot {
      @extend .skeleton-element;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 0.5rem;
    }

    .skeleton-timeline-content {
      flex: 1;

      .skeleton-title {
        @extend .skeleton-element;
        height: 20px;
        width: 60%;
        margin-bottom: 0.75rem;
      }

      .skeleton-text {
        @extend .skeleton-element;
        height: 14px;
        width: 100%;
        margin-bottom: 0.5rem;
      }
    }
  }

  .skeleton-default {
    .skeleton-line {
      @extend .skeleton-element;
      height: 16px;
      width: 100%;
      margin-bottom: 0.75rem;

      &.short {
        width: 70%;
      }
    }
  }
}
</style>
