<template>
  <Dialog :open="visible" @update:open="(value: boolean) => $emit('update:visible', value)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle class="text-center text-2xl font-bold mb-2">登录</DialogTitle>
        <DialogDescription class="text-center text-muted-foreground">
          登录您的账户以继续
        </DialogDescription>
      </DialogHeader>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div class="space-y-2">
          <Label for="username">用户名</Label>
          <Input id="username" v-model="form.username" placeholder="请输入用户名" required />
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

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <Checkbox id="remember" v-model:checked="form.remember" />
            <Label for="remember" class="text-sm font-normal">记住我</Label>
          </div>
          <a href="#" class="text-sm text-primary hover:underline">忘记密码?</a>
        </div>

        <Button type="submit" class="w-full">登录</Button>

        <div class="text-center text-sm">
          <span>还没有账户? </span>
          <button
            type="button"
            class="text-primary hover:underline font-medium"
            @click="switchToRegister"
          >
            注册
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

const switchToRegister = () => {
  emit('switch-to-register');
  emit('update:visible', false);
};
</script>
