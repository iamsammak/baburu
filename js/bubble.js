import Utils from './utils';
import MovingObject from './moving_object';
import Cannon from './cannon';
import Cannonball from './cannonball';

const DEFAULTS = {
  COLOR: '#ca271c',
  RADIUS: 25,
  SPEED: 4
};

class Bubble extends MovingObject{
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Utils.randomVec(DEFAULTS.SPEED);
    console.log('my velocity: ', options.vel);
    super(options);
    // debugger;
  }

  collideWith(otherObject) {
    if (otherObject instanceof Cannon) {
      // replace with bounce
      otherObject.relocate();
      return true;
    } else if (otherObject instanceof Cannonball) {
      // bubble disappears, actually they both disappear, depending on the level
      // in level one they both disappear
      // in level two only the cannonball disappears
      this.remove();
      // replace with bounce
      otherObject.remove();
      return true;
    }
  }
}

export default Bubble;
