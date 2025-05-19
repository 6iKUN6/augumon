<template>
  <div>
    <LoginModal
      :visible="showLoginModal"
      @update:visible="showLoginModal = $event"
      @switch-to-register="switchToRegister"
      @login="handleLogin"
      @cancel="closeAllModals"
    />
    <RegisterModal
      :visible="showRegisterModal"
      @update:visible="showRegisterModal = $event"
      @switch-to-login="switchToLogin"
      @register="handleRegister"
      @cancel="closeAllModals"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import LoginModal from "./LoginModal.vue";
import RegisterModal from "./RegisterModal.vue";
import { useAuthStore } from "../stores/auth";

// 初始化认证状态
const authStore = useAuthStore();
onMounted(() => {
  authStore.initialize();
});

// 模态框状态
const showLoginModal = ref(false);
const showRegisterModal = ref(false);

// 打开登录模态框
const openLogin = () => {
  showRegisterModal.value = false;
  showLoginModal.value = true;
};

// 打开注册模态框
const openRegister = () => {
  showLoginModal.value = false;
  showRegisterModal.value = true;
};

// 关闭所有模态框
const closeAllModals = () => {
  showLoginModal.value = false;
  showRegisterModal.value = false;
};

// 切换至登录
const switchToLogin = () => {
  showRegisterModal.value = false;
  showLoginModal.value = true;
};

// 切换至注册
const switchToRegister = () => {
  showLoginModal.value = false;
  showRegisterModal.value = true;
};

// 处理登录提交
const handleLogin = (formData: LoginForm) => {
  const success = authStore.login(formData);
  if (success) {
    closeAllModals();
  }
};

// 处理注册提交
const handleRegister = (formData: RegisterForm) => {
  const success = authStore.register(formData);
  if (success) {
    closeAllModals();
  }
};

// 导出类型定义
interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}

// 暴露方法给父组件使用
defineExpose({
  openLogin,
  openRegister,
  closeAllModals,
});
</script>
