// const Ram = require('./ram');
const Cannon = require('./cannon');
const CannonBall = require('./cannon_ball');

class Game {
  constructor(){
    this.cannon = new Cannon({pos: [20, 0], game: this});
    // this.ram = ;
    this.cannonballs = [];
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  allObjects() {
    return [].concat(this.cannon, this.cannonballs);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (!(obj1 instanceof Cannon)) {
          if (obj1.isCollidedWith(obj2)) {
            const collision = obj1.collideWith(obj2);
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
