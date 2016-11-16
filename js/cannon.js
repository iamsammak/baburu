import MovingObject from './moving_object';
import Cannonball from './cannonball';
import Utils from './utils';


class Cannon extends MovingObject {
  constructor(options) {
    options.radius = Cannon.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = Cannon.COLOR;
    super(options);
  }

  fireCannonball() {
    const norm = Utils.norm(this.vel);

    const relVel = Utils.scale(
      Utils.direction(this.vel),
      Cannonball.SPEED
    );

    const cannonballVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    const cannonball = new Cannonball({
      pos: this.pos,
      vel: cannonballVel,
      color: this.color,
      game: this.game
    });

    this.game.add(cannonball);
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

Cannon.RADIUS = 15;
Cannon.COLOR = '#FFE041';

export default Cannon;
