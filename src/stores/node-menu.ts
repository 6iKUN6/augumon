import { defineStore } from 'pinia';
import type { UI } from 'leafer-ui';

const useNodeMenuStore = defineStore('nodeMenu', () => {
  const activedMenuNode = shallowRef<UI | null>(null);

  const setActivedMenuNode = (node: UI) => {
    activedMenuNode.value = node;
  };

  const clearActivedMenuNode = () => {
    activedMenuNode.value = null;
  };

  return { activedMenuNode, setActivedMenuNode, clearActivedMenuNode };
});

export default useNodeMenuStore;
