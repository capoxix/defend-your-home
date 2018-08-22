const Cannon = require('./cannon');
const CannonBall = require('./cannon_ball');
const Enemy = require('./enemy');

// import Cannon from  './cannon.js';
// import CannonBall from './cannon_ball.js';
// import Enemy from './enemy.js';

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.cannon = new Cannon({pos: [120, 575], game: this, ctx: this.ctx});
    // this.ram = ;
    this.cannonballs = [];
    // this.enemy = new Enemy({pos: [750, 580], game: this});
    this.enemies = [];//[new Enemy({pos: [950,570], game: this})];
    // this.addEnemies();

    this.score = 1;
    this.windVelocity = (Math.random() * 2).toFixed(2);
    this.windAngle = Math.round(Math.random() * 360);
    this.sound = sound.bind(this);
    this.crashSound = new sound('sounds/explosion.mp3');
    this.changeWind = this.changeWind.bind(this);
    this.score = 0;
    this.cannonBallsCount = 0;
    this.addCannonBalls();

  }
  addCannonBalls(){
    // this.game.cannonBallsCount += 1;
    let that = this;
    setInterval(function(){
      that.cannonBallsCount += 1;
    }, 1000);
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
          if(obj1 !== obj2)
            if (obj1.isCollidedWith(obj2)) {
              const collision = obj1.collidedWith(obj2);
              if (collision) return;
            }
        }

        // if(obj1 instanceof Cannon || obj2 instanceof Cannon){
        //   console.log("check collision", obj1, obj2);
        //   if(obj1 != obj2 && !(obj1 instanceof CannonBall) && !(obj2 instanceof CannonBall)){
        //     if (obj1.isCollidedWith(obj2)){
        //       console.log("GAME OVER", obj1, "collidedwith", obj2);
        //     }
        //   }
        // }
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
    // debugger;
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
      that.add(new Enemy({pos: [950,525], game: that}));
    }, 1000);
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
    // this.ctx = ctx;
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // debugger;
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0,0, Game.DIM_X, Game.DIM_Y);
    // this.cannon.draw(ctx);
    this.drawWind();
    this.drawCastle();
    this.drawScore();
    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
  }

  drawWind(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.windVelocity, 465, 90);

    this.ctx.save();
    /*translate to center of canvas?*/
    // this.ctx.translate(150, 100);
    // this.ctx.translate(400,300);
    this.ctx.translate(475,125);
    this.ctx.rotate((this.windAngle-90-180) * Math.PI/180);

    let arrow = document.getElementById('arrow');
    this.ctx.fillStyle = "yellow";
    // this.ctx.fillRect(0,0,100,100);
    this.ctx.drawImage(arrow, -25,-25, 50,50);
    this.ctx.restore();
    // console.log(this.windAngle)
  }

  drawCastle(){
    let castle = document.getElementById("castle");
    this.ctx.drawImage(castle, 0, 505, 100,100);
  }

  drawScore(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Current Score: "+this.score, 320, 50);
  }

  endGame(){
    console.log("YOU LOSE ENEMY REACHED YOU!");
    window.clearInterval(this.enemiesCreation);
    this.enemies = [];
    this.cannonballs = [];
  }

  // nextLevel(){
  // }
}

function sound(src){
  this.sound = document.createElement("audio");
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
}



Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.BG_COLOR = 'lightblue';

// export default Game;
module.exports = Game;
