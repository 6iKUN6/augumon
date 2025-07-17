import { App, Leafer, ChildEvent, PropertyEvent } from 'leafer-ui';
import type { IRectInputData, ITextInputData, IImageInputData, IAnimateEasing } from 'leafer-ui';
import { Editor } from '@leafer-in/editor';
import '@leafer-in/viewport';
import '@leafer-in/animate';
import '@leafer-in/text-editor';
import { Ruler } from 'leafer-x-ruler';
import { DotMatrix } from 'leafer-x-dot-matrix';

import { createRect, createText, createImage } from '../nodes/createNode';

class Draw {
  private app: App;

  constructor(appView: object | string) {
    this.app = new App({
      view: appView,
      sky: { type: 'editor' }, //编辑层
      tree: { type: 'design' }, //主要内容层
      ground: { type: 'viewport' }, //背景层
    });
    this.app.sky.add((this.app.editor = new Editor()));
    this.drawGround();
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
    console.log('初始化小地图');
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
      console.log('change-event', e);

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

    return rect;
  }
  addText(props?: ITextInputData) {
    const text = createText(props || {});
    this.app.tree.add(text);

    return text;
  }
  addImage(props?: IImageInputData) {
    const image = createImage(props || {});
    this.app.tree.add(image);

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
}

export default Draw;
