import { App, Rect } from 'leafer-ui';
// ResizeEvent, Platform
import { Editor } from '@leafer-in/editor';
import '@leafer-in/viewport';
import { Ruler } from 'leafer-x-ruler';

// import Ground from './ground';
// import Sky from './sky';
// import Tree from './tree';

class Draw {
  private app: App;
  // private ground: Ground;
  // private tree: Tree;
  // private sky: Sky;

  // private groundApp: Leafer; //背景层
  // private treeApp: Leafer; //主要内容层
  // private skyApp: Leafer; //编辑层
  constructor(appView: object | string) {
    this.app = new App({
      view: appView,
      sky: { type: 'editor' }, //编辑层
      tree: { type: 'design' }, //主要内容层
      ground: { type: 'viewport' }, //背景层
    });
    // this.ground = new Ground({});
    // this.sky = new Sky({});
    // this.tree = new Tree({});

    // this.app.add(this.ground.getGround());
    // this.app.add(this.tree.getTree());
    // this.app.add(this.sky.getSky());

    // this.groundApp = this.ground.getGround();
    // this.treeApp = this.tree.getTree();
    // this.skyApp = this.sky.getSky();
    this.app.sky.add((this.app.editor = new Editor()));
    this.drawGround();
  }
  public getApp() {
    return this.app;
  }

  testAdd() {
    this.app.tree.add(
      new Rect({
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        fill: 'red',
      })
    );
  }

  private ruler!: Ruler;

  drawGround() {
    this.ruler = new Ruler(this.app, {
      theme: 'dark', //dark||light
      enabled: true, //启用
      unit: 'px', //px||mm||cm||in||pt||pc||em||rem||vw||vh||vmin||vmax
      // ruleSize
      // fontSize
    });
  }

  openRuler() {
    this.ruler.enabled = !this.ruler.enabled;
  }

  addNodeOnTree() {}

  addRect() {}
  addText() {}
  addImage() {}
}

export default Draw;
