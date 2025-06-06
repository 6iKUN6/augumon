import { App, type Leafer } from 'leafer-ui';
import { Editor } from '@leafer-in/editor';
import '@leafer-in/viewport';

import Ground from './ground';
import Sky from './sky';
import Tree from './tree';

class Draw {
  private app: App;
  private ground: Ground;
  private tree: Tree;
  private sky: Sky;

  private groundApp: Leafer; //背景层
  private treeApp: Leafer; //主要内容层
  private skyApp: Leafer; //编辑层
  constructor(appView: object | string) {
    this.app = new App({
      view: appView,
    });
    this.ground = new Ground({});
    this.sky = new Sky({});
    this.tree = new Tree({});

    this.app.add(this.ground.getGround());
    this.app.add(this.tree.getTree());
    this.app.add(this.sky.getSky());

    this.groundApp = this.ground.getGround();
    this.treeApp = this.tree.getTree();
    this.skyApp = this.sky.getSky();
    this.app.sky.add((this.app.editor = new Editor()));
  }
  public getApp() {
    return this.app;
  }

  addNodeOnTree() {}
}

export default Draw;
