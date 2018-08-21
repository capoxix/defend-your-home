const MovingObject = require('./moving_object');

const DEFAULTS = {
  COLOR: 'gray',
  RADIUS: 10,
  SPEED: 15
};



class CannonBall extends MovingObject {
  constructor(options = {}){
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos;
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel;
    super(options);
    this.angle = options.angle;

    this.radian = Math.PI * (90- this.angle)/180;
    this.airTime = 0;
    console.log(options.vel[0]);
    this.verticalVelocity = Math.sin(this.radian) * options.vel[0];
    this.horizontalVelocity = Math.cos(this.radian) * options.vel[0];
    // debugger;
  }

  // collidedWith(otherObject){
  //   // this.game.remove(otherObject);
  // }
  updateCannonBall(){
    let gravity = 4 * (this.airTime);
    this.vel[0] += this.horizontalVelocity;
    this.vel[1] += (-1 * this.verticalVelocity) + gravity;
    // debugger;
    // console.log("horizontal", this.vel[0]);
    // console.log("vertical", this.vel[1]);

  }

  move(timeDelta) {
      // debugger;
    this.updateCannonBall();
    this.airTime += 1*60/5000;
    // console.log("horizontalVelocity", this.vel[0]);
    // console.log("verticalVelocity", this.vel[1]);
    const velocityScale = timeDelta / 30,//NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;
    // console.log("offsetX", offsetX);
    // console.log("offsetY", offsetY);
    // debugger;
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.game.isOutOfBounds(this.pos)) {
      // console.log("removing cannonball");
      // debugger
      this.remove();
      // }
    }
  }
}

CannonBall.SPEED = 15;
CannonBall.RADIUS = 10;
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = CannonBall;
