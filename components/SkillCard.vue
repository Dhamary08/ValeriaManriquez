<template>
  <div class="skill-card">
    <div class="skill-icon">
      <IconImg :name="skill.icon" />
    </div>
    <div class="skill-info">
      <h4 class="skill-name">{{ skill.name }}</h4>
      <!-- <div class="skill-progress">
        <div class="skill-bar" :style="{ width: `${skill.level}%` }"></div>
      </div>
      <span class="skill-percentage">{{ skill.level }}%</span> -->
    </div>
  </div>
</template>

<script setup>
defineProps({
  skill: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.skill-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .skill-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent-color);
    border-radius: 8px;

    :deep(svg) {
      width: 20px;
      height: 20px;
      color: white;
    }
  }

  .skill-info {
    flex: 1;

    .skill-name {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .skill-progress {
      width: 100%;
      height: 6px;
      background: var(--bg-tertiary);
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 0.25rem;

      .skill-bar {
        height: 100%;
        background: linear-gradient(
          90deg,
          var(--accent-color),
          var(--accent-secondary)
        );
        border-radius: 3px;
        transition: width 1s ease;
      }
    }

    .skill-percentage {
      font-size: 0.8rem;
      color: var(--text-secondary);
      font-weight: 500;
    }
  }
}
</style>
