<template>
  <div class="flex items-center justify-between px-5 h-[60px] bg-background border-b">
    <div class="flex items-center">
      <h1 class="text-xl font-bold">
        <span class="text-[#00B42A]">Y</span><span class="text-foreground">RC6</span>
      </h1>
    </div>

    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <icon-folder-add class="mr-2 h-4 w-4" />
          打开本地项目
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              <icon-plus class="mr-2 h-4 w-4" />
              创建新项目
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Web项目</DropdownMenuItem>
            <DropdownMenuItem>移动应用</DropdownMenuItem>
            <DropdownMenuItem>空白项目</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <!-- 主题切换按钮 -->
      <ThemeToggle />

      <template v-if="authStore.isLoggedIn">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar
              class="h-8 w-8"
              :style="{ backgroundColor: '#165DFF' }"
              :fallback="authStore.userInfo?.username.charAt(0).toUpperCase()"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>个人中心</DropdownMenuItem>
            <DropdownMenuItem>我的作品</DropdownMenuItem>
            <DropdownMenuItem>账户设置</DropdownMenuItem>
            <DropdownMenuItem @click="handleLogout">退出登录</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </template>
      <template v-else>
        <Button variant="ghost" @click="openLoginModal">登录</Button>
        <Button @click="openRegisterModal">注册</Button>
      </template>
    </div>
  </div>
  <AuthManager />
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import useModalStore, { ModalState } from '../stores/modal';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from '@/components/ThemeToggle.vue';

const authStore = useAuthStore();
const modalStore = useModalStore();

const openLoginModal = () => {
  modalStore.openWhichModel(ModalState.login);
};

const openRegisterModal = () => {
  modalStore.openWhichModel(ModalState.register);
};

// 登出处理
const handleLogout = () => {
  authStore.logout();
};
</script>
