<template>
  <div class="min-h-screen bg-background">
    <div class="flex flex-col h-full">
      <LayoutHeader />
      <div class="flex flex-1">
        <LayoutSider
          v-model:collapsed="siderCollapsed"
          title="登录"
          :menu-items="siderMenuItems"
          :active-index="activeSiderIndex"
          @select-item="handleSiderSelect"
        />
        <main class="flex-1 p-0 min-h-[calc(100vh-60px)]">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LayoutHeader from './header.vue';
import LayoutSider from './sider.vue';

const siderCollapsed = ref(false);
const activeSiderIndex = ref(0);

// 侧边栏菜单项
const siderMenuItems = ref([
  {
    title: '主页',
    icon: 'icon-home',
  },
  {
    title: '我的空间',
    icon: 'icon-edit',
  },
  {
    title: 'DesignFind',
    icon: 'icon-search',
  },
  {
    title: 'Support Center',
    icon: 'icon-question-circle',
  },
  {
    title: '材料参数库',
    icon: 'icon-file',
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

<style>
/* 全局样式覆盖 */
:deep(.arco-menu) {
  background-color: transparent;
}

:deep(.arco-menu-item) {
  padding: 0 20px;
}

:deep(.arco-menu-horizontal .arco-menu-item) {
  line-height: 60px;
}

:deep(a) {
  text-decoration: none;
  color: inherit;
}
</style>
