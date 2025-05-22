import { Leafer } from 'leafer-ui';
import type { BaseProps } from './props';

interface SkyProps extends BaseProps {
  [key: string]: any;
}

class Sky {
  private sky: Leafer;
  constructor(props: SkyProps) {
    this.sky = new Leafer({
      width: props.width,
      height: props.height,
      // view: props.view,
      fill: props.fill,
    });
  }

  public getSky() {
    return this.sky;
  }
}

export default Sky;
