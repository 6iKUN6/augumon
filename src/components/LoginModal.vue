<template>
  <a-modal :visible="visible" :width="450" :footer="false" unmount-on-close @cancel="handleCancel">
    <div class="flex-col-center">
      <div class="w-full">
        <div class="text-center mb-[30px]">
          <h2 class="text-2xl font-bold mb-2">登录</h2>
          <p class="text-subtitle">登录您的账户以继续</p>
        </div>
        <a-form :model="form" auto-label-width>
          <a-form-item field="username" label="用户名" validate-trigger="blur" required>
            <a-input v-model="form.username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item field="password" label="密码" validate-trigger="blur" required>
            <a-input-password v-model="form.password" placeholder="请输入密码" />
          </a-form-item>
          <div class="flex-between mb-6">
            <a-checkbox v-model="form.remember">记住我</a-checkbox>
            <a-link class="btn-text">忘记密码?</a-link>
          </div>
          <a-form-item>
            <a-button type="primary" long @click="handleLogin">登录</a-button>
          </a-form-item>
          <div class="text-center mt-4">
            <span class="text-subtitle">还没有账户? </span>
            <a-link class="btn-text font-medium" @click="switchToRegister">注册</a-link>
          </div>
        </a-form>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const emit = defineEmits(['update:visible', 'switch-to-register', 'login', 'cancel']);

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const form = reactive({
  username: '',
  password: '',
  remember: false,
});

const handleLogin = () => {
  emit('login', form);
};

const handleCancel = () => {
  emit('cancel');
  emit('update:visible', false);
};

const switchToRegister = () => {
  emit('switch-to-register');
  emit('update:visible', false);
};
</script>
