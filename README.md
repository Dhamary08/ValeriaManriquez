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
- **Formularios**: Netlify Forms integrado
- **Analytics**: Microsoft Clarity

### 📱 **Secciones**

- **Hero**: Presentación impactante con elementos flotantes animados
- **Quién Soy**: Información personal con grid de habilidades
- **Experiencia**: Timeline interactivo con animaciones GSAP
- **Educación**: Carrusel animado con autoplay
- **Proyectos**: Grid de proyectos con hover effects
- **Contacto**: Formulario funcional con Netlify Forms

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18.0.0 o superior
- npm, yarn, pnpm o bun
- Cuenta en Netlify (para formularios)

## Clonar el repositorio

git clone <https://github.com/Dhamary08/ValeriaManriquez.git>
cd portfolio-nuxt

## Instalar dependencias

```bash
 npm install
 yarn install
 pnpm install
```

### Variables de Entorno

Crear archivo `.env` en la raíz:

```env

.env

NUXT_PUBLIC_SITE_URL=<http://localhost:3000>
NUXT_CLARITY_PROJECT_ID=tu_clarity_project_id
```

Para producción:

```env

.env.production

NUXT_PUBLIC_SITE_URL=<https://tu-dominio.netlify.app>
NUXT_CLARITY_PROJECT_ID=tu_clarity_project_id
```

### Comandos Disponibles

```bash

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
```

## 📧 Configuración de Netlify Forms

### 1. Configuración Automática

El proyecto ya incluye toda la configuración necesaria para Netlify Forms:

- ✅ **Formulario estático** para detección automática
- ✅ **Configuración en netlify.toml**
- ✅ **Página de éxito personalizada**
- ✅ **Protección anti-spam**
- ✅ **Notificaciones por email**

### 2. Configurar Email de Notificaciones

Editar `netlify.toml` y cambiar:

```toml
[[forms.notifications.email]]
to = "<tu@email.com>"
```

### 3. Personalizar Página de Éxito

Editar `public/contact-success.html` para personalizar el mensaje de confirmación.

### 4. Funcionalidades Incluidas

#### Campos del Formulario

- **Nombre** (requerido)
- **Email** (requerido, validación)
- **Asunto** (requerido)
- **Mensaje** (requerido)
- **Campos ocultos**: User-Agent, Timestamp, URL

#### Protección Anti-Spam

- **Honeypot field** para detectar bots
- **Validación del lado cliente**
- **Rate limiting** de Netlify

#### Tracking y Analytics

- **Microsoft Clarity** integrado
- **Eventos personalizados** para formulario
- **Métricas de conversión**

### 5. Testing del Formulario

#### En Desarrollo

```bash

# El formulario funcionará localmente pero no enviará emails

npm run dev
```

#### En Producción

1. **Deploy a Netlify**
2. **Verificar en Dashboard** → Site settings → Forms
3. **Probar envío** desde el sitio en vivo
4. **Revisar notificaciones** en tu email

## 🌐 Despliegue en Netlify

### Método 1: Drag & Drop

1. **Generar sitio estático**:

   ```bash
   npm run generate
   ```

2. **Arrastrar carpeta `dist`** al dashboard de Netlify

### Método 2: Git Integration (Recomendado)

1. **Conectar repositorio** en Netlify
2. **Configurar build settings**:
   - Build command: `npm run generate`
   - Publish directory: `dist`
3. **Agregar variables de entorno**:
   - `NUXT_PUBLIC_SITE_URL`
   - `NUXT_CLARITY_PROJECT_ID`

### Método 3: Netlify CLI

```bash

# Instalar Netlify CLI

npm install -g netlify-cli

# Login

netlify login

# Deploy

netlify deploy --prod --dir=dist
```

## 📊 Monitoreo y Analytics

### Microsoft Clarity

- **Mapas de calor** automáticos
- **Grabaciones de sesión**
- **Métricas de comportamiento**
- **Eventos personalizados** del formulario

### Netlify Analytics

- **Submissions del formulario** en dashboard
- **Estadísticas de spam** bloqueado
- **Métricas de entrega** de emails

## 🔧 Personalización del Formulario

### Agregar Campos Adicionales

1. **Actualizar ContactForm.vue**

```vue
<input
  v-model="form.telefono"
  name="telefono"
  type="tel"
  placeholder="Tu teléfono"
/>
```

2. **Actualizar ContactFormStatic.vue**

```vue
<input type="tel" name="telefono" />
```

3. **Actualizar netlify.toml**

```toml
template = """
Teléfono: {{ telefono }}
"""
```

### Configurar reCAPTCHA (Opcional)

1. **Obtener keys** de Google reCAPTCHA
2. **Actualizar netlify.toml**:

```toml
[[forms.spam_protection]]
recaptcha = true
```

3. **Agregar al formulario**:

```vue
<div class="g-recaptcha" data-sitekey="tu-site-key"></div>
```

## 🐛 Solución de Problemas

### Formulario No Funciona

#### 1. Verificar Detección

- ✅ Formulario estático incluido en build
- ✅ Atributos `name` y `data-netlify` correctos
- ✅ Deploy exitoso en Netlify

#### 2. Verificar en Dashboard

- Ir a **Site settings** → **Forms**
- Verificar que aparezca el formulario "contact"
- Revisar submissions recientes

#### 3. Errores Comunes

```bash

# Error: Form not found

# Solución: Verificar que ContactFormStatic esté incluido

# Error: 404 en submission

# Solución: Verificar action="/contact-success.html"

# Error: No email notifications

# Solución: Verificar configuración en netlify.toml

```

### Debug Mode

```javascript
// Agregar en ContactForm.vue para debug
console.log("Form data:", formData);
console.log("Response:", response);
```

## 📞 Soporte

Si tienes problemas con la configuración:

1. **Revisar documentación** de [Netlify Forms](https://docs.netlify.com/forms/setup/)
2. **Verificar logs** en Netlify Dashboard
3. **Contactar soporte** de Netlify si es necesario

---

⭐ **¡El formulario está listo para recibir mensajes!** ⭐

📁 Estructura del Proyecto

```bash
portfolio-nuxt/
├── 📁 assets/
│ └── 📁 scss/
│ ├── main.scss # Archivo principal de estilos
│ ├── 📁 abstracts/
│ │ ├── \_variables.scss # Variables CSS y SCSS
│ │ └──_mixins.scss # Mixins reutilizables
│ ├── 📁 base/
│ │ ├── \_reset.scss # Reset CSS
│ │ └──_typography.scss # Tipografía base
│ ├── 📁 components/
│ │ ├── \_button.scss # Estilos de botones
│ │ └──_header.scss # Estilos del header
│ ├── 📁 layout/
│ │ ├── \_container.scss # Contenedores
│ │ └──_grid.scss # Sistema de grid
│ ├── 📁 pages/
│ │ └── \_home.scss # Estilos de la página principal
│ └── 📁 themes/
│ ├──_light.scss # Tema claro
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
│ ├── favicon.ico # Favicon
│ └── contact-success.html # Página de éxito del formulario
├── app.vue # Componente raíz
├── nuxt.config.ts # Configuración de Nuxt
└── package.json # Dependencias del proyecto
```

## 🎨 Personalización

### Colores y Tema

Editar `assets/scss/abstracts/_variables.scss`:

```scss
:root {
--accent-color: #3b82f6; // Color principal
--accent-secondary: #1d4ed8; // Color secundario
--bg-primary: #ffffff; // Fondo principal
--text-primary: #1e293b; // Texto principal
...
}
```

### Contenido Personal

#### 1. Información Personal

Editar `pages/index.vue`:

```javascript
// Cambiar nombre y descripción
const heroTitle = "Tu Nombre";
const heroSubtitle = "Tu descripción profesional";
```

#### 2. Habilidades

```javascript
const skills = ref([
  { name: "Tu Skill", level: 90, icon: "icon-name" },
  // ... más habilidades
]);
```

#### 3. Experiencia Laboral

Editar `components/ExperienceTimeline.vue`:

```javascript
const experiences = ref([
  {
    position: "Tu Posición",
    company: "Tu Empresa",
    period: "2020 - Presente",
    description: "Descripción de tu rol...",
    // ... más detalles
  },
]);
```

#### 4. Educación

Editar `components/EducationCarousel.vue`:

```javascript
const educations = ref([
  {
    degree: "Tu Título",
    institution: "Tu Institución",
    period: "2015 - 2019",
    // ... más detalles
  },
]);
```

#### 5. Proyectos

```javascript
const projects = ref([
  {
    title: "Nombre del Proyecto",
    description: "Descripción...",
    technologies: ["Tech1", "Tech2"],
    demoUrl: "https://demo.com",
    codeUrl: "https://github.com/...",
  },
]);
```

### Agregar Nuevas Secciones

1. **Crear componente**:

   ```vue
   <!-- components/NuevaSeccion.vue -->
   <template>
     <section class="nueva-seccion">
       <!-- Contenido -->
     </section>
   </template>
   ```

2. **Agregar a la página principal**:

   ```vue
   <!-- pages/index.vue -->
   <NuevaSeccion />
   ```

3. **Actualizar navegación**:

   ```vue
   <!-- components/AppHeader.vue -->
   <a href="#nueva-seccion" class="nav-link">Nueva Sección</a>
   ```

## 🎭 Animaciones GSAP

### Configuración Básica

Las animaciones están centralizadas en `composables/useGsapAnimations.js`:

```javascript
// Ejemplo de animación personalizada
const animateElement = () => {
  gsap.fromTo(
    ".mi-elemento",
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".mi-elemento",
        start: "top 80%",
      },
    }
  );
};
```

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

```bash
NUXT_PUBLIC_SITE_URL=<https://yoursite/>
```

3. **Deploy automático** en cada push

### Netlify

```toml

# netlify.toml

[build]
command = "npm run generate"
publish = "dist"

[[headers]]
for = "/\*"
[headers.values]
X-Frame-Options = "DENY"
X-XSS-Protection = "1; mode=block"
```

### Otros Proveedores

El proyecto es compatible con:

- **GitHub Pages** (con GitHub Actions)
- **Firebase Hosting**
- **AWS S3 + CloudFront**
- **DigitalOcean App Platform**

## 🔧 Configuración Avanzada

### TypeScript (Opcional)

```bash

# Instalar TypeScript

npm install -D typescript @nuxt/typescript-build

# Renombrar archivos .js a .ts

# Actualizar nuxt.config.ts

```

### ESLint + Prettier

```bash

# Instalar herramientas de desarrollo

npm install -D eslint prettier @nuxtjs/eslint-config-typescript

# Crear .eslintrc.js y .prettierrc

```

### Análisis de Bundle

```bash

# Analizar el bundle

npm run build -- --analyze
```

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

```bash

# Reinstalar GSAP

npm uninstall gsap
npm install gsap
```

#### SCSS no compila

```bash

# Verificar instalación de Sass

npm install -D sass
```

#### Componentes no se auto-importan

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
```

#### Problemas de hidratación

```vue
<!-- Usar ClientOnly para componentes problemáticos -->
<ClientOnly>
  <ComponenteProblematico />
</ClientOnly>
```

### Debug Mode

```bash

# Ejecutar en modo debug

DEBUG=nuxt:\* npm run dev

```

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
- **Netlify** por el formulario y el despliegue
- **Microsoft Clarity** por el análisis de comportamiento

## 📞 Contacto

**Valeria Manríquez**

**Link del Proyecto**: [https://github.com/Dhamary08/ValeriaManriquez](https://github.com/Dhamary08/ValeriaManriquez)

**Demo en Vivo**: [https://valeriamanriquez.cl/](https://valeriamanriquez.cl/)

---

⭐ **¡No olvides dar una estrella al proyecto si te ha sido útil!** ⭐
