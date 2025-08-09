<template>
  <div class="flex items-center justify-between px-5 h-[60px] bg-background border-b w-full">
    <div class="flex items-center space-x-3">
      <!-- 侧边栏控制按钮 -->
      <Button variant="ghost" size="sm" class="hover:bg-accent" @click="$emit('toggle-sidebar')">
        <Menu class="h-5 w-5" />
      </Button>
      <h1 class="text-xl font-bold">
        <span class="text-[#00B42A]">Y</span><span class="text-foreground">RC6</span>
      </h1>
    </div>

    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <FolderOpen class="mr-2 h-4 w-4" />
          打开本地项目
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              <Plus class="mr-2 h-4 w-4" />
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
import { Plus, FolderOpen, Menu } from 'lucide-vue-next';

// 定义 Props
interface Props {
  sidebarCollapsed?: boolean;
}

withDefaults(defineProps<Props>(), {
  sidebarCollapsed: false,
});

// 定义 emits
defineEmits(['toggle-sidebar']);

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
