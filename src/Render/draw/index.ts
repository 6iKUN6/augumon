import { App, type Leafer } from 'leafer-ui';
import Ground from './ground';
import Sky from './sky';
import Tree from './tree';

class Draw {
  private app: App;
  private ground: Ground;
  private tree: Tree;
  private sky: Sky;

  private groundApp: Leafer;
  private treeApp: Leafer;
  private skyApp: Leafer;
  constructor() {
    this.app = new App({});
    this.ground = new Ground({});
    this.sky = new Sky({});
    this.tree = new Tree({});

    this.app.add(this.ground.getGround());
    this.app.add(this.tree.getTree());
    this.app.add(this.sky.getSky());

    this.groundApp = this.ground.getGround();
    this.treeApp = this.tree.getTree();
    this.skyApp = this.sky.getSky();
  }
  public getApp() {
    return this.app;
  }
}

export default Draw;
