<script setup lang="ts">
import { inject } from 'vue';

const isOpen = inject('dropdown-menu-open') as any;

defineProps<{
  asChild?: boolean;
}>();
</script>

<template>
  <div @click="isOpen = !isOpen">
    <slot />
  </div>
</template>
