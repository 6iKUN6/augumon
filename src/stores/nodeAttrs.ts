import { defineStore } from 'pinia';
import type { UI } from 'leafer-ui';

interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

const useNodeMenuStore = defineStore('nodeMenu', () => {
  const activedMenuNode = shallowRef<UI | null>(null);
  const activeToolNode = shallowRef<UI | null>(null);
  const nodePosition = ref<NodePosition | null>(null);

  watch(nodePosition, () => {
    console.log('nodePosition', nodePosition.value);
  });

  const setFocusNodePosition = (node: UI) => {
    console.log('setFocusNodePosition', node);

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

    activeToolNode.value = node;
    setFocusNodePosition(node);
  };

  const clearActiveToolNode = () => {
    activeToolNode.value = null;
  };

  return {
    activedMenuNode,
    nodePosition,
    setActivedMenuNode,
    clearActivedMenuNode,
    activeToolNode,
    setActiveToolNode,
    clearActiveToolNode,
    setFocusNodePosition,
  };
});

export default useNodeMenuStore;
