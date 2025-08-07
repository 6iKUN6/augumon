import type { App, UI } from 'leafer-ui';
import hotkeys from 'hotkeys-js';
import useNodeToolAndMenuStore from '@/stores/nodeToolAndMenu';

class ContextMenuTools {
  private app: App;
  private clipboard: any = null;
  private hasClipboard = ref(false);
  private hotkeysInitialized = false;

  constructor(app: App) {
    this.app = app;
  }

  /**
   * 获取剪贴板状态
   */
  getHasClipboard() {
    return this.hasClipboard.value;
  }

  /**
   * 显示操作提示消息
   */
  private showMessage(message: string, type: 'success' | 'info' | 'warning' = 'success') {
    // TODO: 可以接入toast组件或通知组件
    console.log(`[${type.toUpperCase()}] ${message}`);
  }

  /**
   * 复制节点
   */
  copy() {
    const nodeMenuStore = useNodeToolAndMenuStore();
    if (nodeMenuStore.activedMenuNode) {
      this.clipboard = nodeMenuStore.activedMenuNode.clone();
      this.hasClipboard.value = true;
      this.showMessage('节点已复制到剪贴板');
      return true;
    } else {
      this.showMessage('请先选中一个节点', 'warning');
      return false;
    }
  }

  /**
   * 粘贴节点到指定位置
   */
  paste(position: { x: number; y: number }) {
    if (this.clipboard) {
      const newNode = this.clipboard.clone();

      // 将屏幕坐标转换为画布坐标
      const canvasRect = (this.app.view as HTMLElement).getBoundingClientRect();

      // 计算相对于画布的位置
      const canvasX = position.x - canvasRect.left;
      const canvasY = position.y - canvasRect.top;

      // 考虑画布的缩放和偏移
      const zoom = (this.app as any).zoomLayer?.scaleX || 1;
      const offsetX = (this.app as any).zoomLayer?.x || 0;
      const offsetY = (this.app as any).zoomLayer?.y || 0;

      // 设置新节点的位置
      newNode.x = (canvasX - offsetX) / zoom;
      newNode.y = (canvasY - offsetY) / zoom;

      // 添加到画布
      this.app.tree.add(newNode);

      // 为新节点绑定右键菜单事件（需要Draw实例支持）
      this.activeNodeContextMenu(newNode as any);

      this.showMessage('节点已粘贴到鼠标位置');
      return true;
    } else {
      this.showMessage('剪贴板为空', 'warning');
      return false;
    }
  }

  /**
   * 复制副本（复制并偏移位置）
   */
  duplicate() {
    const nodeMenuStore = useNodeToolAndMenuStore();
    if (nodeMenuStore.activedMenuNode) {
      const duplicatedNode = nodeMenuStore.activedMenuNode.clone();
      // 偏移位置避免重叠
      if (duplicatedNode.x !== undefined) duplicatedNode.x += 20;
      if (duplicatedNode.y !== undefined) duplicatedNode.y += 20;

      // 添加到画布
      this.app.tree.add(duplicatedNode);

      // 为新节点绑定右键菜单事件
      this.activeNodeContextMenu(duplicatedNode as any);

      this.showMessage('节点副本已创建');
      return true;
    } else {
      this.showMessage('请先选中一个节点', 'warning');
      return false;
    }
  }

  /**
   * 删除节点
   */
  delete() {
    const nodeMenuStore = useNodeToolAndMenuStore();
    if (nodeMenuStore.activedMenuNode) {
      nodeMenuStore.activedMenuNode.remove();
      nodeMenuStore.clearActivedMenuNode();
      this.showMessage('节点已删除');
      return true;
    } else {
      this.showMessage('请先选中一个节点', 'warning');
      return false;
    }
  }

  /**
   * 上移一层
   */
  bringForward() {
    const nodeMenuStore = useNodeToolAndMenuStore();
    if (!nodeMenuStore.activedMenuNode) {
      this.showMessage('请先选中一个节点', 'warning');
      return false;
    }

    const parent = nodeMenuStore.activedMenuNode.parent;
    if (parent) {
      const currentIndex = parent.children.indexOf(nodeMenuStore.activedMenuNode);
      if (currentIndex < parent.children.length - 1) {
        parent.addAt(nodeMenuStore.activedMenuNode, currentIndex + 1);
        this.showMessage('节点已上移一层');
        return true;
      } else {
        this.showMessage('节点已在最顶层', 'info');
        return false;
      }
    }
    return false;
  }

  /**
   * 下移一层
   */
  sendBackward() {
    const nodeMenuStore = useNodeToolAndMenuStore();
    if (!nodeMenuStore.activedMenuNode) {
      this.showMessage('请先选中一个节点', 'warning');
      return false;
    }

    const parent = nodeMenuStore.activedMenuNode.parent;
    if (parent) {
      const currentIndex = parent.children.indexOf(nodeMenuStore.activedMenuNode);
      if (currentIndex > 0) {
        parent.addAt(nodeMenuStore.activedMenuNode, currentIndex - 1);
        this.showMessage('节点已下移一层');
        return true;
      } else {
        this.showMessage('节点已在最底层', 'info');
        return false;
      }
    }
    return false;
  }

  /**
   * 置顶
   */
  bringToFront() {
    const nodeMenuStore = useNodeToolAndMenuStore();
    if (!nodeMenuStore.activedMenuNode) {
      this.showMessage('请先选中一个节点', 'warning');
      return false;
    }

    const parent = nodeMenuStore.activedMenuNode.parent;
    if (parent) {
      parent.add(nodeMenuStore.activedMenuNode);
      this.showMessage('节点已置顶');
      return true;
    }
    return false;
  }

  /**
   * 置底
   */
  sendToBack() {
    const nodeMenuStore = useNodeToolAndMenuStore();
    if (!nodeMenuStore.activedMenuNode) {
      this.showMessage('请先选中一个节点', 'warning');
      return false;
    }

    const parent = nodeMenuStore.activedMenuNode.parent;
    if (parent) {
      parent.addAt(nodeMenuStore.activedMenuNode, 0);
      this.showMessage('节点已置底');
      return true;
    }
    return false;
  }

  /**
   * 对齐操作
   */
  align(direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') {
    const nodeMenuStore = useNodeToolAndMenuStore();
    if (!nodeMenuStore.activedMenuNode) {
      this.showMessage('请先选中一个节点', 'warning');
      return false;
    }

    const viewport = this.app.tree;

    // 获取视口或画布的实际尺寸
    const canvasWidth = viewport.width || this.app.width || 800;
    const canvasHeight = viewport.height || this.app.height || 600;

    const node = nodeMenuStore.activedMenuNode;
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

    this.showMessage(`节点已${alignText[direction]}`);
    return true;
  }

  /**
   * 切换锁定状态
   */
  toggleLock() {
    const nodeMenuStore = useNodeToolAndMenuStore();
    if (!nodeMenuStore.activedMenuNode) {
      this.showMessage('请先选中一个节点', 'warning');
      return false;
    }

    nodeMenuStore.activedMenuNode.locked = !nodeMenuStore.activedMenuNode.locked;
    const status = nodeMenuStore.activedMenuNode.locked ? '已锁定' : '已解锁';
    this.showMessage(`节点${status}`);
    return true;
  }

  /**
   * 切换可见性
   */
  toggleVisibility() {
    const nodeMenuStore = useNodeToolAndMenuStore();
    if (!nodeMenuStore.activedMenuNode) {
      this.showMessage('请先选中一个节点', 'warning');
      return false;
    }

    nodeMenuStore.activedMenuNode.visible = !nodeMenuStore.activedMenuNode.visible;
    const status = nodeMenuStore.activedMenuNode.visible ? '已显示' : '已隐藏';
    this.showMessage(`节点${status}`);
    return true;
  }

  /**
   * 为节点绑定右键菜单事件（这个方法需要在Draw类中实现）
   * 这里先声明，稍后由Draw类提供具体实现
   */
  private activeNodeContextMenu(_node: UI) {
    // 这个方法由Draw类注入
    console.warn('activeNodeContextMenu method should be injected by Draw class');
  }

  /**
   * 设置右键菜单节点激活方法（由Draw类注入）
   */
  setActiveNodeContextMenu(fn: (node: UI) => void) {
    this.activeNodeContextMenu = fn;
  }

  /**
   * 初始化快捷键
   */
  initHotkeys() {
    if (this.hotkeysInitialized) {
      return;
    }

    // 设置过滤器，避免在输入框中触发快捷键
    hotkeys.filter = (event) => {
      const target = event.target as HTMLElement;
      const tagName = target.tagName;

      // 如果在输入框、文本框或可编辑元素中，不处理快捷键
      if (tagName === 'INPUT' || tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        return false;
      }
      return true;
    };

    // 复制 Ctrl+C
    hotkeys('ctrl+c,cmd+c', (event) => {
      event.preventDefault();
      this.copy();
    });

    // 粘贴 Ctrl+V
    hotkeys('ctrl+v,cmd+v', (event) => {
      event.preventDefault();
      // 键盘快捷键粘贴时，使用画布中心位置
      const centerPosition = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      this.paste(centerPosition);
    });

    // 复制副本 Ctrl+D
    hotkeys('ctrl+d,cmd+d', (event) => {
      event.preventDefault();
      this.duplicate();
    });

    // 删除 Delete/Backspace
    hotkeys('delete,backspace', (event) => {
      event.preventDefault();
      this.delete();
    });

    // 上移一层 Ctrl+]
    hotkeys('ctrl+],cmd+]', (event) => {
      event.preventDefault();
      this.bringForward();
    });

    // 置顶 Ctrl+Shift+]
    hotkeys('ctrl+shift+],cmd+shift+]', (event) => {
      event.preventDefault();
      this.bringToFront();
    });

    // 下移一层 Ctrl+[
    hotkeys('ctrl+[,cmd+[', (event) => {
      event.preventDefault();
      this.sendBackward();
    });

    // 置底 Ctrl+Shift+[
    hotkeys('ctrl+shift+[,cmd+shift+[', (event) => {
      event.preventDefault();
      this.sendToBack();
    });

    // 切换锁定 Ctrl+L
    hotkeys('ctrl+l,cmd+l', (event) => {
      event.preventDefault();
      this.toggleLock();
    });

    // 切换可见性 Ctrl+H
    hotkeys('ctrl+h,cmd+h', (event) => {
      event.preventDefault();
      this.toggleVisibility();
    });

    this.hotkeysInitialized = true;
    console.log('Context menu hotkeys initialized');
  }

  /**
   * 销毁快捷键
   */
  destroyHotkeys() {
    if (!this.hotkeysInitialized) {
      return;
    }

    // 解绑所有快捷键
    hotkeys.unbind('ctrl+c,cmd+c');
    hotkeys.unbind('ctrl+v,cmd+v');
    hotkeys.unbind('ctrl+d,cmd+d');
    hotkeys.unbind('delete,backspace');
    hotkeys.unbind('ctrl+],cmd+]');
    hotkeys.unbind('ctrl+shift+],cmd+shift+]');
    hotkeys.unbind('ctrl+[,cmd+[');
    hotkeys.unbind('ctrl+shift+[,cmd+shift+[');
    hotkeys.unbind('ctrl+l,cmd+l');
    hotkeys.unbind('ctrl+h,cmd+h');

    this.hotkeysInitialized = false;
    console.log('Context menu hotkeys destroyed');
  }

  /**
   * 获取快捷键初始化状态
   */
  getHotkeysInitialized() {
    return this.hotkeysInitialized;
  }
}

export default ContextMenuTools;
