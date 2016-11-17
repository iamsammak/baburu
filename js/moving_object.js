import Physics from './physics';

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = true;
    // maybe add a this.alive = true?
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  iscollidedWith(otherObject) {
    const distance = Physics.dist(this.pos, otherObject.pos);
    return distance < (this.radius + otherObject.radius); //true or false
  }

  collideWith(otherObject) {
    // will need to add this logic
  }

  move(timeDelta) {
    timeDelta = timeDelta || 1;

    if (this.pos[0] - this.radius <= 0) {
      this.pos[0] = 0 + this.radius;
      this.vel[0] = this.vel[0] * -1;
    }
    else if (this.pos[0] + this.radius >= this.game.width) {
      this.pos[0] = this.game.width - this.radius;
      this.vel[0] = this.vel[0] * -1;
    }

    if (this.pos[1] - this.radius <= 0) {
      this.pos[1] = 0 + this.radius;
      this.vel[1] = this.vel[1] * -1;
    }
    else if (this.pos[1] + this.radius >= this.game.height) {
      this.pos[1] = this.game.height - this.radius;
      this.vel[1] = this.vel[1] * -1;
    }
    //
    const time = timeDelta / NORMAL_FRAME_TIME_DELTA;
    const moveX = this.vel[0] * time;
    const moveY = this.vel[1] * time;

    this.pos = [this.pos[0] + moveX, this.pos[1] + moveY];

    // this.pos = [
    //   this.pos[0] + timeDelta/20 * this.vel[0],
    //   this.pos[1] + timeDelta/20 * this.vel[1]
    // ];

    // got to write bounce off the wall function
    // if (this.game.isOutofBounds(this.pos)) {
    //   if (this.isWrappable) {
    //     // need to replace this logic with bounceOff later
    //     // bouncing off the wall only changes direction, velocity stays the same
    //     this.pos = this.game.wrap(this.pos);
    //   } else {
    //     // actually might make the cannonballs bouncable too
    //     // which means no need for removing
    //     this.remove();
    //   }
    // }
  }

  remove() {
    // debugger;
    // why upon collision are you removing two bubbles and one cannonball
    // instead of one cannonball and one bubble
    this.game.remove(this);
  }


}



const NORMAL_FRAME_TIME_DELTA = 1000/60;

export default MovingObject;
