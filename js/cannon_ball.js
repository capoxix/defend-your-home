const MovingObject = require('./moving_object');
const Enemy = require('./enemy');
// import MovingObject from './moving_object.js';

const DEFAULTS = {
  COLOR: 'black',
  RADIUS: 5,
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
    //
    this.pos[1] = Math.cos(Math.PI* this.angle* 3/ 180)* -38 + this.pos[1];
    this.pos[0] = Math.sin(Math.PI* this.angle*3/180) * 38 + this.pos[0];

    // console.log(options.vel[0]);
    this.verticalVelocity = Math.sin(this.radian) * options.vel[0];
    this.horizontalVelocity = Math.cos(this.radian) * options.vel[0];

    this.windRadian = Math.PI * this.game.windAngle / 180;
    this.windVerticalVelocity = Math.sin(this.windRadian) * this.game.windVelocity;
    this.windHorizontalVelocity = Math.cos(this.windRadian)* this.game.windVelocity;
  }

  updateCannonBall(){
    let gravity = 2.75 * (this.airTime);
    this.vel[0] += this.horizontalVelocity;
    this.vel[1] += (-1 * this.verticalVelocity) + gravity;

  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true
    );

    ctx.fill();
  }

  move(timeDelta) {
      // debugger;
      /**/
    this.updateCannonBall();
    this.airTime += 50/4000;
    const velocityScale = timeDelta / 30;//NORMAL_FRAME_TIME_DELTA,
    const  offsetX = this.vel[0] * velocityScale +this.windHorizontalVelocity;
    const  offsetY = this.vel[1] * velocityScale + this.windVerticalVelocity;
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.game.isOutOfBounds(this.pos)) {
      this.game.remove(this);
    }
  }

  collidedWith(otherObject){
    if (otherObject instanceof Enemy && this.game.enemies.indexOf(otherObject)!== -1){
      // console.log("cannonball collidedwith");
      // this.game.enemiesVelocity = [this.game.enemiesVelocity[0] + (-this.game.score/20),0];
      this.game.crashSound.play();
      this.game.changeWind();
      this.game.remove(otherObject);
      this.game.remove(this);
      otherObject.collidedWith(this);

      this.game.score++;
      /*chaning velocity of enemies not making them disappear.... */
      this.game.enemiesVelocity = [this.game.enemiesVelocity[0] + (-this.game.score/70),0];
      // console.log(this.game.enemiesVelocity);
    }
  }
}

CannonBall.SPEED = 15;
CannonBall.RADIUS = 10;
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

// export default CannonBall;
module.exports = CannonBall;
