// import Util from './util.js';
const Util = require('./util.js');
// import Cannon from './cannon.js';
// import CannonBall from './cannon_ball.js';
// import Enemy from './enemy.js';
// const Cannon = require('./cannon');
// const CannonBall = require('./cannon_ball');
// const Enemy = require('./enemy');


class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }

  collidedWith(otherObject){}

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true
    );

    ctx.fill();
  }

  move(timeDelta) {
  // timeDelta is number of milliseconds since last move
  // if the computer is busy the time delta will be larger
  // in this case the MovingObject should move farther in this frame
  // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta /30,//NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.game.isOutOfBounds(this.pos)) {
      // console.log("removing cannonball");
      // debugger
      this.remove();
      // }
    }
  }

  isCollidedWith(otherObject){
    let centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  remove(){
    this.game.remove(this);
  }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
// export default MovingObject;

// export default MovingObject;
module.exports = MovingObject;
