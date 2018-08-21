// const Ram = require('./ram');

class Game {
  constructor(){
    // this.cannon = ;
    // this.ram = ;
  }
  addCannon(){

  }

  moveObjects(delta) {
  this.allObjects().forEach((object) => {
    object.move(delta);
  });
}

checkCollisions() {
  const allObjects = this.allObjects();
  for (let i = 0; i < allObjects.length; i++) {
    for (let j = 0; j < allObjects.length; j++) {
      const obj1 = allObjects[i];
      const obj2 = allObjects[j];

      if (obj1.isCollidedWith(obj2)) {
        const collision = obj1.collideWith(obj2);
        if (collision) return;
      }
    }
  }
}

remove(object){
  // if (object instanceof Ram){
  //
  // }
}

  step(delta){
    this.moveObjects(delta);
    this.checkCollisions();
  }

  draw(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0,0, Game.DIM_X, Game.DIM_Y);
  }
}



Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.BG_COLOR = 'lightblue';

module.exports = Game;
