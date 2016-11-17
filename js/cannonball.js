import MovingObject from './moving_object';

class Cannonball extends MovingObject {
  constructor(options) {
    options.radius = Cannonball.RADIUS;
    super(options);
    this.isWrappable = false;
  }

  bounce(x, y, otherObject) {
    this.vel = [x, y];
    this.pos = [this.pos[0] + x, this.pos[1] + y];
  }
}

Cannonball.RADIUS = 13;
Cannonball.SPEED = 2;

export default Cannonball;
