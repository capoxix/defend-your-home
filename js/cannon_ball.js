const MovingObject = require('./moving_object');

const DEFAULTS = {
  COLOR: 'black',
  RADIUS: 5,
  SPEED: 15
};



class CannonBall extends MovingObject {
  constructor(options = {}){
    // let radian = Math.PI * (options.angle * 5)/ 180;
    // options.pos[0] = Math.cos(radian)*options.pos[0] + options.pos[0];
    // options.pos[1] = Math.sin(radian)*options.pos[1] + options.pos[1];
    options.color = DEFAULTS.COLOR;
    /**/
    options.pos = options.pos;
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel;
    super(options);
    this.angle = options.angle;
    this.radian = Math.PI * (90- this.angle)/180;
    this.airTime = 0;
    //
    this.pos[1] = Math.cos(Math.PI* this.angle* 5/ 180)* -25 + this.pos[1];
    this.pos[0] = Math.sin(Math.PI* this.angle*5/180) * 25 + this.pos[0];

    // console.log(options.vel[0]);
    this.verticalVelocity = Math.sin(this.radian) * options.vel[0];
    this.horizontalVelocity = Math.cos(this.radian) * options.vel[0];

    this.windRadian = Math.PI * this.game.windAngle / 180;
    this.windVerticalVelocity = Math.sin(this.windRadian) * this.game.windVelocity;
    this.windHorizontalVelocity = Math.cos(this.windRadian)* this.game.windVelocity;
    // debugger;
    // console.log("windRadian", this.windRadian);
    // console.log("windVerticalVelocity", this.windVerticalVelocity);
    // console.log("windHorizontalVecloity", this.windHorizontalVelocity);
  }

  // collidedWith(otherObject){
  //   // this.game.remove(otherObject);
  // }
  updateCannonBall(){
    let gravity = 2.75 * (this.airTime);
    this.vel[0] += this.horizontalVelocity;
    this.vel[1] += (-1 * this.verticalVelocity) + gravity;
    // debugger;
    // console.log("horizontal", this.vel[0]);
    // console.log("vertical", this.vel[1]);

  }

  draw(ctx) {
    // let radian = Math.PI * (this.angle * 5)/ 180;
    // this.pos[0] = Math.cos(radian)*20; + this.pos[0];
    // this.pos[1] = Math.sin(radian)*50 + this.pos[1]; //+ this.pos[1];
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true
    );

    ctx.fill();
  }

  move(timeDelta) {
      // debugger;
    this.updateCannonBall();
    this.airTime += 1*60/5000;
    const velocityScale = timeDelta / 30;//NORMAL_FRAME_TIME_DELTA,
    const  offsetX = this.vel[0] * velocityScale +this.windHorizontalVelocity;
    const  offsetY = this.vel[1] * velocityScale + this.windVerticalVelocity;
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
