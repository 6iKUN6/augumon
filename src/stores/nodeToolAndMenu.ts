import { defineStore } from 'pinia';
import type { UI } from 'leafer-ui';

interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

const useNodeToolAndMenuStore = defineStore('nodeMenu', () => {
  const activedMenuNode = shallowRef<UI | null>(null);
  const focusNode = shallowRef<UI | null>(null); //选中的元素，左键
  const nodePosition = ref<NodePosition | null>(null);
  const contextMenuPosition = ref<{ x: number; y: number }>();
  const showContextMenu = ref(false);

  watch(focusNode, () => {
    console.info('选中元素发生变化', focusNode.value);
  });

  const setFocusNodePosition = (node: UI) => {
    nodePosition.value = {
      x: node.x || 0,
      y: node.y || 0,
      width: node.width || 0,
      height: node.height || 0,
    };
  };

  const setActivedMenuNode = (node: UI) => {
    activedMenuNode.value = node;
    setFocusNodePosition(node);
  };

  const clearActivedMenuNode = () => {
    activedMenuNode.value = null;
    nodePosition.value = null;
  };

  const setActiveToolNode = (node: UI) => {
    console.log('setActiveToolNode', node);

    focusNode.value = node;
    setFocusNodePosition(node);
  };

  const clearActiveToolNode = () => {
    focusNode.value = null;
  };

  const setContextMenuPosition = (x: number, y: number) => {
    contextMenuPosition.value = { x, y };
  };

  const clearContextMenuPosition = () => {
    contextMenuPosition.value = { x: 0, y: 0 };
  };

  const setShowContextMenu = (show: boolean) => {
    showContextMenu.value = show;
  };

  const closeContextMenu = () => {
    showContextMenu.value = false;
  };

  return {
    focusNode,
    showContextMenu,
    activedMenuNode,
    nodePosition,
    contextMenuPosition,
    setActivedMenuNode,
    clearActivedMenuNode,
    setActiveToolNode,
    clearActiveToolNode,
    setFocusNodePosition,
    setContextMenuPosition,
    clearContextMenuPosition,
    setShowContextMenu,
    closeContextMenu,
  };
});

export default useNodeToolAndMenuStore;
