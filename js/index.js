const Game = require('./game');
const GameView = require('./game_view');

window.addEventListener("DOMContentLoaded", function(event) {

  const canvasEl = document.getElementById('game-canvas');
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  window.highScores = [];
  window.highScore = 0;

  function soundFnc(src){

    let sound = document.getElementById("sound");
    sound.setAttribute("id", 'sound');
    sound.src = src;
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    sound.volume = 0.01;
    /* start muted */
    sound.muted = true;
    function play(){
        sound.play();
    }
    function stop(){
        sound.pause();
    }
    return sound;
  }



  function bgSoundFnc(src){
    let bgsound = document.getElementById("bgsound");
    bgsound.setAttribute("id", 'bgsound');
    bgsound.src = src;
    bgsound.setAttribute("preload", "auto");
    bgsound.setAttribute("controls", "none");
    bgsound.style.display = "none";
    bgsound.volume = 0.03;
    /* start muted */
    bgsound.muted = true;
    function play(){
        bgsound.play();
    }
    function stop(){
        bgsound.pause();
    }
    return bgsound;

  }

  let ctx = canvasEl.getContext("2d");
  let game = new Game(ctx, soundFnc);
  let gameV = new GameView(game, ctx, bgSoundFnc);


  let started = false;
  let startPauseButton = document.getElementById("start-pause");

  startPauseButton.addEventListener("click", () => {
    if(!started){
      gameV.start();
      started = true;
      startPauseButton.classList.remove('fa-play');
      startPauseButton.classList.add('fa-pause');
    } else {
      gameV.stop();
      started= false;
      startPauseButton.classList.remove('fa-pause');
      startPauseButton.classList.add('fa-play');
    }
  });

  let newGameButton = document.getElementById("new-game");
    newGameButton.addEventListener("click", () => {
      started = false;
      gameV.stop();

      ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
      game = new Game(ctx, soundFnc);
      gameV = new GameView(game, ctx, bgSoundFnc);

      gameV.setup();
  });



  let bgAudioNode = document.getElementById("bgsound");
  let audioNode = document.getElementById("sound");

  let volume = document.getElementById("volume");
  
  volume.addEventListener("click", ()=>{
    if (!audioNode.muted) {
      bgAudioNode.muted = true;
      audioNode.muted = true;
      volume.classList.remove('fa-volume-up');
      volume.classList.add('fa-volume-off');
    } else {
      bgAudioNode.muted = false;
      audioNode.muted = false;
      volume.classList.remove('fa-volume-off');
      volume.classList.add('fa-volume-up');
    }
  });

  setTimeout(function(){
      gameV.setup();}, 300);

 });
