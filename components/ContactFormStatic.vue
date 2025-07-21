<template>
  <!-- Formulario estático para que Netlify lo detecte durante el build -->
  <form
    name="contact"
    netlify
    netlify-honeypot="bot-field"
    hidden
    action="/contact-success.html"
    method="POST"
  >
    <input type="text" name="name" />
    <input type="email" name="email" />
    <input type="text" name="subject" />
    <textarea name="message"></textarea>
    <input type="hidden" name="user-agent" />
    <input type="hidden" name="timestamp" />
    <input type="hidden" name="page-url" />
    <input type="hidden" name="bot-field" />
  </form>
</template>

<script setup>
// Este componente es solo para que Netlify detecte el formulario
// No necesita lógica JavaScript
</script>
