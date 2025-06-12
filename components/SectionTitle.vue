<template>
  <div class="section-title">
    <p class="subtitle">{{ subtitle }}</p>
    <h2 class="title">{{ title }}</h2>
    <div class="title-decoration"></div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.section-title {
  text-align: center;
  margin-bottom: 4rem;

  .subtitle {
    color: var(--accent-color);
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
  }

  .title {
    font-family: "Playfair Display", serif;
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .title-decoration {
    width: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      var(--accent-color),
      var(--accent-secondary)
    );
    margin: 0 auto;
    border-radius: 2px;
  }
}
</style>
