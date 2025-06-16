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
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Code,
  Database,
  Palette,
  Building,
  GraduationCap,
  Award,
  Star,
  ChevronLeft,
  ChevronRight,
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
  building: Building,
  "graduation-cap": GraduationCap,
  award: Award,
  star: Star,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
};

const iconComponent = computed(() => {
  return iconMap[props.name] || null;
});
</script>
