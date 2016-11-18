import MovingObject from './moving_object';
import Cannonball from './cannonball';
import Physics from './physics';


class Cannon extends MovingObject{
  constructor(options) {
    options.radius = Cannon.RADIUS;
    options.vel = options.vel || [0, 0];
    // options.color = Cannon.COLOR;
    super(options);

    this.x = this.pos[0];
    this.y = this.pos[1];
    this.angle = 90;
// debugger;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.getMousePos = this.getMousePos.bind(this);

    this.canvas = document.getElementById("game-canvas");
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("mousedown", this.onMouseDown);
  }


  // Get the mouse position
  getMousePos(canvas, e) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    let rect = canvas.getBoundingClientRect();
    // debugger;
    return {
      x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
      y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
    };
  }

  // On mouse movement
  onMouseMove(e) {
    let pos = this.getMousePos(this.canvas, e);

    let mouseangle = Physics.radToDeg(Math.atan2(this.y - pos.y, pos.x - this.x));
    // debugger;

    // Convert range to 0, 360 degrees
    if (mouseangle < 0) {
      mouseangle = 180 + (180 + mouseangle);
    }

    // setting Cannon angle
    this.angle = mouseangle;
  }

  // On mouse button click
  onMouseDown(e) {
    let pos = this.getMousePos(this.canvas, e);

    this.fireCannonball();
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    //
    // ctx.beginPath();
    // ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    // ctx.fill();

    // background circle
    ctx.fillStyle = "#7a7a7a";
    ctx.beginPath();
    ctx.arc(this.pos[0],this.pos[1], this.radius+4, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#8c8c8c";
    ctx.stroke();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0],this.pos[1], this.radius, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStyle = this.color;
    ctx.stroke();

    // draw the angle
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(
      this.pos[0] + 1.0*this.game.level.tilewidth * Math.cos(Physics.degToRad(this.angle)),
      this.pos[1] - 1.0*this.game.level.tileheight * Math.sin(Physics.degToRad(this.angle))
    );
    ctx.stroke();
  }

  fireCannonball() {
    // const norm = Physics.norm(this.vel);
    // let startVel = [0.1, -0.1];
    let startVel = [Math.cos(Physics.degToRad(this.angle)), -1*Math.sin(Physics.degToRad(this.angle))];

    const relVel = Physics.scale(
      Physics.direction(startVel),
      Cannonball.SPEED
    );
    // console.log(Physics.direction(startVel));
    // console.log(Cannonball.SPEED);
    // debugger;
    // var dt = (tframe - lastframe) / 1000;
    // player.bubble.x += dt * player.bubble.speed * Math.cos(degToRad(player.bubble.angle));
    // player.bubble.y += dt * player.bubble.speed * -1*Math.sin(degToRad(player.bubble.angle));
    // testing to figure out how to get cannonball to fire at the right angle
    // let cannonball_X = this.x + 1.0*Cannonball.SPEED * Math.cos(Physics.degToRad(this.angle));
    // let cannonball_Y = this.y + 1.0*Cannonball.SPEED * -1*Math.sin(Physics.degToRad(this.angle));


    const cannonballVel = [
      relVel[0] + startVel[0], relVel[1] + startVel[1]
    ];

    const cannonball = new Cannonball({
      pos: this.pos,
      vel: cannonballVel,
      color: this.color,
      game: this.game
    });
// debugger; // testing lifespan of cannonballs
    this.game.add(cannonball);
  }

  bounce(x, y, otherObject) {
    this.vel = [x, y];
    this.pos = [this.pos[0] + x, this.pos[1] + y];
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }
}

Cannon.RADIUS = 15;
Cannon.COLOR = '#FFE041';

export default Cannon;
