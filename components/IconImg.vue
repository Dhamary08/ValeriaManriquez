<template>
  <component :is="iconComponent" v-if="iconComponent" />
  <span v-else>{{ name }}</span>
</template>

<script setup>
import { computed } from "vue";
import {
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Code,
  Database,
  Palette,
} from "lucide-vue-next";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const iconMap = {
  sun: Sun,
  moon: Moon,
  menu: Menu,
  x: X,
  "external-link": ExternalLink,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  vue: Code,
  nuxt: Code,
  javascript: Code,
  typescript: Code,
  css: Palette,
  nodejs: Database,
};

const iconComponent = computed(() => {
  return iconMap[props.name] || null;
});
</script>
