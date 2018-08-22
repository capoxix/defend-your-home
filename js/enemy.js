const MovingObject = require('./moving_object');
const CannonBall = require('./cannon_ball');
// import MovingObject from './moving_object.js';
// let b = MovingObject;
// debugger;
class Enemy extends MovingObject{
  constructor(options){
    options.radius = Enemy.RADIUS;
    options.vel = [-0.5, 0];
    options.color = 'brown';
    // .game = options.game;
    // this.pos = options.pos;
    super(options);
    this.enemyAnimation = [[8,510, 31, 74],[48,510, 47,74], [104,511,39,73],
    [152,511, 29, 73], [192,510, 40, 74], [240,510,32,74]];

    // this.enemiesAnimation =
    this.animationCount = 0;
    this.animationDelay = 0;
  }

  draw(ctx){
    let enemyImg = document.getElementById('enemy');
      this.animationDelay += 1;

    if (this.animationDelay++ >= 15){
      this.animationDelay = 0;
      this.animationCount++;

      if (this.animationCount >= this.enemyAnimation.length){
        this.animationCount = 0;
        this.enemyAnimation[this.animationCount];
      }
      ctx.drawImage(enemyImg,  this.enemyAnimation[this.animationCount][0],   this.enemyAnimation[this.animationCount][1],
          this.enemyAnimation[this.animationCount][2],
          this.enemyAnimation[this.animationCount][3], this.pos[0],this.pos[1], 30,75);
      // ctx.restore();
    } else {
      ctx.drawImage(enemyImg,  this.enemyAnimation[this.animationCount][0],   this.enemyAnimation[this.animationCount][1],
          this.enemyAnimation[this.animationCount][2],
          this.enemyAnimation[this.animationCount][3], this.pos[0],this.pos[1], 30,75);
    }



      // ctx.clearRect(this.pos[0], this.pos[1]-50, 30,75);
      // updateFrame()
      // ctx.drawImage(enemyImg,sprite[0], sprite[1], sprite[2], sprite[3], this.pos[0],this.pos[1]-50, 30,75);
      // ctx.restore();

    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true
    // );
    //
    // ctx.fill();

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
    if (this.pos[0] < 200) {
      this.game.endGame();
    }
    if (this.game.isOutOfBounds(this.pos)) {
      this.remove();
    }
  }

  // collidedWith(otherObject){
  //   // if (otherObject instanceof this){
  //   //   console.log("enemy colliding with itself")
  //     // this.game.crashSound.play();
  //     // this.game.changeWind();
  //     // this.game.remove(otherObject);
  //     // this.game.remove(this);
  //   }
  // }
}

Enemy.RADIUS = 20;

// export default Enemy;
module.exports = Enemy;
