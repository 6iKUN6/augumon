import { Leafer } from 'leafer-ui';
import type { BaseProps } from './props';

interface TreeProps extends BaseProps {
  [key: string]: any;
}

class Tree {
  private tree: Leafer;
  constructor(props: TreeProps) {
    const { width, height, fill, type } = props;
    this.tree = new Leafer({
      width,
      height,
      // view: props.view,
      fill,
      type: type || 'viewport',
    });
  }

  public getTree() {
    return this.tree;
  }
}

export default Tree;
