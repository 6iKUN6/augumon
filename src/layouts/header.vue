<template>
  <a-layout-header class="flex-between px-5 h-[60px] bg-bg-2 border-b border-border">
    <div class="flex items-center">
      <h1 class="text-xl font-bold">
        <span class="text-[#00B42A]">X</span><span class="text-[#333]">TOOL</span>
      </h1>
    </div>

    <div class="flex items-center">
      <a-space>
        <a-button-group>
          <a-button type="outline" size="small">
            <icon-folder-add />
            打开本地项目
          </a-button>
          <a-dropdown trigger="click">
            <a-button type="primary" size="small">
              <icon-plus />
              创建新项目
            </a-button>
            <template #content>
              <a-doption>Web项目</a-doption>
              <a-doption>移动应用</a-doption>
              <a-doption>空白项目</a-doption>
            </template>
          </a-dropdown>
        </a-button-group>
        <template v-if="authStore.isLoggedIn">
          <a-dropdown trigger="click">
            <a-avatar :style="{ backgroundColor: '#165DFF' }">
              {{ authStore.userInfo?.username.charAt(0).toUpperCase() }}
            </a-avatar>
            <template #content>
              <a-doption>个人中心</a-doption>
              <a-doption>我的作品</a-doption>
              <a-doption>账户设置</a-doption>
              <a-doption @click="handleLogout">退出登录</a-doption>
            </template>
          </a-dropdown>
        </template>
        <template v-else>
          <a-button type="text" class="btn-text" @click="openLoginModal">登录</a-button>
          <a-button type="primary" @click="openRegisterModal">注册</a-button>
        </template>
      </a-space>
    </div>
  </a-layout-header>
  <AuthManager />
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import useModalStore, { ModalState } from '../stores/modal';

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
