import MovingObject from './moving_object';

class Cannonball extends MovingObject {
  constructor(options) {
    options.radius = Cannonball.RADIUS;
    super(options);
    this.isWrappable = false;
  }
}

Cannonball.RADIUS = 13;
Cannonball.SPEED = 15;

export default Cannonball;
