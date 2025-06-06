import { Leafer } from 'leafer-ui';
import type { BaseProps } from './props';

interface SkyProps extends BaseProps {
  [key: string]: any;
}

class Sky {
  private sky: Leafer;
  constructor(props: SkyProps) {
    const { width, height, fill, type } = props;
    this.sky = new Leafer({
      width,
      height,
      // view: props.view,
      fill,
      type: type || 'viewport',
    });
  }

  public getSky() {
    return this.sky;
  }
}

export default Sky;
