import Utils from './utils';

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = true;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
  ctx.fill();
  }

  move(timeDelta) {
    const time = timeDelta / NORMAL_FRAME_TIME_DELTA;
    const moveX = this.vel[0] * time;
    const moveY = this.vel[1] * time;

    this.pos = [this.pos[0] + moveX, this.pos[1] + moveY];

    // got to write bounce off the wall function
    if (this.game.isOutofBounds(this.pos)) {
      if (this.isWrappable) {
        // need to replace this logic with bounceOff later
        // bouncing off the wall only changes direction, velocity stays the same
        this.pos = this.game.wrap(this.pos);
      } else {
        // actually might make the cannonballs bouncable too
        // which means no need for removing
        this.remove();
      }
    }
  }

  remove() {
    this.game.remove(this);
  }

  iscollidedWith(otherObject) {
    const distance = Utils.dist(this.pos, otherObject.pos);
    return distance < (this.radius + otherObject.radius); //true or false
  }

  collideWith(otherObject) {
    // will need to add this logic
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

export default MovingObject;
