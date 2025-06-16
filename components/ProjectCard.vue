<template>
  <div class="project-card">
    <div class="project-image">
      <img :src="project.image" :alt="project.title" />
      <div class="project-overlay">
        <div class="project-actions">
          <a :href="project.demoUrl" class="action-btn demo" target="_blank">
            <IconImg name="external-link" />
            <span>Demo</span>
          </a>
          <a :href="project.codeUrl" class="action-btn code" target="_blank">
            <IconImg name="github" />
            <span>Código</span>
          </a>
        </div>
      </div>
    </div>

    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>

      <div class="project-technologies">
        <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.project-card {
  background: var(--bg-secondary);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

    .project-overlay {
      opacity: 1;
    }
  }

  .project-image {
    position: relative;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;

      .project-actions {
        display: flex;
        gap: 1rem;

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--accent-color);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;

          &:hover {
            background: var(--accent-secondary);
            transform: translateY(-2px);
          }

          :deep(svg) {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }

  .project-content {
    padding: 1.5rem;

    .project-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }

    .project-description {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .project-technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tech-tag {
        padding: 0.25rem 0.75rem;
        background: var(--bg-tertiary);
        color: var(--accent-color);
        font-size: 0.8rem;
        font-weight: 500;
        border-radius: 20px;
        border: 1px solid var(--accent-color);
      }
    }
  }
}
</style>
