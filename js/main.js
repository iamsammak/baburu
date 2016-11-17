require("../css/application.scss");

import Game from './game';
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', function(){
  // testing1.0
  // const canvasEl = document.getElementById("game-canvas");
  // const ctx = canvasEl.getContext("2d");
  // const game = new Game();
  // new GameView(game, ctx).start();

  // new testing2.0
  new GameView();
});
