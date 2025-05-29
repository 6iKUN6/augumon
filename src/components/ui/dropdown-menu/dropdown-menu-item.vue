<script setup lang="ts">
import { inject } from 'vue';
// import { cn } from '@/utils/cn';

const isOpen = inject('dropdown-menu-open') as any;

const closeDropdown = () => {
  isOpen.value = false;
};
</script>

<template>
  <button
    class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
    @click="closeDropdown"
  >
    <slot />
  </button>
</template>
