<template>
  <div @click="handleClick">
    <Teleport to="body">
      <div class="fixed inset-0 z-40 size-fit" @click="closeMenu" @contextmenu.prevent></div>
      <div
        class="fixed z-50 min-w-56 bg-popover border border-border rounded-lg shadow-lg py-2"
        :style="{
          left: position.x + 'px',
          top: position.y + 'px',
        }"
        @click.stop
      >
        <!-- 基础编辑操作 -->
        <button
          :disabled="!hasSelection"
          class="w-full px-3 py-2 text-left text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          @click="handleCopy"
        >
          <Copy class="w-4 h-4" />
          复制
          <span class="ml-auto text-xs text-muted-foreground">Ctrl+C</span>
        </button>

        <button
          :disabled="!hasClipboard"
          class="w-full px-3 py-2 text-left text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          @click="handlePaste"
        >
          <Clipboard class="w-4 h-4" />
          粘贴
          <span class="ml-auto text-xs text-muted-foreground">Ctrl+V</span>
        </button>

        <button
          :disabled="!hasSelection"
          class="w-full px-3 py-2 text-left text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          @click="handleDuplicate"
        >
          <CopyPlus class="w-4 h-4" />
          复制副本
          <span class="ml-auto text-xs text-muted-foreground">Ctrl+D</span>
        </button>

        <div class="border-t border-border my-1"></div>

        <!-- 图层操作 -->
        <button
          :disabled="!hasSelection"
          class="w-full px-3 py-2 text-left text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          @click="handleBringForward"
        >
          <ArrowUp class="w-4 h-4" />
          上移一层
          <span class="ml-auto text-xs text-muted-foreground">Ctrl+]</span>
        </button>

        <button
          :disabled="!hasSelection"
          class="w-full px-3 py-2 text-left text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          @click="handleSendBackward"
        >
          <ArrowDown class="w-4 h-4" />
          下移一层
          <span class="ml-auto text-xs text-muted-foreground">Ctrl+[</span>
        </button>

        <button
          :disabled="!hasSelection"
          class="w-full px-3 py-2 text-left text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          @click="handleBringToFront"
        >
          <ChevronsUp class="w-4 h-4" />
          置顶
          <span class="ml-auto text-xs text-muted-foreground">Ctrl+Shift+]</span>
        </button>

        <button
          :disabled="!hasSelection"
          class="w-full px-3 py-2 text-left text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          @click="handleSendToBack"
        >
          <ChevronsDown class="w-4 h-4" />
          置底
          <span class="ml-auto text-xs text-muted-foreground">Ctrl+Shift+[</span>
        </button>

        <div class="border-t border-border my-1"></div>

        <!-- 对齐操作子菜单 -->
        <div class="relative">
          <button
            :disabled="!hasSelection"
            class="w-full px-3 py-2 text-left text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            @click="toggleAlignMenu"
            @mouseenter="showAlignMenu"
            @mouseleave="scheduleHideAlignMenu"
          >
            <AlignCenter class="w-4 h-4" />
            对齐
            <ChevronRight class="w-4 h-4 ml-auto" />
          </button>

          <!-- 对齐子菜单 -->
          <div
            v-if="showAlign"
            class="absolute left-full top-0 min-w-48 bg-popover border border-border rounded-lg shadow-lg py-2 ml-1"
            @mouseenter="showAlignMenu"
            @mouseleave="scheduleHideAlignMenu"
          >
            <button
              class="w-full px-3 py-2 text-left text-sm hover:bg-accent flex items-center gap-2"
              @click="handleAlign('left')"
            >
              <AlignLeft class="w-4 h-4" />
              左对齐
            </button>
            <button
              class="w-full px-3 py-2 text-left text-sm hover:bg-accent flex items-center gap-2"
              @click="handleAlign('center')"
            >
              <AlignCenter class="w-4 h-4" />
              居中对齐
            </button>
            <button
              class="w-full px-3 py-2 text-left text-sm hover:bg-accent flex items-center gap-2"
              @click="handleAlign('right')"
            >
              <AlignRight class="w-4 h-4" />
              右对齐
            </button>
            <div class="border-t border-border my-1"></div>
            <button
              class="w-full px-3 py-2 text-left text-sm hover:bg-accent flex items-center gap-2"
              @click="handleAlign('top')"
            >
              <AlignStartVertical class="w-4 h-4" />
              顶部对齐
            </button>
            <button
              class="w-full px-3 py-2 text-left text-sm hover:bg-accent flex items-center gap-2"
              @click="handleAlign('middle')"
            >
              <AlignCenterVertical class="w-4 h-4" />
              垂直居中
            </button>
            <button
              class="w-full px-3 py-2 text-left text-sm hover:bg-accent flex items-center gap-2"
              @click="handleAlign('bottom')"
            >
              <AlignEndVertical class="w-4 h-4" />
              底部对齐
            </button>
          </div>
        </div>

        <div class="border-t border-border my-1"></div>

        <!-- 锁定和可见性 -->
        <button
          :disabled="!hasSelection"
          class="w-full px-3 py-2 text-left text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          @click="handleToggleLock"
        >
          <component :is="isLocked ? Unlock : Lock" class="w-4 h-4" />
          {{ isLocked ? '解锁' : '锁定' }}
          <span class="ml-auto text-xs text-muted-foreground">Ctrl+L</span>
        </button>

        <button
          :disabled="!hasSelection"
          class="w-full px-3 py-2 text-left text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          @click="handleToggleVisibility"
        >
          <component :is="isVisible ? EyeOff : Eye" class="w-4 h-4" />
          {{ isVisible ? '隐藏' : '显示' }}
          <span class="ml-auto text-xs text-muted-foreground">Ctrl+H</span>
        </button>

        <div class="border-t border-border my-1"></div>

        <!-- 删除操作 -->
        <button
          :disabled="!hasSelection"
          class="w-full px-3 py-2 text-left text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-destructive hover:text-destructive"
          @click="handleDelete"
        >
          <Trash2 class="w-4 h-4" />
          删除
          <span class="ml-auto text-xs text-muted-foreground">Delete</span>
        </button>

        <!-- 显示当前状态信息 -->
        <div class="border-t border-border my-1"></div>
        <div class="px-3 py-1 text-xs text-muted-foreground">
          {{ hasSelection ? '已选中元素' : '空白区域' }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  Copy,
  Clipboard,
  CopyPlus,
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Trash2,
  ChevronRight,
} from 'lucide-vue-next';

// import { storeToRefs } from 'pinia';

import useNodeMenuStore from '@/stores/nodeAttrs';

// 组件属性
interface Props {
  selectedNode?: any;
  hasClipboard?: boolean;
  position?: { x: number; y: number };
}

const props = withDefaults(defineProps<Props>(), {
  hasClipboard: false,
  position: () => ({ x: 0, y: 0 }),
});

const emit = defineEmits<{
  copy: [];
  paste: [position: { x: number; y: number }];
  duplicate: [];
  delete: [];
  'bring-forward': [];
  'send-backward': [];
  'bring-to-front': [];
  'send-to-back': [];
  'toggle-lock': [];
  'toggle-visibility': [];
  align: [direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom'];
}>();

const { closeContextMenu } = useNodeMenuStore();

const showAlign = ref(false);
let alignMenuTimer: number | null = null;

// 计算属性
const hasSelection = computed(() => !!props.selectedNode);
const isLocked = computed(() => props.selectedNode?.locked || false);
const isVisible = computed(() => props.selectedNode?.visible !== false);

// 左键点击处理（关闭菜单）
const handleClick = (_event: MouseEvent) => {
  closeContextMenu();
};

// 关闭菜单
const closeMenu = () => {
  closeContextMenu();
  showAlign.value = false;
  if (alignMenuTimer) {
    clearTimeout(alignMenuTimer);
    alignMenuTimer = null;
  }
};

// 对齐菜单控制
const toggleAlignMenu = () => {
  showAlign.value = !showAlign.value;
};

const showAlignMenu = () => {
  if (alignMenuTimer) {
    clearTimeout(alignMenuTimer);
    alignMenuTimer = null;
  }
  showAlign.value = true;
};

const scheduleHideAlignMenu = () => {
  alignMenuTimer = window.setTimeout(() => {
    showAlign.value = false;
  }, 200);
};

// 键盘事件处理
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
};

// 菜单操作处理函数
const handleCopy = () => {
  emit('copy');
  closeMenu();
};

const handlePaste = () => {
  // 传递菜单打开时的鼠标位置
  emit('paste', { x: props.position.x, y: props.position.y });
  closeMenu();
};

const handleDuplicate = () => {
  emit('duplicate');
  closeMenu();
};

const handleDelete = () => {
  emit('delete');
  closeMenu();
};

const handleBringForward = () => {
  emit('bring-forward');
  closeMenu();
};

const handleSendBackward = () => {
  emit('send-backward');
  closeMenu();
};

const handleBringToFront = () => {
  emit('bring-to-front');
  closeMenu();
};

const handleSendToBack = () => {
  emit('send-to-back');
  closeMenu();
};

const handleAlign = (direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
  emit('align', direction);
  closeMenu();
};

const handleToggleLock = () => {
  emit('toggle-lock');
  closeMenu();
};

const handleToggleVisibility = () => {
  emit('toggle-visibility');
  closeMenu();
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  if (alignMenuTimer) {
    clearTimeout(alignMenuTimer);
  }
});
</script>
