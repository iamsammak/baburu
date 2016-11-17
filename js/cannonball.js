import MovingObject from './moving_object';
import Physics from './physics';

class Cannonball extends MovingObject {
  constructor(options) {
    options.radius = Cannonball.RADIUS;
    super(options);

    this.isWrappable = false;
    this.createdAt = Physics.currentTime();
  }

  bounce(x, y, otherObject) {
    this.vel = [x, y];
    this.pos = [this.pos[0] + x, this.pos[1] + y];
  }
}

// upon cannonball creation give it a createdAt time and then during every animate step
// compare the cannonball's creation time to the current time and if the time execeeds a limit
// then remove the cannonball

Cannonball.RADIUS = 13;
Cannonball.SPEED = 1.5;

export default Cannonball;
