<template>
  <div class="contact-info">
    <h3 class="contact-title">Información de Contacto</h3>
    <p class="contact-description">
      ¿Tienes un proyecto en mente? Me encantaría escuchar sobre él y ayudarte a
      hacerlo realidad.
    </p>

    <div class="contact-items">
      <div class="contact-item">
        <div class="contact-icon">
          <IconImg name="mail" />
        </div>
        <div class="contact-details">
          <h4>Email</h4>
          <a href="mailto:valeria@dhamy.cl">valeria@dhamy.cl</a>
        </div>
      </div>

      <!--  <div class="contact-item">
        <div class="contact-icon">
          <IconImg name="phone" />
        </div>
        <div class="contact-details">
          <h4>Teléfono</h4>
          <a href="tel:+1234567890">+123 456 7890</a>
        </div>
      </div> -->

      <div class="contact-item">
        <div class="contact-icon">
          <IconImg name="map-pin" />
        </div>
        <div class="contact-details">
          <h4>Ubicación</h4>
          <span>Santiago, Chile</span>
        </div>
      </div>
    </div>

    <div class="social-links">
      <a href="https://github.com/Dhamary08" class="social-link">
        <IconImg name="github" />
      </a>
      <a
        href="https://www.linkedin.com/in/valeria-manriquez"
        class="social-link"
      >
        <IconImg name="linkedin" />
      </a>
      <a href="#" class="social-link">
        <IconImg name="mail" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-info {
  .contact-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .contact-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .contact-items {
    margin-bottom: 2rem;

    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;

      .contact-icon {
        width: 50px;
        height: 50px;
        background: var(--accent-color);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        :deep(svg) {
          width: 20px;
          height: 20px;
          color: white;
        }
      }

      .contact-details {
        h4 {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        a,
        span {
          color: var(--text-secondary);
          text-decoration: none;

          &:hover {
            color: var(--accent-color);
          }
        }
      }
    }
  }

  .social-links {
    display: flex;
    gap: 1rem;

    .social-link {
      width: 45px;
      height: 45px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        background: var(--accent-color);
        color: white;
        transform: translateY(-2px);
      }

      :deep(svg) {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
