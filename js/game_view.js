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
    let width = Math.min(document.documentElement.clientWidth, window.innerWidth);
    let height = Math.min(document.documentElement.clientHeight, window.innerHeight);
    this.canvas.width = width;
    this.canvas.height = height;
    this.gameWidth = this.canvas.width;
    this.gameHeight = this.canvas.height;


    this.ctx = this.canvas.getContext('2d');
    $(".white-screen").fadeOut(500);

    this.game = new Game(this.gameWidth, this.gameHeight);
    this.view = "pre-game";
    this.inPlay = true;

    this.keySpaceHandler = this.keySpaceHandler.bind(this);
    // document.addEventListener("keydown", this.keyEnterHandler, false);
    document.addEventListener("keydown", this.keySpaceHandler, false);

    this.cannon = this.game.addCannon();
  }

  keySpaceHandler(e) {
    if (e.keyCode === 32) {
      this.handleSpace();
    }
  }

  // game pause logic
  handleEnter() {
    this.inPlay = !this.inPlay;
    $(".back-shadow").toggle();
    $("#pause-screen").toggle();
  }

  keyEnterHandler(e) {
    if (e.keyCode === 13) {
      this.handleEnter();
    }
  }

  // game start logic
  handleSpace() {
    if (this.view === "pre-game") {
      this.view = "game";
      console.log(`${this.view}`);
      // debugger;
      $(".back-shadow").fadeOut();
			$("#start-screen").fadeOut();
      this.resetGame();
    } else if (this.view === "post-game") {
      this.view = "pre-game";
      $(".back-shadow").fadeOut();
      $("#game-won").fadeOut();
      console.log(`${this.view}`);
      // const preGame = document.getElementById('pre-game');
      // const postGame = document.getElementById('post-game');
      // preGame.className = "";
      // postGame.className = "hidden";
      this.resetGame();
    }
  }

  resetGame() {
    // const preGame = document.getElementById('pre-game');
    // preGame.className = "hidden";
    // debugger;
    this.game = new Game(this.gameWidth, this.gameHeight);

    this.start();
  }


  start() {
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
      console.log("Game Over");
      this.end();
      // comment this back in after you get the modal working
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
    $(".back-shadow").fadeIn();
    $("#game-won").fadeIn();
    this.view = "post-game";
    console.log(`${this.view}`);
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
