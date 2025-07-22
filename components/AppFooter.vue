<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Portfolio</h3>
          <p class="footer-description">
            Desarrollador frontend especializado en crear experiencias web
            excepcionales.
          </p>
        </div>

        <div class="footer-section">
          <h4 class="section-title">Enlaces</h4>
          <ul class="footer-links">
            <li class="nav-item">
              <a href="#hero" class="nav-link" @click="closeMenu">Inicio</a>
            </li>
            <li class="nav-item">
              <a href="#about" class="nav-link" @click="closeMenu">Quién Soy</a>
            </li>
            <li class="nav-item">
              <a href="#experience" class="nav-link" @click="closeMenu"
                >Experiencia</a
              >
            </li>
            <li class="nav-item">
              <a href="#education" class="nav-link" @click="closeMenu"
                >Educación</a
              >
            </li>
            <li class="nav-item">
              <a href="#work" class="nav-link" @click="closeMenu">Portafolio</a>
            </li>
            <li class="nav-item">
              <a href="#contact" class="nav-link" @click="closeMenu"
                >Contacto</a
              >
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="section-title">Sígueme</h4>
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
            <a href="mailto:valeria@dhamy.cl" class="social-link">
              <IconImg name="mail" />
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          &copy; {{ currentYear }} Portfolio. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
const isMobileMenuOpen = ref(false);
const closeMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<style lang="scss" scoped>
.app-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 3rem 0 1rem;
  margin-top: 4rem;

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;

    .footer-section {
      .footer-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 1rem;
      }

      .section-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 1rem;
      }

      .footer-description {
        color: var(--text-secondary);
        line-height: 1.6;
      }

      .footer-links {
        list-style: none;

        li {
          margin-bottom: 0.5rem;

          a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
              color: var(--accent-color);
            }
          }
        }
      }

      .social-links {
        display: flex;
        gap: 1rem;

        .social-link {
          width: 40px;
          height: 40px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
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
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }

  .footer-bottom {
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
    text-align: center;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
}
</style>
