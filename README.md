# 🚀 Portfolio Personal - Nuxt 3 + GSAP

Un sitio web de portafolio personal moderno y elegante desarrollado con **Nuxt 3**, **Vue 3** y **GSAP**, diseñado para mostrar experiencia profesional, habilidades y proyectos de manera impactante.

## ✨ Características Principales

### 🎨 **Diseño y UX**

- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Modo Oscuro/Claro**: Toggle dinámico con persistencia local
- **Animaciones Fluidas**: Implementadas con GSAP y ScrollTrigger
- **Tipografía Elegante**: Google Fonts (Inter + Playfair Display)
- **Paleta de Colores Moderna**: Variables CSS personalizables

### 🛠️ **Tecnologías**

- **Framework**: Nuxt 3 (Vue 3 + Composition API)
- **Estilos**: SCSS modular con arquitectura escalable
- **Animaciones**: GSAP + ScrollTrigger
- **Iconos**: Lucide Vue Next
- **SEO**: Meta tags optimizados y sitemap automático

### 📱 **Secciones**

- **Hero**: Presentación impactante con elementos flotantes animados
- **Quién Soy**: Información personal con grid de habilidades
- **Experiencia**: Timeline interactivo con animaciones GSAP
- **Educación**: Carrusel animado con autoplay
- **Proyectos**: Grid de proyectos con hover effects
- **Contacto**: Formulario funcional con validación

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18.0.0 o superior
- npm, yarn, pnpm o bun

### Instalación

\`\`\`bash

# Clonar el repositorio

git clone https://github.com/Dhamary08/ValeriaManriquez.git
cd portfolio-nuxt

# Instalar dependencias

npm install

# o

yarn install

# o

pnpm install
\`\`\`

### Variables de Entorno

Crear archivo `.env` en la raíz:

\`\`\`env

# .env

NUXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

Para producción:
\`\`\`env

# .env.production

NUXT_PUBLIC_SITE_URL=https://valeriamanriquez.cl
\`\`\`

### Comandos Disponibles

\`\`\`bash

# Desarrollo

npm run dev

# Construcción para producción

npm run build

# Vista previa de producción

npm run preview

# Generar sitio estático

npm run generate

# Linting

npm run lint

# Formatear código

npm run format
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
portfolio-nuxt/
├── 📁 assets/
│ └── 📁 scss/
│ ├── main.scss # Archivo principal de estilos
│ ├── 📁 abstracts/
│ │ ├── \_variables.scss # Variables CSS y SCSS
│ │ └── \_mixins.scss # Mixins reutilizables
│ ├── 📁 base/
│ │ ├── \_reset.scss # Reset CSS
│ │ └── \_typography.scss # Tipografía base
│ ├── 📁 components/
│ │ ├── \_button.scss # Estilos de botones
│ │ └── \_header.scss # Estilos del header
│ ├── 📁 layout/
│ │ ├── \_container.scss # Contenedores
│ │ └── \_grid.scss # Sistema de grid
│ ├── 📁 pages/
│ │ └── \_home.scss # Estilos de la página principal
│ └── 📁 themes/
│ ├── \_light.scss # Tema claro
│ └── \_dark.scss # Tema oscuro
├── 📁 components/
│ ├── AppHeader.vue # Header principal
│ ├── AppFooter.vue # Footer
│ ├── BaseButton.vue # Componente de botón reutilizable
│ ├── ThemeToggle.vue # Toggle de tema
│ ├── SectionTitle.vue # Títulos de sección
│ ├── SkillCard.vue # Tarjetas de habilidades
│ ├── ProjectCard.vue # Tarjetas de proyectos
│ ├── ExperienceTimeline.vue # Timeline de experiencia
│ ├── EducationCarousel.vue # Carrusel de educación
│ ├── ContactForm.vue # Formulario de contacto
│ ├── ContactInfo.vue # Información de contacto
│ └── Icon.vue # Componente de iconos
├── 📁 composables/
│ ├── useTheme.js # Lógica del tema
│ ├── useGsapAnimations.js # Animaciones GSAP
│ └── useScrollAnimations.js # Animaciones de scroll
├── 📁 layouts/
│ └── default.vue # Layout principal
├── 📁 pages/
│ └── index.vue # Página principal
├── 📁 public/
│ └── favicon.ico # Favicon
├── app.vue # Componente raíz
├── nuxt.config.ts # Configuración de Nuxt
└── package.json # Dependencias del proyecto
\`\`\`

## 🎨 Personalización

### Colores y Tema

Editar `assets/scss/abstracts/_variables.scss`:

\`\`\`scss
:root {
--accent-color: #3b82f6; // Color principal
--accent-secondary: #1d4ed8; // Color secundario
--bg-primary: #ffffff; // Fondo principal
--text-primary: #1e293b; // Texto principal
// ... más variables
}
\`\`\`

### Contenido Personal

#### 1. Información Personal

Editar `pages/index.vue`:
\`\`\`javascript
// Cambiar nombre y descripción
const heroTitle = "Tu Nombre"
const heroSubtitle = "Tu descripción profesional"
\`\`\`

#### 2. Habilidades

\`\`\`javascript
const skills = ref([
{ name: 'Tu Skill', level: 90, icon: 'icon-name' },
// ... más habilidades
])
\`\`\`

#### 3. Experiencia Laboral

Editar `components/ExperienceTimeline.vue`:
\`\`\`javascript
const experiences = ref([
{
position: 'Tu Posición',
company: 'Tu Empresa',
period: '2020 - Presente',
description: 'Descripción de tu rol...',
// ... más detalles
}
])
\`\`\`

#### 4. Educación

Editar `components/EducationCarousel.vue`:
\`\`\`javascript
const educations = ref([
{
degree: 'Tu Título',
institution: 'Tu Institución',
period: '2015 - 2019',
// ... más detalles
}
])
\`\`\`

#### 5. Proyectos

\`\`\`javascript
const projects = ref([
{
title: 'Nombre del Proyecto',
description: 'Descripción...',
technologies: ['Tech1', 'Tech2'],
demoUrl: 'https://demo.com',
codeUrl: 'https://github.com/...'
}
])
\`\`\`

### Agregar Nuevas Secciones

1. **Crear componente**:
   \`\`\`vue
   <!-- components/NuevaSeccion.vue -->
   <template>
     <section class="nueva-seccion">
       <!-- Contenido -->
     </section>
   </template>
   \`\`\`

2. **Agregar a la página principal**:
   \`\`\`vue
   <!-- pages/index.vue -->
   <NuevaSeccion />
   \`\`\`

3. **Actualizar navegación**:
   \`\`\`vue
   <!-- components/AppHeader.vue -->
   <a href="#nueva-seccion" class="nav-link">Nueva Sección</a>
   \`\`\`

## 🎭 Animaciones GSAP

### Configuración Básica

Las animaciones están centralizadas en `composables/useGsapAnimations.js`:

\`\`\`javascript
// Ejemplo de animación personalizada
const animateElement = () => {
gsap.fromTo('.mi-elemento',
{ opacity: 0, y: 50 },
{
opacity: 1,
y: 0,
duration: 1,
scrollTrigger: {
trigger: '.mi-elemento',
start: 'top 80%'
}
}
)
}
\`\`\`

### Tipos de Animaciones Incluidas

- **Entrada de elementos**: Fade in + slide up
- **Timeline**: Línea progresiva + elementos alternados
- **Carrusel**: Transiciones suaves entre slides
- **Hover effects**: Transformaciones en hover
- **Scroll animations**: Activadas por scroll

## 🌐 Despliegue

### Vercel (Recomendado)

1. **Conectar repositorio** a Vercel
2. **Configurar variables de entorno**:
   \`\`\`
   NUXT_PUBLIC_SITE_URL=https://valeriamanriquez.cl
   \`\`\`
3. **Deploy automático** en cada push

### Netlify

\`\`\`toml

# netlify.toml

[build]
command = "npm run generate"
publish = "dist"

[[headers]]
for = "/\*"
[headers.values]
X-Frame-Options = "DENY"
X-XSS-Protection = "1; mode=block"
\`\`\`

### Otros Proveedores

El proyecto es compatible con:

- **GitHub Pages** (con GitHub Actions)
- **Firebase Hosting**
- **AWS S3 + CloudFront**
- **DigitalOcean App Platform**

## 🔧 Configuración Avanzada

### TypeScript (Opcional)

\`\`\`bash

# Instalar TypeScript

npm install -D typescript @nuxt/typescript-build

# Renombrar archivos .js a .ts

# Actualizar nuxt.config.ts

\`\`\`

### ESLint + Prettier

\`\`\`bash

# Instalar herramientas de desarrollo

npm install -D eslint prettier @nuxtjs/eslint-config-typescript

# Crear .eslintrc.js y .prettierrc

\`\`\`

### Análisis de Bundle

\`\`\`bash

# Analizar el bundle

npm run build -- --analyze
\`\`\`

## 📊 Performance

### Optimizaciones Incluidas

- **Lazy Loading**: Imágenes y componentes
- **Code Splitting**: Automático con Nuxt
- **Minificación**: CSS y JS optimizados
- **Compresión**: Gzip habilitado
- **Caché**: Headers de caché configurados

### Métricas Objetivo

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🐛 Solución de Problemas

### Errores Comunes

#### GSAP no funciona

\`\`\`bash

# Reinstalar GSAP

npm uninstall gsap
npm install gsap
\`\`\`

#### SCSS no compila

\`\`\`bash

# Verificar instalación de Sass

npm install -D sass
\`\`\`

#### Componentes no se auto-importan

\`\`\`typescript
// nuxt.config.ts
export default defineNuxtConfig({
components: [
{
path: '~/components',
pathPrefix: false,
},
],
})
\`\`\`

#### Problemas de hidratación

\`\`\`vue

<!-- Usar ClientOnly para componentes problemáticos -->
<ClientOnly>
  <ComponenteProblematico />
</ClientOnly>
\`\`\`

### Debug Mode

\`\`\`bash

# Ejecutar en modo debug

DEBUG=nuxt:\* npm run dev
\`\`\`

## 🤝 Contribución

### Cómo Contribuir

1. **Fork** el repositorio
2. **Crear** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abrir** un Pull Request

### Estándares de Código

- **Vue 3 Composition API**
- **ESLint + Prettier** para formateo
- **Conventional Commits** para mensajes
- **SCSS** con metodología BEM
- **Componentes reutilizables**

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Nuxt Team** por el increíble framework
- **GreenSock** por las animaciones GSAP
- **Lucide** por los iconos
- **Google Fonts** por las tipografías

## 📞 Contacto

**Tu Nombre** - Valeria Manriquez

**Link del Proyecto**: [https://github.com/Dhamary08/ValeriaManriquez](https://github.com/Dhamary08/ValeriaManriquez)

**Demo en Vivo**: [https://valeriamanriquez.cl](https://valeriamanriquez.cl)

---

⭐ **¡No olvides dar una estrella al proyecto si te ha sido útil!** ⭐
