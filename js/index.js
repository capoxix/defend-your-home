const Game = require('./game');
const GameView = require('./game_view');

// import Game from './game.js';
// import GameView from './game_view.js';

document.addEventListener("DOMContentLoaded", function(event) {
  const canvasEl = document.getElementById('game-canvas');
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  window.highScores = [];

  let started = false;
  // let muted = false;

  let ctx = canvasEl.getContext("2d");
  let game = new Game(ctx);
  let gameV = new GameView(game, ctx);//.setup();//.start();
  gameV.setup();

  let startButton = document.getElementById("start");
  startButton.addEventListener("click", () => {
    if(!started){
      gameV.start();
      started = true;
    }
  });

  let newGameButton = document.getElementById("new-game");
    newGameButton.addEventListener("click", () => {

      /**/
      started = false;
      gameV.stop();

      ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
      game = new Game(ctx);
      gameV = new GameView(game, ctx);
      // audioNode = document.getElementById("sound");
      // audioNode.parentNode.removeChild(audioNode);
      // console.log("game", game);
      // console.log("gameview", gameV);
      // console.log(ctx);
      gameV.setup();
  });

  let stopButton = document.getElementById("stop");
  stopButton.addEventListener("click", () => {
    if(started) {
      gameV.stop();
      started= false;
    }
  });

  let audioNode = document.getElementById("sound");
  let volumeMute = document.getElementById("volume-mute");

  volumeMute.addEventListener("click", ()=>{
    if (!audioNode.muted)
      audioNode.muted = true;
  });

  let volumeOpen = document.getElementById("volume-up");
  volumeOpen.addEventListener("click",()=>{
    if (audioNode.muted)
    audioNode.muted = false;
  });




  // let game = new Game();
  // game.startGame();
 });
