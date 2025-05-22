<template>
  <a-layout-sider
    :width="Number(width)"
    :collapsed="collapsed"
    :collapsible="collapsible"
    breakpoint="md"
    class="bg-white border-r border-[var(--color-border)] flex flex-col h-[calc(100vh-60px)]"
    :class="{
      'border-r border-[var(--color-border)]': position === 'left',
      'border-l border-[var(--color-border)]': position === 'right',
    }"
    :style="{ order: position === 'right' ? 3 : 0 }"
    @collapse="$emit('update:collapsed', $event)"
  >
    <div class="flex items-center justify-center p-4 border-b border-[var(--color-border)]">
      <a-avatar :size="64" class="bg-gray-200">
        <span class="text-gray-400">登录</span>
      </a-avatar>
    </div>

    <div class="flex-1 overflow-y-auto p-2">
      <slot name="menu">
        <!-- 默认的菜单项 -->
        <div v-if="menuItems && menuItems.length > 0">
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="flex items-center p-3 rounded-md cursor-pointer relative hover:bg-[var(--color-fill-2)] mb-2"
            :class="{
              'bg-[var(--color-primary-light-1)] text-[var(--color-primary)]':
                activeIndex === index,
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
              <a-tag :color="item.badgeColor || 'arcoblue'" size="small">{{ item.badge }}</a-tag>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <div v-if="$slots.footer" class="p-4 border-t border-[var(--color-border)]">
      <slot name="footer"></slot>
    </div>

    <div v-else class="p-4 border-t border-[var(--color-border)]">
      <a-button block type="outline" size="small">
        <template #icon><icon-poweroff /></template>
        前往官网
      </a-button>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
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
  collapsible: {
    type: Boolean,
    default: true,
  },
  width: {
    type: [Number, String],
    default: 220,
  },
  position: {
    type: String,
    default: 'left',
    validator: (value: string) => ['left', 'right'].includes(value),
  },
  showAddButton: {
    type: Boolean,
    default: true,
  },
  showDeleteButton: {
    type: Boolean,
    default: true,
  },
  showDefaultFooter: {
    type: Boolean,
    default: false,
  },
});

// 只保留实际使用的props变量
const { menuItems, activeIndex, collapsed, collapsible, width, position } = props;

defineEmits(['update:collapsed', 'select-item', 'add-item', 'delete-item']);
</script>
