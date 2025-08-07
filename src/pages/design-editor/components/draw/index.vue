<template>
  <div ref="drawCanvas" class="w-full h-full flex items-center justify-center">
    <div id="draw-canvas" class="size-full relative">
      <!-- 编辑工具 - 显示在选中元素上方 -->
      <div v-if="focusNode && nodePosition" class="absolute z-30" :style="toolPosition">
        <!-- 文本编辑工具 -->
        <TextTools v-if="isTextNode" :selected-node="focusNode" />
        <!-- 矩形编辑工具 -->
        <RectTools v-if="isRectNode" :selected-node="focusNode" />
        <!-- 图片编辑工具 -->
        <ImageTools v-if="isImageNode" :selected-node="focusNode" />
      </div>

      <LocateTools class="absolute bottom-4 left-8" @locate-fixed="handleLocateFixed" />
      <CreateTools class="absolute bottom-4 right-4" :canvasApp="draw" />
      <div
        ref="miniMap"
        class="absolute top-6 right-6 z-10 w-[200px] h-[150px] border-2 border-blue-300 flex items-center justify-center bg-[#f0f0f0] rounded-md"
      ></div>
      <ContextMenu
        v-if="showContextMenu"
        :selected-node="activedMenuNode"
        :has-clipboard="hasClipboard"
        :position="contextMenuPosition"
        @align="handleAlign"
        @copy="handleCopy"
        @paste="handlePaste"
        @duplicate="handleDuplicate"
        @delete="handleDelete"
        @bring-forward="handleBringForward"
        @send-backward="handleSendBackward"
        @bring-to-front="handleBringToFront"
        @send-to-back="handleSendToBack"
        @toggle-lock="handleToggleLock"
        @toggle-visibility="handleToggleVisibility"
      >
      </ContextMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import Draw from '@/Render/draw';

import CreateTools from '@/components/edit-tools/create-tools.vue';
import TextTools from '@/components/edit-tools/text-tools.vue';
import RectTools from '@/components/edit-tools/rect-tools.vue';
import ImageTools from '@/components/edit-tools/image-tools.vue';
import LocateTools from '@/components/locate-tools/index.vue';
import ContextMenu from '@/components/context-menu/index.vue';
import useNodeToolAndMenuStore from '@/stores/nodeToolAndMenu';

const drawCanvas = ref<HTMLDivElement | null>(null);
const draw = shallowRef<Draw | null>(null);
const miniMap = useTemplateRef('miniMap');

// 使用 store 管理选中的节点
const nodeMenuStore = useNodeToolAndMenuStore();
const { activedMenuNode, nodePosition, focusNode, contextMenuPosition, showContextMenu } =
  storeToRefs(nodeMenuStore);

// 节点类型检测
const isTextNode = computed(() => {
  return focusNode.value && focusNode.value.tag === 'Text';
});

const isRectNode = computed(() => {
  return focusNode.value && focusNode.value.tag === 'Rect';
});

const isImageNode = computed(() => {
  return focusNode.value && focusNode.value.tag === 'Image';
});

// 计算编辑工具的位置
const toolPosition = computed(() => {
  if (!nodePosition.value || !drawCanvas.value) return {};

  const padding = 16; // 上方padding
  const toolHeight = 60; // 工具栏估计高度
  const canvasRect = drawCanvas.value.getBoundingClientRect();

  // 计算在画布容器中的相对位置
  let left = nodePosition.value.x + nodePosition.value.width / 2;
  let top = nodePosition.value.y - toolHeight - padding;

  // 边界检测 - 防止工具栏超出画布范围
  const toolWidth = 300; // 工具栏估计宽度
  const minLeft = toolWidth / 2 + 10;
  const maxLeft = canvasRect.width - toolWidth / 2 - 10;
  const minTop = 10;

  // 水平边界限制
  if (left < minLeft) left = minLeft;
  if (left > maxLeft) left = maxLeft;

  // 垂直边界限制 - 如果工具栏会超出顶部，则显示在元素下方
  if (top < minTop) {
    top = nodePosition.value.y + nodePosition.value.height + padding;
  }

  return {
    left: `${left}px`,
    top: `${top}px`,
    transform: 'translateX(-50%)', // 水平居中
  };
});

// 右键菜单相关状态 - 现在从contextMenuTools获取
const hasClipboard = computed(() => {
  return draw.value?.contextMenuTools?.getHasClipboard() || false;
});

onMounted(() => {
  if (drawCanvas.value) {
    draw.value = new Draw(drawCanvas.value);
    if (miniMap.value) {
      draw.value.initMiniMap(miniMap.value);
    }
  }
});

// 节点位置监听器引用，用于清理
let currentNodeListener: (() => void) | null = null;
let updatePositionTimer: ReturnType<typeof setTimeout> | null = null;

const handleLocateFixed = () => {
  // 使用带动画效果的回到原点方法
  draw.value?.animateToOrigin(1, 'ease-out');
};

// 右键菜单操作处理函数 - 现在使用contextMenuTools
const handleCopy = () => {
  draw.value?.contextMenuTools?.copy();
};

const handlePaste = (position: { x: number; y: number }) => {
  draw.value?.contextMenuTools?.paste(position);
};

const handleDuplicate = () => {
  draw.value?.contextMenuTools?.duplicate();
};

const handleDelete = () => {
  draw.value?.contextMenuTools?.delete();
};

const handleBringForward = () => {
  draw.value?.contextMenuTools?.bringForward();
};

const handleSendBackward = () => {
  draw.value?.contextMenuTools?.sendBackward();
};

const handleBringToFront = () => {
  draw.value?.contextMenuTools?.bringToFront();
};

const handleSendToBack = () => {
  draw.value?.contextMenuTools?.sendToBack();
};

const handleAlign = (direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
  draw.value?.contextMenuTools?.align(direction);
};

const handleToggleLock = () => {
  draw.value?.contextMenuTools?.toggleLock();
};

const handleToggleVisibility = () => {
  draw.value?.contextMenuTools?.toggleVisibility();
};

onUnmounted(() => {
  // 销毁Draw实例，清理快捷键等资源
  draw.value?.destroy();

  // 清理节点监听器和定时器
  if (currentNodeListener) {
    currentNodeListener();
    currentNodeListener = null;
  }
  if (updatePositionTimer) {
    clearTimeout(updatePositionTimer);
    updatePositionTimer = null;
  }
});
</script>
