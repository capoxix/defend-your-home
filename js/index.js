const Game = require('./game');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", function(event) {
  const canvasEl = document.getElementById('game-canvas');
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
  // let game = new Game();
  // game.startGame();
 });
