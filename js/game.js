import Bubble from './bubble';
import Cannonball from './cannonball';
import Cannon from './cannon';
import Physics from './physics';

class Game {
  constructor() {
    this.bubbles = [];
    this.cannonballs = [];
    this.cannons = [];

    this.addBubbles();
    this.addCannon();

    this.width = Game.DIM_X;
    this.height = Game.DIM_Y;
    this.level = {
      x: 4,
      y: 83,
      width: 0,
      height: 0,
      tilewidth: 30,
      tileheight: 30,
      radius: 15
    };
  }

  add(incomingObj) {
    // debugger;
    if (incomingObj instanceof Bubble) {
      this.bubbles.push(incomingObj);
    } else if (incomingObj instanceof Cannonball) {
      this.cannonballs.push(incomingObj);
    } else if (incomingObj instanceof Cannon) {
      this.cannons.push(incomingObj);
    } else {
      throw "how did you even get here?";
    }
  }

  // write num of bubbles function

// logic of this may change, depending on the level
  addBubbles() {
    for (let i = 0; i < Game.NUM_BUBBLES; i++) {
      let newBubble = new Bubble({ game: this });
      if (this.overlapOnCreation(newBubble)) {
        newBubble = new Bubble({ game: this });
      }

      this.add(newBubble);
      console.log(newBubble);
    }
  }

  allThingsOnBoard() {
    return [].concat(this.cannons, this.bubbles, this.cannonballs);
  }

  allMoveableObjects() {
    return [].concat(this.bubbles, this.cannonballs);
  }

  // to ensure bubbles are initialized separated from one another
  overlapOnCreation(bubble) {
    let overlapped = false;
    for(let i =0; i < this.allThingsOnBoard().length; i++) {
      if (this.allThingsOnBoard()[i].iscollidedWith(bubble)){
        overlapped = true;
      }
    }
    return overlapped;
  }

  addCannon() {
    const cannon = new Cannon({
      pos: [500, 300],
      // for now left it as randomPosition
      // pos: this.randomPosition(),
      game: this
    });

    this.add(cannon);

    return cannon;
  }

  checkCollisions() {
    // const allObjects = this.allThingsOnBoard();
    const allObjects = this.allMoveableObjects(); //then everything just flies over cannon
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const object1 = allObjects[i];
        const object2 = allObjects[j];
        if (object1.iscollidedWith(object2)) {
          const collision = object1.collideWith(object2);
          // debugger;
          if (collision) return;
          Physics.collide(object1, object2);
        }
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BACKGROUND_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allThingsOnBoard().forEach((object) => {
      object.draw(ctx);
    });
  }

  isOutofBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    this.allMoveableObjects().forEach((object) => {
      object.move(delta);
    });
  }

  randomPosition() {
    return [ Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  remove(object) {
    if (object instanceof Bubble) {
      this.bubbles.splice(this.bubbles.indexOf(object), 1);
    } else if (object instanceof Cannonball) {
      this.cannonballs.splice(this.cannonballs.indexOf(object), 1);
    } else if (object instanceof Cannon) {
      this.cannon.splice(this.cannon.indexOf(object), 1);
    } else {
      throw "how...did you get here to be removed?";
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
    this.checkCannonballs();
  }

  // change the lifespan of cannonballs
  checkCannonballs() {
    let currentTime = Physics.currentTime();
    this.cannonballs.forEach((cannonball) => {
      if (currentTime - cannonball.createdAt > 1500) {
        this.remove(cannonball);
      }
    });
  }

  wrap(pos) {
    return [
      Physics.wrap(pos[0], Game.DIM_X), Physics.wrap(pos[1], Game.DIM_Y)
    ];
  }

  isGameOver() {
    // comment out to test cannonball fading
    // return (this.bubbles.length === 0);
  }

}


Game.BACKGROUND_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;

// will need to put level logic for Num of bubbles
Game.NUM_BUBBLES = 10;


export default Game;
