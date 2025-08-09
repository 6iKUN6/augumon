<template>
  <aside
    :class="[
      'flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out z-10',
      'h-screen sticky top-0',
      collapsed ? 'w-16' : 'w-64',
      // 移动端处理
      'md:relative md:translate-x-0',
      collapsed ? 'md:w-16' : 'md:w-64',
    ]"
  >
    <!-- 侧边栏内容 -->
    <div class="flex-1 py-4 overflow-y-auto">
      <nav class="space-y-2 px-3">
        <Tooltip v-for="(item, index) in menuItems" :key="index">
          <TooltipTrigger as-child>
            <button
              :class="[
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                'hover:bg-accent hover:text-accent-foreground',
                activeIndex === index
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground',
              ]"
              @click="$emit('select-item', index)"
            >
              <component :is="item.icon" v-if="item.icon" class="h-5 w-5 shrink-0" />
              <span v-if="!collapsed" class="transition-all duration-200">
                {{ item.title }}
              </span>
              <Badge v-if="item.badge && !collapsed" variant="secondary" class="ml-auto">
                {{ item.badge }}
              </Badge>
            </button>
          </TooltipTrigger>
          <TooltipContent v-if="collapsed" side="right" :side-offset="10">
            <p>{{ item.title }}</p>
          </TooltipContent>
        </Tooltip>
      </nav>
    </div>

    <!-- 侧边栏底部 -->
    <div class="border-t border-border mt-auto flex-shrink-0">
      <div v-if="$slots.footer" class="p-4">
        <slot name="footer"></slot>
      </div>
      <NavFooter :collapsed="collapsed" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
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
  menuItems?: MenuItem[];
  activeIndex?: number;
  collapsed?: boolean;
}

withDefaults(defineProps<Props>(), {
  menuItems: () => [],
  activeIndex: 0,
  collapsed: false,
});

defineEmits(['select-item', 'toggle-collapse']);
</script>
