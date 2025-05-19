<template>
  <div class="min-h-screen bg-bg-1">
    <a-layout class="h-full">
      <LayoutHeader @toggle-sidebar="toggleSidebar" />
      <a-layout>
        <LayoutSider
          v-if="showSidebar"
          v-model:collapsed="siderCollapsed"
          title="功能菜单"
          :menu-items="siderMenuItems"
          :active-index="activeSiderIndex"
          :show-add-button="false"
          :show-delete-button="false"
          @select-item="handleSiderSelect"
        />
        <a-layout-content class="p-0 bg-bg-1 min-h-[calc(100vh-60px)]">
          <slot />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LayoutHeader from "./header.vue";
import LayoutSider from "./sider.vue";

const showSidebar = ref(false);
const siderCollapsed = ref(false);
const activeSiderIndex = ref(0);

// 侧边栏菜单项
const siderMenuItems = ref([
  {
    title: "首页",
    icon: "a-icon-home",
  },
  {
    title: "设计区域",
    icon: "a-icon-edit",
  },
  {
    title: "我的设计",
    icon: "a-icon-file",
  },
  {
    title: "素材库",
    icon: "a-icon-image",
  },
  {
    title: "AI助手",
    icon: "a-icon-robot",
  },
  {
    title: "设置",
    icon: "a-icon-settings",
  },
]);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const handleSiderSelect = (index: number) => {
  activeSiderIndex.value = index;
  // 这里可以添加路由跳转逻辑
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
