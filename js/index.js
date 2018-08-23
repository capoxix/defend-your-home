const Game = require('./game');
const GameView = require('./game_view');

// import Game from './game.js';
// import GameView from './game_view.js';

document.addEventListener("DOMContentLoaded", function(event) {
  const canvasEl = document.getElementById('game-canvas');
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  let started = false;

  const ctx = canvasEl.getContext("2d");
  const game = new Game(ctx);
  let gameV = new GameView(game, ctx);//.setup();//.start();
  gameV.setup();

  let startButton = document.getElementById("start");
  startButton.addEventListener("click", () => {
    if(!started){
      gameV.start();
      started = true;
    }
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
    console.log("muting");
    console.log(audioNode);
    audioNode.muted = true;
  });

  let volumeOpen = document.getElementById("volume-up");
  volumeOpen.addEventListener("click",()=>{
    audioNode.muted = false;
  });




  // let game = new Game();
  // game.startGame();
 });
