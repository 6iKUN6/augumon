<template>
  <TooltipProvider>
    <div class="min-h-screen bg-background w-full flex relative">
      <!-- 侧边栏 -->
      <LayoutSider
        :menu-items="siderMenuItems"
        :active-index="activeSiderIndex"
        :collapsed="sidebarCollapsed"
        @select-item="handleSiderSelect"
        @toggle-collapse="handleToggleCollapse"
      />

      <!-- 主内容区域 -->
      <div class="flex-1 min-w-0 flex flex-col h-screen">
        <!-- Header -->
        <LayoutHeader
          :sidebar-collapsed="sidebarCollapsed"
          @toggle-sidebar="handleToggleCollapse"
        />

        <!-- 主要内容区域 -->
        <main class="flex-1 overflow-auto bg-background">
          <slot />
        </main>
      </div>
    </div>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Home, User, Search, HelpCircle, Database } from 'lucide-vue-next';
import { TooltipProvider } from '@/components/ui/tooltip';
import LayoutHeader from './header.vue';
import LayoutSider from './sider.vue';

const activeSiderIndex = ref<number>(0);
const sidebarCollapsed = ref<boolean>(false);

// 切换侧边栏收起状态
const handleToggleCollapse = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

// 监听侧边栏状态变化 - 仅在客户端
if (import.meta.client) {
  watch(
    () => sidebarCollapsed.value,
    (newValue) => {
      console.log('侧边栏状态:', newValue ? '收起' : '展开');
    }
  );
}

// 侧边栏菜单项
const siderMenuItems = ref([
  {
    title: '主页',
    icon: Home,
  },
  {
    title: '我的空间',
    icon: User,
  },
  {
    title: '发现设计',
    icon: Search,
  },
  {
    title: '支持中心',
    icon: HelpCircle,
  },
  {
    title: '材料参数库',
    icon: Database,
  },
]);

const handleSiderSelect = (index: number) => {
  activeSiderIndex.value = index;
  // 路由跳转逻辑
  const routes = ['/home', '/my-space', '/design-find', '/support', '/materials'];
  if (routes[index]) {
    navigateTo(routes[index]);
  }
};
</script>
