<template>
  <aside
    class="flex flex-col h-[calc(100vh-60px)] bg-background"
    :class="[
      {
        'w-[220px]': !collapsed,
        'w-[80px]': collapsed,
        'border-r': position === 'left',
        'border-l order-3': position === 'right',
      },
    ]"
  >
    <div class="flex items-center justify-center p-4 border-b">
      <Avatar :size="64" :fallback="'登'" class="bg-muted" />
    </div>

    <div class="flex-1 overflow-y-auto p-2">
      <slot name="menu">
        <!-- 默认的菜单项 -->
        <div v-if="menuItems && menuItems.length > 0">
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="flex items-center p-3 rounded-md cursor-pointer relative mb-2 transition-colors"
            :class="{
              'bg-primary/10 text-primary': activeIndex === index,
              'hover:bg-muted': activeIndex !== index,
            }"
            @click="$emit('select-item', index)"
          >
            <div v-if="item.icon" class="text-xl mr-3">
              <component :is="item.icon"></component>
            </div>

            <div class="text-sm font-medium">
              {{ item.title }}
            </div>

            <div v-if="item.badge" class="ml-auto">
              <Badge :variant="getBadgeVariant(item.badgeColor)">
                {{ item.badge }}
              </Badge>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <div v-if="$slots.footer" class="p-4 border-t">
      <slot name="footer"></slot>
    </div>

    <div v-else class="p-4 border-t">
      <Button variant="outline" size="sm" class="w-full">
        <icon-poweroff class="mr-2 h-4 w-4" />
        前往官网
      </Button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// 定义菜单项类型
interface MenuItem {
  title: string;
  description?: string;
  avatar?: string;
  icon?: string;
  color?: string;
  badge?: string;
  badgeColor?: string;
  [key: string]: unknown;
}

const getBadgeVariant = (color?: string) => {
  switch (color) {
    case 'arcoblue':
      return 'default';
    case 'red':
      return 'destructive';
    case 'gray':
      return 'secondary';
    default:
      return 'default';
  }
};

const props = defineProps({
  title: {
    type: String,
    default: '侧边栏',
  },
  menuItems: {
    type: Array as () => MenuItem[],
    default: () => [],
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: 'left',
    validator: (value: string) => ['left', 'right'].includes(value),
  },
});

const { menuItems, activeIndex, collapsed, position } = props;

defineEmits(['update:collapsed', 'select-item', 'add-item', 'delete-item']);
</script>
