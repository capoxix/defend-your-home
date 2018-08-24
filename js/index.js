const Game = require('./game');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", function(event) {
  const canvasEl = document.getElementById('game-canvas');
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  window.highScores = [];

  let started = false;
  function soundFnc(src){

    let sound = document.getElementById("sound");
    sound.setAttribute("id", 'sound');
    sound.src = src;
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    sound.volume = 0.01;
    function play(){
        sound.play();
    }
    function stop(){
        sound.pause();
    }
    return sound;
  }

  let ctx = canvasEl.getContext("2d");
  let game = new Game(ctx, soundFnc);
  let gameV = new GameView(game, ctx);
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
      started = false;
      gameV.stop();

      ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
      game = new Game(ctx, soundFnc);
      gameV = new GameView(game, ctx);

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
 });
