<template>
  <a-modal
    :visible="visible"
    :width="450"
    :footer="false"
    unmount-on-close
    @cancel="handleCancel"
  >
    <div class="flex-col-center">
      <div class="w-full">
        <div class="text-center mb-30px">
          <h2 class="text-24px font-bold mb-8px">注册</h2>
          <p class="text-[var(--color-text-3)]">创建您的账户</p>
        </div>
        <a-form :model="form" auto-label-width>
          <a-form-item
            field="username"
            label="用户名"
            validate-trigger="blur"
            required
          >
            <a-input v-model="form.username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item
            field="email"
            label="邮箱"
            validate-trigger="blur"
            required
          >
            <a-input v-model="form.email" placeholder="请输入邮箱" />
          </a-form-item>
          <a-form-item
            field="password"
            label="密码"
            validate-trigger="blur"
            required
          >
            <a-input-password
              v-model="form.password"
              placeholder="请输入密码"
            />
          </a-form-item>
          <a-form-item
            field="confirmPassword"
            label="确认密码"
            validate-trigger="blur"
            required
          >
            <a-input-password
              v-model="form.confirmPassword"
              placeholder="请再次输入密码"
            />
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model="form.agreement">
              我已阅读并同意
              <a-link>服务条款</a-link>
              和
              <a-link>隐私政策</a-link>
            </a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" long @click="handleRegister"
              >注册</a-button
            >
          </a-form-item>
          <div class="text-center mt-16px">
            <span>已有账户? </span>
            <a-link @click="switchToLogin">登录</a-link>
          </div>
        </a-form>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const emit = defineEmits([
  "update:visible",
  "switch-to-login",
  "register",
  "cancel",
]);

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const form = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreement: false,
});

const handleRegister = () => {
  emit("register", form);
};

const handleCancel = () => {
  emit("cancel");
  emit("update:visible", false);
};

const switchToLogin = () => {
  emit("switch-to-login");
  emit("update:visible", false);
};
</script>
