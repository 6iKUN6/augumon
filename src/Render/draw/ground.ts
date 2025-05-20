import { Leafer } from 'leafer-ui';

class Ground {
  private ground: Leafer;
  constructor() {
    this.ground = new Leafer();
  }

  public getGround() {
    return this.ground;
  }
}

export default Ground;
