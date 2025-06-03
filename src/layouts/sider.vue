<template>
  <Sidebar :side="sidePosition" collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="(item, index) in menuItems" :key="index">
              <SidebarMenuButton
                size="lg"
                :is-active="activeIndex === index"
                :tooltip="item.title"
                class="group-data-[collapsible=icon]:justify-center"
                @click="$emit('select-item', index)"
              >
                <component :is="item.icon" v-if="item.icon" />
                <span class="group-data-[collapsible=icon]:hidden">{{ item.title }}</span>
                <SidebarMenuBadge v-if="item.badge" class="group-data-[collapsible=icon]:hidden">
                  {{ item.badge }}
                </SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <div v-if="$slots.footer" class="p-4 group-data-[collapsible=icon]:p-2">
        <slot name="footer"></slot>
      </div>
      <NavFooter />
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import type { LucideIcon } from 'lucide-vue-next';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/utils';
import NavFooter from '@/components/NavFooter.vue';

// 定义菜单项类型
interface MenuItem {
  title: string;
  description?: string;
  avatar?: string;
  icon?: LucideIcon;
  color?: string;
  badge?: string;
  badgeColor?: string;
  [key: string]: unknown;
}

// 定义 Props 接口
interface Props {
  title?: string;
  menuItems?: MenuItem[];
  activeIndex?: number;
  collapsed?: boolean;
  position?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
  title: '侧边栏',
  menuItems: () => [],
  activeIndex: 0,
  collapsed: false,
  position: 'left',
});

// 获取侧边栏状态
const { state } = useSidebar();

// 只在客户端执行 watch 来避免 SSR 错误
if (import.meta.client) {
  watch(
    () => props.collapsed,
    (n) => {
      console.log('props collapsed:', n);
    }
  );

  watch(
    () => state.value,
    (n) => {
      console.log('sidebar state:', n);
    }
  );
}

const sidePosition = computed(() => {
  return props.position as 'left' | 'right';
});

defineEmits(['update:collapsed', 'select-item', 'add-item', 'delete-item']);
</script>
