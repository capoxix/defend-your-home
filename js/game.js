// const Ram = require('./ram');
const Cannon = require('./cannon');
const CannonBall = require('./cannon_ball');
const Enemy = require('./enemy');

class Game {
  constructor(){
    this.cannon = new Cannon({pos: [50, 580], game: this});
    // this.ram = ;
    this.cannonballs = [];
    // this.enemy = new Enemy({pos: [750, 580], game: this});
    this.enemies = [new Enemy({pos: [750,580], game: this})];
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

        if (!(obj1 instanceof Cannon) && obj1 !== obj2) {
          // if (obj1 instanceof CannonBall && obj2 instanceof Enemy)
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
      console.log("removing cannonball");
      this.cannonballs.splice(this.cannonballs.indexOf(object), 1);
    }else if (object instanceof Enemy){
      console.log("delete enemy!");
      this.enemies.splice(this.enemies.indexOf(object), 1);
    }
  }

  add(object){
    // debugger;
    if (object instanceof CannonBall){
      this.cannonballs.push(object);
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
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // debugger;
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0,0, Game.DIM_X, Game.DIM_Y);
    // this.cannon.draw(ctx);
    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
  }
}



Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.BG_COLOR = 'lightblue';

module.exports = Game;
