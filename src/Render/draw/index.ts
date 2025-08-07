import { App, Leafer, ChildEvent, PropertyEvent, PointerEvent } from 'leafer-ui';
import type {
  IRectInputData,
  ITextInputData,
  IImageInputData,
  IAnimateEasing,
  UI,
} from 'leafer-ui';
import { Editor } from '@leafer-in/editor';
import '@leafer-in/viewport';
import '@leafer-in/animate';
import '@leafer-in/text-editor';
import { Ruler } from 'leafer-x-ruler';
import { DotMatrix } from 'leafer-x-dot-matrix';
import { throttle } from 'lodash-es';

import { createRect, createText, createImage } from '../nodes/createNode';
import useNodeToolAndMenuStore from '@/stores/nodeToolAndMenu';
import ContextMenuTools from '../tools/context-menu';

class Draw {
  private app: App;
  public contextMenuTools: ContextMenuTools;

  constructor(appView: object | string) {
    this.app = new App({
      view: appView,
      sky: { type: 'editor' }, //编辑层
      tree: { type: 'design' }, //主要内容层
      ground: { type: 'viewport' }, //背景层
    });
    this.app.sky.add((this.app.editor = new Editor()));
    this.drawGround();

    // 初始化右键菜单工具
    this.contextMenuTools = new ContextMenuTools(this.app);
    // 注入节点激活方法
    this.contextMenuTools.setActiveNodeContextMenu((node: UI) => {
      this.activeNodeContextMenu(node);
    });
    // 初始化快捷键
    this.contextMenuTools.initHotkeys();

    // 监听右键菜单事件
    this.app.on([PointerEvent.CLICK], (e) => {
      const { clearActivedMenuNode, clearActiveToolNode, closeContextMenu } =
        useNodeToolAndMenuStore();

      // 判断是否是画布空白区域
      if (e.target.tag === 'App' && e.origin.target.id === 'draw-canvas') {
        console.log('画布空白(左键)');
        clearActivedMenuNode();
        clearActiveToolNode();

        closeContextMenu();
      }
    });

    this.app.on([PointerEvent.MENU], (e) => {
      const {
        clearActivedMenuNode,
        clearActiveToolNode,
        setShowContextMenu,
        setContextMenuPosition,
      } = useNodeToolAndMenuStore();
      if (e.target.tag === 'App' && e.origin.target.id === 'draw-canvas') {
        console.log('画布空白(右键)');
        clearActivedMenuNode();
        clearActiveToolNode();

        //唤起菜单
        const { clientY, clientX } = e.origin;
        setContextMenuPosition(clientX, clientY);
        setShowContextMenu(true);
      }
    });

    // this.listenAppProperty();
  }

  public getApp() {
    return this.app;
  }

  private ruler!: Ruler;
  private dotMatrix!: DotMatrix;

  //构建ground层
  drawGround() {
    //初始化尺
    this.ruler = new Ruler(this.app, {
      theme: 'dark', //dark||light
      enabled: true, //启用
      unit: 'px', //px||mm||cm||in||pt||pc||em||rem||vw||vh||vmin||vmax
    });

    const colorMode = useColorMode();

    watch(
      () => colorMode.value,
      (newVal) => {
        this.ruler.changeTheme(newVal);
      }
    );

    //初始化点阵
    this.dotMatrix = new DotMatrix(this.app, {
      dotSize: 1.5, //点的大小（像素）
      dotColor: '#999', //点的颜色
      dotMatrixGapMap: [10, 25, 50, 100, 200], //点阵间距的可选值
      targetDotMatrixPixel: 50, //目标点阵像素,期望的点阵显示间距
    });
    this.dotMatrix.enableDotMatrix(true);
  }

  handleRuler() {
    this.ruler.enabled = !this.ruler.enabled;
  }
  handleDotMatrix() {
    this.dotMatrix.enable = !this.dotMatrix.enable;
  }

  private miniMapApp!: Leafer;
  private miniMapScale = 0.1;
  //初始化小地图
  initMiniMap(container: HTMLDivElement) {
    console.info('初始化小地图');
    this.miniMapApp = new Leafer({
      view: container,
      width: this.app.width! * this.miniMapScale,
      height: this.app.height! * this.miniMapScale,
    });
    this.miniMapApp.scale = this.miniMapScale;

    this.app.tree.on(ChildEvent.ADD, (e) => {
      const targetNode = e.target.clone();
      e.target.mapEl = targetNode;
      console.log('add-event', targetNode);
      this.miniMapApp.add(targetNode);
    });
    this.app.tree.on(PropertyEvent.CHANGE, (e) => {
      // console.log('change-event', e);

      //监听属性改变，元素变形、拖拽等
      if (e.target.mapEl) {
        e.target.mapEl.destroy();
        e.target.mapEl = null;
        const targetNode = e.target.clone();
        e.target.mapEl = targetNode;
        this.miniMapApp.add(targetNode);
      }
    });
  }

  addNodeOnTree() {}

  addRect(props?: IRectInputData) {
    const rect = createRect(props || {});
    this.app.tree.add(rect);

    this.activeNodeContextMenu(rect);
    this.listenNodeMove(rect);

    return rect;
  }
  addText(props?: ITextInputData) {
    const text = createText(props || {});
    this.app.tree.add(text);

    this.activeNodeContextMenu(text);
    this.listenNodeMove(text);
    return text;
  }
  addImage(props?: IImageInputData) {
    const image = createImage(props || {});
    this.app.tree.add(image);

    this.activeNodeContextMenu(image);
    this.listenNodeMove(image);

    return image;
  }

  /**
   * 带动画效果的回到原点方法
   * @param duration 动画持续时间（毫秒）
   * @param easing 缓动函数
   */
  animateToOrigin(duration = 1, easing: IAnimateEasing = 'ease-out') {
    if (!this.app.zoomLayer) return;

    const currentX = this.app.zoomLayer.x;
    const currentY = this.app.zoomLayer.y;

    // 如果已经在原点，不需要动画
    if (currentX === 0 && currentY === 0) return;

    // 使用 leaferjs 的动画 API
    this.app.zoomLayer.animate(
      {
        x: 0,
        y: 0,
      },
      {
        duration: duration,
        easing: easing,
      }
    );
  }

  //右键菜单
  activeNodeContextMenu(node: UI) {
    const { setActivedMenuNode, setActiveToolNode, setShowContextMenu, setContextMenuPosition } =
      useNodeToolAndMenuStore();

    node.on(PointerEvent.MENU, (e) => {
      console.log('右键菜单触发', node);
      setActivedMenuNode(node);
      setShowContextMenu(true);
      const { clientX, clientY } = e.origin;
      setContextMenuPosition(clientX, clientY);

      e.stop();
    });
    node.on([PointerEvent.TAP], (e) => {
      console.log('左键点击事件触发', node.tag);
      setActiveToolNode(node);
      e.stop();
    });
  }

  /**
   * 销毁Draw实例，清理资源
   */
  destroy() {
    // 销毁快捷键
    this.contextMenuTools?.destroyHotkeys();
    console.log('Draw instance destroyed');
  }

  /**
   * 监听App的属性变化
   */
  listenAppProperty() {
    const menuStore = useNodeToolAndMenuStore();
    this.app.tree.on(
      PropertyEvent.CHANGE,
      throttle((e: PropertyEvent) => {
        // console.log('PropertyEvent.CHANGE-app-tree', e);
        const node = e.target as UI;
        //如果当前元素是选中的元素，则更新位置
        if (menuStore.focusNode === node) {
          menuStore.setFocusNodePosition(node);
        }
      }, 16)
    );
  }

  /**
   * 元素移动事件
   */
  listenNodeMove(node: UI) {
    const menuStore = useNodeToolAndMenuStore();
    node.on(PointerEvent.MOVE, (e) => {
      console.log('listenNodeMove-e', e);
      if (menuStore.focusNode === node) {
        menuStore.setFocusNodePosition(node);
      }
    });
  }
}

export default Draw;
