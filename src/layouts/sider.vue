<template>
  <a-layout-sider
    :width="Number(width)"
    :collapsed="collapsed"
    :collapsible="collapsible"
    breakpoint="md"
    class="bg-[var(--color-bg-2)] border-r border-[var(--color-border)] flex flex-col h-[calc(100vh-60px)]"
    :class="{
      'border-r border-[var(--color-border)]': position === 'left',
      'border-l border-[var(--color-border)]': position === 'right',
    }"
    :style="{ order: position === 'right' ? 3 : 0 }"
    @collapse="$emit('update:collapsed', $event)"
  >
    <div class="flex-between p-16px border-b border-[var(--color-border)]">
      <h2 class="m-0 text-lg truncate">{{ title }}</h2>
      <div class="flex items-center">
        <a-button
          v-if="showAddButton"
          type="outline"
          shape="circle"
          @click="$emit('add-item')"
        >
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button
          v-if="collapsible"
          type="text"
          @click="$emit('update:collapsed', !collapsed)"
        >
          <template #icon>
            <icon-menu-fold v-if="!collapsed" />
            <icon-menu-unfold v-else />
          </template>
        </a-button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-8px">
      <slot name="menu">
        <!-- 默认的菜单项 -->
        <div v-if="menuItems && menuItems.length > 0">
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="flex items-center p-12px rounded-4px cursor-pointer relative hover:bg-[var(--color-fill-2)]"
            :class="{
              'bg-[var(--color-primary-light-1)]': activeIndex === index,
            }"
            @click="$emit('select-item', index)"
          >
            <a-avatar
              v-if="item.avatar"
              :style="{ backgroundColor: item.color || '#165DFF' }"
            >
              {{ item.avatar }}
            </a-avatar>
            <div
              v-else-if="item.icon"
              class="text-xl text-[var(--color-primary)] mr-2"
            >
              <component :is="item.icon"></component>
            </div>

            <div class="ml-12px flex-1 overflow-hidden">
              <div
                class="font-500 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {{ item.title }}
              </div>
              <div
                v-if="item.description"
                class="text-xs text-[var(--color-text-3)] mt-4px"
              >
                {{ item.description }}
              </div>
            </div>

            <a-button
              v-if="showDeleteButton"
              type="text"
              shape="circle"
              class="opacity-0 transition-opacity duration-200 hover:opacity-100"
              @click.stop="$emit('delete-item', index)"
            >
              <template #icon><icon-delete /></template>
            </a-button>
          </div>
        </div>
      </slot>
    </div>

    <div
      v-if="$slots.footer"
      class="p-16px border-t border-[var(--color-border)]"
    >
      <slot name="footer"></slot>
    </div>

    <!-- 默认底部区域，如果没有提供自定义footer -->
    <div
      v-else-if="showDefaultFooter"
      class="p-16px border-t border-[var(--color-border)]"
    >
      <a-space direction="vertical" fill>
        <a-input-search placeholder="搜索..." search-button />
        <div class="flex justify-between">
          <a-button type="text">
            <template #icon><icon-settings /></template>
            设置
          </a-button>
          <a-button type="text">
            <template #icon><icon-help /></template>
            帮助
          </a-button>
        </div>
      </a-space>
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
  [key: string]: unknown;
}

const props = defineProps({
  title: {
    type: String,
    default: "侧边栏",
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
    default: 280,
  },
  position: {
    type: String,
    default: "left",
    validator: (value: string) => ["left", "right"].includes(value),
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

// 使用一下props变量，避免lint错误
const {
  title,
  menuItems,
  activeIndex,
  collapsed,
  collapsible,
  width,
  position,
  showAddButton,
  showDeleteButton,
  showDefaultFooter,
} = props;

defineEmits(["update:collapsed", "select-item", "add-item", "delete-item"]);
</script>
