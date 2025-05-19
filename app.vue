<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <NuxtRouteAnnouncer />
      <AuthManager />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import AuthManager from "./src/components/AuthManager.vue";
</script>
