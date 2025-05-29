<script setup lang="ts">
import { computed, inject } from 'vue';
import { cn } from '@/utils/cn';

interface Props {
  value: string;
  disabled?: boolean;
}

const props = defineProps<Props>();
const tabsValue = inject('tabs-value') as any;

const isSelected = computed(() => tabsValue.value === props.value);

const onClick = () => {
  if (props.disabled) return;
  tabsValue.value = props.value;
};
</script>

<template>
  <button
    role="tab"
    :disabled="disabled"
    :data-state="isSelected ? 'active' : 'inactive'"
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isSelected
          ? 'bg-background text-foreground shadow-sm'
          : 'hover:bg-muted hover:text-muted-foreground'
      )
    "
    @click="onClick"
  >
    <slot />
  </button>
</template>
