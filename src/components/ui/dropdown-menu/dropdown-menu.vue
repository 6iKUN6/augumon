<script setup lang="ts">
import { provide, ref } from 'vue';

const isOpen = ref(false);

provide('dropdown-menu-open', isOpen);
</script>

<template>
  <div class="relative">
    <slot />
  </div>
</template>
