import { Leafer } from 'leafer-ui';

class Tree {
  private tree: Leafer;
  constructor() {
    this.tree = new Leafer({});
  }

  public getTree() {
    return this.tree;
  }
}

export default Tree;
