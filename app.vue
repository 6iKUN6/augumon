<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <NuxtRouteAnnouncer />
      <AuthManager ref="authManager" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import AuthManager from "./src/components/AuthManager.vue";

const authManager = ref<InstanceType<typeof AuthManager>>();

// 提供给全局使用的方法
provide("openLogin", () => {
  authManager.value?.openLogin();
});

provide("openRegister", () => {
  authManager.value?.openRegister();
});
</script>
