class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.cannon = this.game.addCannon();
  }

  bindKeyHandlers() {
    const cannon = this.cannon;

    key("space", () => { cannon.fireCannonball(); });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    if (this.isGameOver()) {
      // stopAnimation
      console.log("Game Over");
      // comment this back in after you get the modal working
      this.end();
      // requestAnimationFrame(this.animate.bind(this));
    } else {
      //every call to animate requests causes another call to animate
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  isGameOver() {
    return (this.game.bubbles.length === 0);
  }

  end() {
    // stop animation
    // open gameover modal
    // logic to close gameover modal then option to play again (repopulate board)
  }
}

GameView.MOVES = {
  // "w": [ 0, 0],
  // "a": [0,  0],
  // "s": [ 0,  0],
  // "d": [ 0,  0]
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
  "up": [ 0, -1],
  "left": [-1,  0],
  "down": [ 0,  1],
  "right": [ 1,  0]
};


export default GameView;
