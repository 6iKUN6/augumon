<template>
  <div ref="drawCanvas" class="w-full h-full flex items-center justify-center">
    <div class="size-full relative">
      <LocateTools class="absolute bottom-4 left-8" @locate-fixed="handleLocateFixed" />
      <CreateTools class="absolute bottom-4 right-4" :canvasApp="draw" />
      <div
        ref="miniMap"
        class="absolute top-6 right-6 z-10 w-[200px] h-[150px] border-2 border-blue-300 flex items-center justify-center bg-[#f0f0f0] rounded-md"
      ></div>
      <ContextMenu
        :selected-node="selectedNode"
        :has-clipboard="hasClipboard"
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
import Draw from '@/Render/draw';
import CreateTools from '@/components/edit-tools/create-tools.vue';
import LocateTools from '@/components/locate-tools/index.vue';
import ContextMenu from '@/components/context-menu/index.vue';
import useNodeMenuStore from '@/stores/node-menu';

const drawCanvas = ref<HTMLDivElement | null>(null);
const draw = shallowRef<Draw | null>(null);
const miniMap = useTemplateRef('miniMap');

// 使用 store 管理选中的节点
const nodeMenuStore = useNodeMenuStore();
const selectedNode = computed(() => nodeMenuStore.activedMenuNode);

// 右键菜单相关状态
const hasClipboard = ref(false);
const clipboard = ref<any>(null);

onMounted(() => {
  if (drawCanvas.value) {
    draw.value = new Draw(drawCanvas.value);
    if (miniMap.value) {
      draw.value.initMiniMap(miniMap.value);
    }

    // 设置选中节点更新回调
    setupNodeSelection();
    // 设置键盘快捷键
    setupKeyboardShortcuts();
  }
});

// 设置键盘快捷键
const setupKeyboardShortcuts = () => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // 检查是否在输入框中，如果是则不处理快捷键
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.contentEditable === 'true'
    ) {
      return;
    }

    const isCtrl = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;

    switch (e.key.toLowerCase()) {
      case 'c':
        if (isCtrl) {
          e.preventDefault();
          handleCopy();
        }
        break;
      case 'v':
        if (isCtrl) {
          e.preventDefault();
          // 键盘快捷键粘贴时，使用画布中心位置
          const centerPosition = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          };
          handlePaste(centerPosition);
        }
        break;
      case 'd':
        if (isCtrl) {
          e.preventDefault();
          handleDuplicate();
        }
        break;
      case 'delete':
      case 'backspace':
        e.preventDefault();
        handleDelete();
        break;
      case ']':
        if (isCtrl) {
          e.preventDefault();
          if (isShift) {
            handleBringToFront();
          } else {
            handleBringForward();
          }
        }
        break;
      case '[':
        if (isCtrl) {
          e.preventDefault();
          if (isShift) {
            handleSendToBack();
          } else {
            handleSendBackward();
          }
        }
        break;
      case 'l':
        if (isCtrl) {
          e.preventDefault();
          handleToggleLock();
        }
        break;
      case 'h':
        if (isCtrl) {
          e.preventDefault();
          handleToggleVisibility();
        }
        break;
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  // 清理事件监听器
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });
};

// 设置节点选择监听
const setupNodeSelection = () => {
  if (!draw.value) return;

  // 监听编辑器的选中事件
  draw.value.getApp().editor.on('select', (e: any) => {
    if (e.list && e.list.length > 0) {
      nodeMenuStore.setActivedMenuNode(e.list[0]);
    } else {
      nodeMenuStore.clearActivedMenuNode();
    }
  });
};

const handleLocateFixed = () => {
  // 使用带动画效果的回到原点方法
  draw.value?.animateToOrigin(1, 'ease-out');
};

// 操作提示
const showMessage = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
  // TODO: 可以接入toast组件或通知组件
  console.log(`[${type.toUpperCase()}] ${message}`);
};

// 右键菜单操作处理函数
const handleCopy = () => {
  if (selectedNode.value) {
    clipboard.value = selectedNode.value.clone();
    hasClipboard.value = true;
    showMessage('节点已复制到剪贴板');
  } else {
    showMessage('请先选中一个节点', 'warning');
  }
};

const handlePaste = (position: { x: number; y: number }) => {
  if (clipboard.value && draw.value) {
    const newNode = clipboard.value.clone();

    // 将屏幕坐标转换为画布坐标
    const app = draw.value.getApp();
    const canvasRect = (app.view as HTMLElement).getBoundingClientRect();

    // 计算相对于画布的位置
    const canvasX = position.x - canvasRect.left;
    const canvasY = position.y - canvasRect.top;

    // 考虑画布的缩放和偏移
    const zoom = (app as any).zoomLayer?.scaleX || 1;
    const offsetX = (app as any).zoomLayer?.x || 0;
    const offsetY = (app as any).zoomLayer?.y || 0;

    // 设置新节点的位置
    newNode.x = (canvasX - offsetX) / zoom;
    newNode.y = (canvasY - offsetY) / zoom;

    // 添加到画布
    draw.value.getApp().tree.add(newNode);

    // 为新节点绑定右键菜单事件
    draw.value.activeNodeContextMenu(newNode as any);

    showMessage('节点已粘贴到鼠标位置');
  } else {
    showMessage('剪贴板为空', 'warning');
  }
};

const handleDuplicate = () => {
  if (selectedNode.value && draw.value) {
    const duplicatedNode = selectedNode.value.clone();
    // 偏移位置避免重叠
    if (duplicatedNode.x !== undefined) duplicatedNode.x += 20;
    if (duplicatedNode.y !== undefined) duplicatedNode.y += 20;

    // 添加到画布
    draw.value.getApp().tree.add(duplicatedNode);

    // 为新节点绑定右键菜单事件
    draw.value.activeNodeContextMenu(duplicatedNode as any);

    showMessage('节点副本已创建');
  } else {
    showMessage('请先选中一个节点', 'warning');
  }
};

const handleDelete = () => {
  if (selectedNode.value) {
    selectedNode.value.remove();
    nodeMenuStore.clearActivedMenuNode();
    showMessage('节点已删除');
  } else {
    showMessage('请先选中一个节点', 'warning');
  }
};

const handleBringForward = () => {
  if (!selectedNode.value) {
    showMessage('请先选中一个节点', 'warning');
    return;
  }

  if (selectedNode.value) {
    const parent = selectedNode.value.parent;
    if (parent) {
      const currentIndex = parent.children.indexOf(selectedNode.value);
      if (currentIndex < parent.children.length - 1) {
        parent.addAt(selectedNode.value, currentIndex + 1);
        showMessage('节点已上移一层');
      } else {
        showMessage('节点已在最顶层', 'info');
      }
    }
  }
};

const handleSendBackward = () => {
  if (!selectedNode.value) {
    showMessage('请先选中一个节点', 'warning');
    return;
  }

  if (selectedNode.value) {
    const parent = selectedNode.value.parent;
    if (parent) {
      const currentIndex = parent.children.indexOf(selectedNode.value);
      if (currentIndex > 0) {
        parent.addAt(selectedNode.value, currentIndex - 1);
        showMessage('节点已下移一层');
      } else {
        showMessage('节点已在最底层', 'info');
      }
    }
  }
};

const handleBringToFront = () => {
  if (!selectedNode.value) {
    showMessage('请先选中一个节点', 'warning');
    return;
  }

  if (selectedNode.value) {
    const parent = selectedNode.value.parent;
    if (parent) {
      parent.add(selectedNode.value);
      showMessage('节点已置顶');
    }
  }
};

const handleSendToBack = () => {
  if (!selectedNode.value) {
    showMessage('请先选中一个节点', 'warning');
    return;
  }

  if (selectedNode.value) {
    const parent = selectedNode.value.parent;
    if (parent) {
      parent.addAt(selectedNode.value, 0);
      showMessage('节点已置底');
    }
  }
};

const handleAlign = (direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
  if (!selectedNode.value) {
    showMessage('请先选中一个节点', 'warning');
    return;
  }

  if (selectedNode.value && draw.value) {
    const app = draw.value.getApp();
    const viewport = app.tree;

    // 获取视口或画布的实际尺寸
    const canvasWidth = viewport.width || app.width || 800;
    const canvasHeight = viewport.height || app.height || 600;

    const node = selectedNode.value;
    const nodeWidth = node.width || 0;
    const nodeHeight = node.height || 0;

    switch (direction) {
      case 'left':
        node.x = 0;
        break;
      case 'center':
        node.x = (canvasWidth - nodeWidth) / 2;
        break;
      case 'right':
        node.x = canvasWidth - nodeWidth;
        break;
      case 'top':
        node.y = 0;
        break;
      case 'middle':
        node.y = (canvasHeight - nodeHeight) / 2;
        break;
      case 'bottom':
        node.y = canvasHeight - nodeHeight;
        break;
    }

    const alignText = {
      left: '左对齐',
      center: '居中对齐',
      right: '右对齐',
      top: '顶部对齐',
      middle: '垂直居中',
      bottom: '底部对齐',
    };

    showMessage(`节点已${alignText[direction]}`);
  }
};

const handleToggleLock = () => {
  if (!selectedNode.value) {
    showMessage('请先选中一个节点', 'warning');
    return;
  }

  if (selectedNode.value) {
    selectedNode.value.locked = !selectedNode.value.locked;
    const status = selectedNode.value.locked ? '已锁定' : '已解锁';
    showMessage(`节点${status}`);
  }
};

const handleToggleVisibility = () => {
  if (!selectedNode.value) {
    showMessage('请先选中一个节点', 'warning');
    return;
  }

  if (selectedNode.value) {
    selectedNode.value.visible = !selectedNode.value.visible;
    const status = selectedNode.value.visible ? '已显示' : '已隐藏';
    showMessage(`节点${status}`);
  }
};
</script>
