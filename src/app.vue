<template>
  <div :class="{ dark: isDark }">
    <div class="min-h-screen bg-background text-foreground">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/global.css';
import { useTheme } from '@/composables/useTheme';

const { isDark } = useTheme();
</script>
