const Cannon = require('./cannon');
const CannonBall = require('./cannon_ball');
const Enemy = require('./enemy');

// import Cannon from  './cannon.js';
// import CannonBall from './cannon_ball.js';
// import Enemy from './enemy.js';

class Game {
  constructor(ctx , soundFnc){
    this.ctx = ctx;
    this.cannon = new Cannon({pos: [120, 525], game: this, ctx: this.ctx});
    this.cannonballs = [];
    this.enemies = [];
    this.windVelocity = (Math.random() * 2).toFixed(2);
    this.windAngle = Math.round(Math.random() * 360);
    this.crashSound = soundFnc('sounds/explosion.mp3');
    this.score = 0;
    this.cannonBallsCount = 0;
    this.enemiesVelocity = [-0.5 + (-this.score/50),0];
    this.endGameMsg = '';
    this.endGame = this.endGame.bind(this);
    this.changeWind = this.changeWind.bind(this);
  }
  addCannonBalls(){
    let that = this;
    this.cannonBallCreations = setInterval(function(){
      that.cannonBallsCount += 1;
    }, 1000);
  }

  cancelCannonBalls(){
    clearInterval(this.cannonBallCreations);
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
    this.ctx.drawImage(arrow, -25,-25, 50,50);
    this.ctx.restore();

    let wind = document.getElementById('wind');
    this.ctx.drawImage(wind, 455,150, 50, 50);
  }

  drawCastle(){
    let castle = document.getElementById("castle");
    this.ctx.drawImage(castle, 0, 400, 150,150);
  }

  drawScore(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Score: "+this.score, 30, 50);
  }

  endGame(){

    this.endGameMsg = "YOU LOSE ENEMY REACHED YOU!";
    window.clearInterval(this.enemiesCreation);
    window.cancelAnimationFrame(window.requestId);
    window.clearInterval(this.cannonBallCreations);

    this.enemies = [];
    this.cannonballs = [];
    window.highScores.push(this.score);

    this.displayScores();

  }

    displayScores(){
      function sortNumber(a,b) {
        return a - b;
      }
      window.highScores = window.highScores.sort(sortNumber);
      let scoreListNode = document.getElementById("scoreList");
      while (scoreListNode.firstChild) {
        scoreListNode.removeChild(scoreListNode.firstChild);
      }

      for (let i = window.highScores.length -1; i >= 0; i--) {
        let li = document.createElement('LI');
        let textNode = document.createTextNode(`${window.highScores[i]}`);
        li.appendChild(textNode);
        scoreListNode.appendChild(li);
      }
    }


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


  drawEndGame(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(this.endGameMsg, 320, 70);
  }

  // newGame(){
  //   this.endGameMsg = "";
  //   this.score = 0;
  //   this.windVelocity = (Math.random() * 2).toFixed(2);
  //   this.windAngle = Math.round(Math.random() * 360);
  // }


  // soundFnc(src){
  //   // debugger;
  //   this.sound = document.createElement("audio");
  //   this.sound.setAttribute("id", 'sound');
  //   this.sound.src = src;
  //   this.sound.setAttribute("preload", "auto");
  //   this.sound.setAttribute("controls", "none");
  //   this.sound.style.display = "none";
  //   this.sound.volume = 0.01;
  //   document.body.appendChild(this.sound);
  //   this.play = function(){
  //       this.sound.play();
  //   };
  //   this.stop = function(){
  //       this.sound.pause();
  //   };
  //   return this.sound;
  // }
}




Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.BG_COLOR = 'lightblue';

// export default Game;
module.exports = Game;
