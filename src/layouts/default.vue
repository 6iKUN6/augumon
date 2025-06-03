<template>
  <div class="min-h-screen bg-background w-full">
    <SidebarProvider class="w-full">
      <div class="flex min-h-screen w-full">
        <LayoutSider
          title="登录"
          :menu-items="siderMenuItems"
          :active-index="activeSiderIndex"
          @select-item="handleSiderSelect"
        />
        <SidebarInset class="flex-1 w-full min-w-0">
          <div class="flex flex-col min-h-screen w-full">
            <!-- Header 在 SidebarInset 内部 -->
            <LayoutHeader />
            <!-- 主要内容区域 -->
            <main class="flex-1 w-full min-h-[calc(100vh-60px)] overflow-x-auto">
              <slot />
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Home, User, Search, HelpCircle, Database } from 'lucide-vue-next';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import LayoutHeader from './header.vue';
import LayoutSider from './sider.vue';

const activeSiderIndex = ref<number>(0);
// const collapsed = ref<boolean>(false);

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

<!-- <style>
/* 移除 Arco Design 相关样式 */
:deep(a) {
  text-decoration: none;
  color: inherit;
}

/* Sidebar CSS 变量 */
:root {
  --sidebar-width: 16rem;
  --sidebar-width-icon: 3rem;
}

/* 确保全宽布局 */
.min-h-screen {
  width: 100%;
}

/* 确保 SidebarInset 占满剩余空间 */
:deep([data-sidebar='inset']) {
  flex: 1;
  width: 100%;
  max-width: 100%;
}

/* 优化sidebar折叠状态样式 */
:deep([data-sidebar='sidebar']) {
  transition: width 0.2s ease-linear;
}
</style> -->
