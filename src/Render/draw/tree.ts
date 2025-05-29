import { Leafer } from 'leafer-ui';
import type { BaseProps } from './props';

interface TreeProps extends BaseProps {
  [key: string]: any;
}

class Tree {
  private tree: Leafer;
  constructor(props: TreeProps) {
    this.tree = new Leafer({
      width: props.width,
      height: props.height,
      // view: props.view,
      fill: props.fill,
    });
  }

  public getTree() {
    return this.tree;
  }
}

export default Tree;
