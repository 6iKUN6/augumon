<script setup lang="ts">
import { computed, inject } from 'vue';
import { cn } from '@/utils/cn';

interface Props {
  value: string;
}

const props = defineProps<Props>();
const tabsValue = inject('tabs-value') as any;

const isSelected = computed(() => tabsValue.value === props.value);
</script>

<template>
  <div
    role="tabpanel"
    :data-state="isSelected ? 'active' : 'inactive'"
    :class="
      cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        !isSelected && 'hidden'
      )
    "
  >
    <slot />
  </div>
</template>
