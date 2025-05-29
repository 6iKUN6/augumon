<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import '@/assets/global.css';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();

// 监听主题变化并应用到 document.documentElement
watch(
  () => themeStore.isDark,
  (isDark) => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', isDark);
    }
  },
  { immediate: true }
);

// 为了测试方便，在 window 上注册切换主题的方法
onMounted(() => {
  (window as any)._changeTheme = () => themeStore.toggleTheme();
});
</script>
