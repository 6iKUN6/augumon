import { Leafer } from 'leafer-ui';
import type { BaseProps } from './props';

interface GroundProps extends BaseProps {
  [key: string]: any;
}

class Ground {
  private ground: Leafer;
  constructor(props: GroundProps) {
    this.ground = new Leafer({
      width: props.width,
      height: props.height,
      // view: props.view,
      fill: props.fill,
    });
  }

  public getGround() {
    return this.ground;
  }
}

export default Ground;
