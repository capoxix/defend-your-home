const MovingObject = require('./moving_object');

class Enemy extends MovingObject{
  constructor(options){
    options.radius = Enemy.RADIUS;
    options.vel = [-1, 0];
    options.color = 'brown';
    // .game = options.game;
    // this.pos = options.pos;
    super(options);
  }

  draw(ctx){
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
      // console.log("moving enemy");

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  // console.log(this.pos[0]);
  if (this.pos[0] < 200) {
    console.log("YOU LOSE ENEMY REACHED YOU!");
    window.cancelAnimationFrame(window.animation);

    // this.game
    // console.log("GAME OVER");
    // cancelAnimationFrame(window.animation);
  }
  if (this.game.isOutOfBounds(this.pos)) {
    // console.log("removing cannonball");
    // debugger
    this.remove();
    // }
  }
}
}

Enemy.RADIUS = 30;


module.exports = Enemy;
