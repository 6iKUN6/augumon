import { Leafer } from 'leafer-ui';

class Sky {
  private sky: Leafer;
  constructor() {
    this.sky = new Leafer({});
  }

  public getSky() {
    return this.sky;
  }
}

export default Sky;
