import React from 'react';
import Game from './game';

class GameView {
  // testing 1.0
  // constructor(game, ctx) {
  //   this.ctx = ctx;
  //   this.game = game;
  //   this.cannon = this.game.addCannon();
  // }

// comment in for testing2.0
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext('2d');
    this.game = new Game();

    this.view = "pre-game";
    this.keySpaceHandler = this.keySpaceHandler.bind(this);
    document.addEventListener("keydown", this.keySpaceHandler, false);

    this.cannon = this.game.addCannon();
  }

  keySpaceHandler(e) {
    if (e.keyCode === 32) {
      this.handleSpace();
    }
  }

  handleSpace() {
    if (this.view === "pre-game") {
      this.view = "game";
      this.resetGame();
    } else if (this.view === "post-game") {
      this.view = "pre-game";
      // const preGame = document.getElementById('pre-game');
      // const postGame = document.getElementById('post-game');
      // preGame.className = "";
      // postGame.className = "hidden";
    }
  }

  resetGame() {
    // const preGame = document.getElementById('pre-game');
    // preGame.className = "hidden";

    this.game = new Game();

    this.start();
  }

  // keySpaceFireHandler() {
  //   const cannon = this.cannon;
  //
  //   key("space", () => { cannon.fireCannonball(); });
  // }

  start() {
    // this.keySpaceFireHandler();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    if (this.game.isGameOver()) {
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
