import MovingObject from './moving_object';
import Cannonball from './cannonball';
import Physics from './physics';


class Cannon extends MovingObject{
  constructor(options) {
    options.radius = Cannon.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = Cannon.COLOR;
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
    console.log(
      {
        x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
        y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
      }
    );
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

    ctx.fillStyle = Cannon.COLOR;
    ctx.beginPath();
    ctx.arc(this.pos[0],this.pos[1], this.radius, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStyle = Cannon.COLOR;
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
    let startVel = [0.1, 0.1];

    const relVel = Physics.scale(
      Physics.direction(startVel),
      Cannonball.SPEED
    );
    console.log(Physics.direction(startVel));
    console.log(Cannonball.SPEED);
    // debugger;

    const cannonballVel = [
      relVel[0] + startVel[0], relVel[1] + startVel[1]
    ];

    const cannonball = new Cannonball({
      pos: this.pos,
      vel: cannonballVel,
      color: this.color,
      game: this.game
    });

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

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

Cannon.RADIUS = 15;
Cannon.COLOR = '#FFE041';

export default Cannon;
