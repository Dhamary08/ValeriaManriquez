<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="count++">click +</button>
    <button type="button" @click="count--">click -</button>
    <h3>{{ count }}</h3>
  </div>
</template>
