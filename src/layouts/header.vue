<template>
  <a-layout-header
    class="flex-between px-5 h-[60px] bg-bg-2 border-b border-border"
  >
    <div class="flex items-center">
      <div class="cursor-pointer mr-4 md:hidden" @click="toggleSidebar">
        <a-icon-menu />
      </div>
      <h1 class="text-[#165DFF] text-xl font-bold">AI设计器</h1>
    </div>

    <div class="flex-1 hidden md:flex-center">
      <a-menu
        mode="horizontal"
        :selected-keys="[activeMenu]"
        class="bg-transparent"
      >
        <a-menu-item
          v-for="item in menuItems"
          :key="item.key"
          class="px-20px leading-[60px]"
        >
          <NuxtLink :to="item.path" class="no-underline text-inherit">
            {{ item.title }}
          </NuxtLink>
        </a-menu-item>
      </a-menu>
    </div>

    <div class="flex items-center">
      <a-space>
        <a-input-search
          v-if="showSearch"
          placeholder="搜索..."
          search-button
          class="!w-200px mr-2 lg:block hidden"
          @search="onSearch"
        />
        <a-dropdown trigger="click">
          <a-button type="text" class="flex items-center">
            <a-icon-notification class="text-lg" />
          </a-button>
          <template #content>
            <a-doption>通知1: 您有新消息</a-doption>
            <a-doption>通知2: 设计更新</a-doption>
            <a-doption>通知3: 系统公告</a-doption>
          </template>
        </a-dropdown>
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
          <a-button type="text" class="btn-text" @click="openLoginModal"
            >登录</a-button
          >
          <a-button type="primary" @click="openRegisterModal">注册</a-button>
        </template>
      </a-space>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";

const route = useRoute();
const showSearch = ref(true);
const authStore = useAuthStore();

// 使用注入的登录/注册方法
const openLogin = inject("openLogin") as (() => void) | undefined;
const openRegister = inject("openRegister") as (() => void) | undefined;

const openLoginModal = () => {
  if (openLogin) openLogin();
};

const openRegisterModal = () => {
  if (openRegister) openRegister();
};

const menuItems = [
  { key: "home", title: "首页", path: "/home" },
  { key: "designs", title: "设计广场", path: "/designs" },
  { key: "materials", title: "素材库", path: "/materials" },
  { key: "ai-assistant", title: "AI助手", path: "/ai-assistant" },
];

const activeMenu = computed(() => {
  const path = route.path;
  if (path.startsWith("/home")) return "home";
  if (path.startsWith("/designs")) return "designs";
  if (path.startsWith("/materials")) return "materials";
  if (path.startsWith("/ai-assistant")) return "ai-assistant";
  return "";
});

// 通知父组件切换侧边栏显示状态
const emit = defineEmits(["toggle-sidebar"]);
const toggleSidebar = () => {
  emit("toggle-sidebar");
};

const onSearch = (value: string) => {
  console.log("搜索:", value);
};

// 登出处理
const handleLogout = () => {
  authStore.logout();
};
</script>
