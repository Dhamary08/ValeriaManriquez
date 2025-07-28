<template>
  <div class="lazy-image-container" :class="{ loaded: isLoaded }">
    <div v-if="!isLoaded && showSkeleton" class="image-skeleton">
      <div class="skeleton-shimmer"></div>
    </div>

    <NuxtImg
      v-show="isLoaded"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :sizes="sizes"
      :quality="quality"
      :format="format"
      :loading="loading"
      :class="imageClass"
      @load="handleLoad"
      @error="handleError"
    />

    <div v-if="hasError" class="image-error">
      <IconImg name="image-off" />
      <span>Error al cargar imagen</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  width: {
    type: [Number, String],
    default: undefined,
  },
  height: {
    type: [Number, String],
    default: undefined,
  },
  sizes: {
    type: String,
    default: "100vw",
  },
  quality: {
    type: Number,
    default: 80,
  },
  format: {
    type: String,
    default: "webp",
  },
  loading: {
    type: String,
    default: "LazyImage",
  },
  showSkeleton: {
    type: Boolean,
    default: true,
  },
  imageClass: {
    type: String,
    default: "",
  },
});

const isLoaded = ref(false);
const hasError = ref(false);

const handleLoad = () => {
  isLoaded.value = true;
  hasError.value = false;
};

const handleError = () => {
  hasError.value = true;
  isLoaded.value = false;
};
</script>

<style lang="scss" scoped>
.lazy-image-container {
  position: relative;
  overflow: hidden;

  .image-skeleton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-tertiary);

    .skeleton-shimmer {
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 25%,
        rgba(255, 255, 255, 0.2) 37%,
        transparent 63%
      );
      background-size: 400px 100%;
      animation: shimmer 1.5s ease-in-out infinite;
    }
  }

  .image-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: var(--text-secondary);
    background: var(--bg-secondary);

    :deep(svg) {
      width: 48px;
      height: 48px;
      margin-bottom: 0.5rem;
      opacity: 0.5;
    }

    span {
      font-size: 0.875rem;
    }
  }

  &.loaded {
    .image-skeleton {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  }
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}
</style>
