<template>
  <div>
    <LoginModal
      :visible="modalStore.login"
      @update:visible="modalStore.closeWhichModel(ModalState.login)"
      @switch-to-register="switchToRegister"
      @login="handleLogin"
      @cancel="modalStore.closeAllModel()"
    />
    <RegisterModal
      :visible="modalStore.register"
      @update:visible="modalStore.closeWhichModel(ModalState.register)"
      @switch-to-login="switchToLogin"
      @register="handleRegister"
      @cancel="modalStore.closeAllModel()"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import LoginModal from "./LoginModal.vue";
import RegisterModal from "./RegisterModal.vue";
import { useAuthStore } from "../stores/auth";
import useModalStore, { ModalState } from "../stores/modal";

// 初始化认证状态
const authStore = useAuthStore();
const modalStore = useModalStore();

onMounted(() => {
  authStore.initialize();
});

// 切换至登录
const switchToLogin = () => {
  modalStore.beOnlyOneModel("login");
};

// 切换至注册
const switchToRegister = () => {
  modalStore.beOnlyOneModel("register");
};

// 处理登录提交
const handleLogin = (formData: LoginForm) => {
  const success = authStore.login(formData);
  if (success) {
    modalStore.closeAllModel();
  }
};

// 处理注册提交
const handleRegister = (formData: RegisterForm) => {
  const success = authStore.register(formData);
  if (success) {
    modalStore.closeAllModel();
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
</script>
