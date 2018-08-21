// const Ram = require('./ram');
const Cannon = require('./cannon');
const CannonBall = require('./cannon_ball');
const Enemy = require('./enemy');

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.cannon = new Cannon({pos: [50, 550], game: this, ctx: this.ctx});
    // this.ram = ;
    this.cannonballs = [];
    // this.enemy = new Enemy({pos: [750, 580], game: this});
    this.enemies = [new Enemy({pos: [750,570], game: this})];

    this.level = 5;
    this.windVelocity = (Math.random() * this.level).toFixed(2);
    this.windAngle = Math.round(Math.random() * 360);
    // console.log("windVelocity", this.windVelocity);
    // console.log("windAngle", this.windAngle);
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
      }
    }
  }

  remove(object){
    if (object instanceof CannonBall){
      // console.log("removing cannonball");
      this.cannonballs.splice(this.cannonballs.indexOf(object), 1);
    }else if (object instanceof Enemy){
      // console.log("delete enemy!");
      this.enemies.splice(this.enemies.indexOf(object), 1);
    }
  }

  add(object){
    // debugger;
    if (object instanceof CannonBall){
      this.cannonballs.push(object);
    }
  }

  addEnemies(){

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
    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
  }

  drawWind(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Wind Velocity:" + this.windVelocity, 8, 40);
    this.ctx.fillText("Wind Angle:" + this.windAngle, 8, 60);

    this.ctx.save();
    /*translate to center of canvas?*/
    // this.ctx.translate(150, 100);
    // this.ctx.translate(400,300);
    this.ctx.translate(75,125);
    this.ctx.rotate((this.windAngle-90) * Math.PI/180);

    let arrow = document.getElementById('arrow');
    this.ctx.fillStyle = "yellow";
    // this.ctx.fillRect(0,0,100,100);
    this.ctx.drawImage(arrow, -50,-50, 100,100);
    this.ctx.restore();
  }

  // nextLevel(){
  // }
}



Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.BG_COLOR = 'lightblue';

module.exports = Game;
