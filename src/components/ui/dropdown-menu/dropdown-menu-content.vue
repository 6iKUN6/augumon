<script setup lang="ts">
import { inject } from 'vue';
// import { cn } from '@/utils/cn';

const isOpen = inject('dropdown-menu-open') as any;
</script>

<template>
  <div
    v-if="isOpen"
    class="absolute right-0 top-full z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
  >
    <slot />
  </div>
</template>
