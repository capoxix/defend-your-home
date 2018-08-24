const Cannon = require('./cannon');
const CannonBall = require('./cannon_ball');
const Enemy = require('./enemy');

// import Cannon from  './cannon.js';
// import CannonBall from './cannon_ball.js';
// import Enemy from './enemy.js';

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.cannon = new Cannon({pos: [120, 525], game: this, ctx: this.ctx});
    this.highScores = [];
    this.cannonballs = [];
    this.enemies = [];
    // this.addEnemies();

    this.score = 1;
    this.windVelocity = (Math.random() * 2).toFixed(2);
    this.windAngle = Math.round(Math.random() * 360);
    this.soundFnc = this.soundFnc.bind(this);
    this.crashSound = this.soundFnc('sounds/explosion.mp3');
    // debugger;
    this.changeWind = this.changeWind.bind(this);
    this.score = 0;
    this.cannonBallsCount = 0;
    // this.addCannonBalls();
    this.enemiesVelocity = [-0.5 + (-this.score/70),0];
    this.endGame = this.endGame.bind(this);
    this.endGameMsg = '';
    // this.highScores = [];
    // this.muteVolume = this.muteVolume.bind(this);
    // this.addVolumeButton();
    // this.addVolumeEventListener = this.addVolumeEventListener.bind(this);
    // this.addVolumeEventListener();

  }
  addCannonBalls(){
    // this.game.cannonBallsCount += 1;
    let that = this;
    this.cannonBallCreations = setInterval(function(){
      that.cannonBallsCount += 1;
    }, 1000);
  }

  cancelCannonBalls(){
    clearInterval(this.cannonBallCreations);
  }

  changeWind(){
    this.windVelocity = (Math.random() * 2).toFixed(2);
    this.windAngle = Math.round(Math.random() * 360);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  allObjects() {
    return [].concat(this.cannon, this.cannonballs, this.enemies);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (!(obj1 instanceof Cannon || obj2 instanceof Cannon)) {
          // if (obj1 instanceof CannonBall && obj2 instanceof Enemy)
          if((obj1 instanceof Enemy && obj2 instanceof CannonBall)
          || obj2 instanceof Enemy && obj1 instanceof CannonBall){
            if (obj1.isCollidedWith(obj2)) {
              const collision = obj1.collidedWith(obj2);
              if (collision) return;
            }
          }
        }
      }
    }
  }

  remove(object){
    if (object instanceof CannonBall){
      if(this.cannonballs.indexOf(object)!== -1)
        this.cannonballs.splice(this.cannonballs.indexOf(object), 1);
    }else if (object instanceof Enemy){
      if (this.enemies.indexOf(object) !== -1)
        this.enemies.splice(this.enemies.indexOf(object), 1);
    }
  }

  add(object){
    if (object instanceof CannonBall){
      this.cannonballs.push(object);
    }
    if (object instanceof Enemy){
      this.enemies.push(object);
    }
  }

  addEnemies(){
    let that = this;
    this.enemiesCreation = setInterval(function(){
      that.add(new Enemy({pos: [950,475], game: that, vel: that.enemiesVelocity}));
    }, 3000);
  }

  cancelEnemies(){
    clearInterval(this.enemiesCreation);
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  step(delta){
    this.moveObjects(delta);
    this.checkCollisions();
  }

  draw(ctx){
    let background = document.getElementById("background");
    ctx.drawImage(background, 0,0,Game.DIM_X, Game.DIM_Y);
    this.drawWind();
    this.drawCastle();
    this.drawScore();
    this.drawEndGame();
    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
  }

  drawWind(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.windVelocity, 465, 90);

    this.ctx.save();
    this.ctx.translate(475,125);
    this.ctx.rotate((this.windAngle-90-180) * Math.PI/180);

    let arrow = document.getElementById('arrow');
    this.ctx.fillStyle = "yellow";
    this.ctx.drawImage(arrow, -25,-25, 50,50);
    this.ctx.restore();
  }

  drawCastle(){
    let castle = document.getElementById("castle");
    this.ctx.drawImage(castle, 0, 400, 150,150);
  }

  drawScore(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Current Score: "+this.score, 320, 50);
  }

  endGame(){
    // console.log("YOU LOSE ENEMY REACHED YOU!");
    // this.ctx.font = "16px Arial";
    // this.ctx.fillStyle = "black";
    // this.ctx.fillText("YOU LOSE ENEMY REACHED YOU", 320, 70);
    this.endGameMsg = "YOU LOSE ENEMY REACHED YOU!";
    // console.log("YOU LOSE!!!");
    window.clearInterval(this.enemiesCreation);
    window.cancelAnimationFrame(window.requestId);
    window.clearInterval(this.cannonBallCreations);

    this.enemies = [];
    this.cannonballs = [];
    window.highScores.push(this.score);

    // let audioNode = document.getElementById("sound");
    // let volumeMute = document.getElementById("volume-mute");
    //
    // volumeMute.addEventListener("click", ()=>{
    //   if (!audioNode.muted)
    //     audioNode.muted = true;
    // });
    //
    // let volumeOpen = document.getElementById("volume-up");
    // volumeOpen.addEventListener("click",()=>{
    //   if (audioNode.muted)
    //   audioNode.muted = false;
    // });
  }

  drawEndGame(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(this.endGameMsg, 320, 70);
  }


  // nextLevel(){
  //
  // }

  soundFnc(src){
    // debugger;
    this.sound = document.createElement("audio");
    this.sound.setAttribute("id", 'sound');
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = 0.01;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    };
    this.stop = function(){
        this.sound.pause();
    };
    return this.sound;
  }
}




Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.BG_COLOR = 'lightblue';

// export default Game;
module.exports = Game;
