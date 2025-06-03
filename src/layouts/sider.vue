<template>
  <Sidebar :side="sidePosition" collapsible="icon" class="border-r">
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="(item, index) in menuItems" :key="index">
            <SidebarMenuButton
              size="lg"
              :is-active="activeIndex === index"
              :tooltip="item.title"
              @click="$emit('select-item', index)"
            >
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
              <!-- <ChevronRight
                class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              /> -->
              <SidebarMenuBadge v-if="item.badge">
                {{ item.badge }}
              </SidebarMenuBadge>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <div v-if="$slots.footer" class="p-4 group-data-[collapsible=icon]:p-2">
        <slot name="footer"></slot>
      </div>
      <!-- <div v-else class="p-4 group-data-[collapsible=icon]:p-2">
        <Button
          variant="outline"
          size="sm"
          class="sidebar-footer-btn w-full h-10"
          :title="'前往官网'"
        >
          <icon-poweroff class="footer-icon size-4 flex-shrink-0" />
          <span class="footer-text">前往官网</span>
        </Button>
      </div> -->
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { LucideIcon } from 'lucide-vue-next';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  // SidebarHeader
} from '@/components/ui/sidebar';
// import { Button } from '@/components/ui/button';

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

const sidePosition = computed(() => {
  return props.position as 'left' | 'right';
});

defineEmits(['update:collapsed', 'select-item', 'add-item', 'delete-item']);
</script>
