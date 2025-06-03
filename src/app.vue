<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/globals.css';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();

// 初始化主题
onMounted(() => {
  themeStore.initTheme();
});
</script>
