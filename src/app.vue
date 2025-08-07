<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// 确保主题样式正确应用
useHead({
  htmlAttrs: {
    class: 'min-h-screen bg-background text-foreground',
  },
  bodyAttrs: {
    class: 'min-h-screen bg-background text-foreground',
  },
});
</script>
