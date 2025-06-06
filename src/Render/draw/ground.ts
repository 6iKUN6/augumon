import { Leafer } from 'leafer-ui';
import type { BaseProps } from './props';

interface GroundProps extends BaseProps {
  [key: string]: any;
}

class Ground {
  private ground: Leafer;
  constructor(props: GroundProps) {
    const { width, height, fill, type } = props;
    this.ground = new Leafer({
      width,
      height,
      // view: props.view,
      fill,
      type: type || 'viewport',
    });
  }

  public getGround() {
    return this.ground;
  }
}

export default Ground;
