<template>
  <Dialog :open="visible" @update:open="(value: boolean) => $emit('update:visible', value)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle class="text-center text-2xl font-bold mb-2">注册</DialogTitle>
        <DialogDescription class="text-center text-muted-foreground">
          创建您的账户
        </DialogDescription>
      </DialogHeader>

      <form class="space-y-4" @submit.prevent="handleRegister">
        <div class="space-y-2">
          <Label for="username">用户名</Label>
          <Input id="username" v-model="form.username" placeholder="请输入用户名" required />
        </div>

        <div class="space-y-2">
          <Label for="email">邮箱</Label>
          <Input id="email" v-model="form.email" type="email" placeholder="请输入邮箱" required />
        </div>

        <div class="space-y-2">
          <Label for="password">密码</Label>
          <Input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </div>

        <div class="space-y-2">
          <Label for="confirmPassword">确认密码</Label>
          <Input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            required
          />
        </div>

        <div class="flex items-center space-x-2">
          <Checkbox id="agreement" v-model:checked="form.agreement" />
          <Label for="agreement" class="text-sm font-normal">
            我已阅读并同意
            <a href="#" class="text-primary hover:underline">服务条款</a>
            和
            <a href="#" class="text-primary hover:underline">隐私政策</a>
          </Label>
        </div>

        <Button type="submit" class="w-full">注册</Button>

        <div class="text-center text-sm">
          <span>已有账户? </span>
          <button class="text-primary hover:underline" type="button" @click="switchToLogin">
            登录
          </button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const emit = defineEmits(['update:visible', 'switch-to-login', 'register', 'cancel']);

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: false,
});

const handleRegister = () => {
  emit('register', form);
};

const switchToLogin = () => {
  emit('switch-to-login');
  emit('update:visible', false);
};
</script>
