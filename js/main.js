require("../css/application.scss");

import Game from './game';
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', function(){
  let title = document.getElementById("title");
  title.innerHTML = "A Bubble Shooter Game";

  new GameView();
});
