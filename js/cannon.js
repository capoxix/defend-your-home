// const MovingObject = require('./moving_object');
const CannonBall = require('./cannon_ball');
const Enemy = require('./enemy');
const Util = require("./util");


class Cannon{
  constructor(options){
    // this.radius = Cannon.RADIUS;
    this.vel = [0, 0];
    this.color = 'black';
    this.game = options.game;
    this.pos = options.pos;
    this.angle = 0;
    this.ctx = options.ctx;
    this.reloading = false;
  }

  draw(ctx){
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true
    // );
    //
    // ctx.fill();

    ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.ellipse(this.pos[0], this.pos[1], 10, 25, this.angle*5 * Math.PI/180, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();

    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.arc(
      this.pos[0], 595, 10, 0 , 2 * Math.PI, true
    );

    ctx.fill();

    this.drawAngle();
    // this.drawWind();
    // this.drawRotation();
  }

  fireCannonBall(){
    /*
    */

    const norm = Util.norm(this.vel);

    const relVel = Util.scale(
      Util.dir(this.vel),
      CannonBall.SPEED
    );

    const cannonBallVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    // debugger;
    let dupPos = Array.from(this.pos);

    const cannonBall = new CannonBall({
      pos: dupPos,
      vel: [1,0],
      color: this.color,
      game: this.game,
      angle: this.angle
    });
    if (!this.reloading) {
      this.game.add(cannonBall);
      this.reloading = true;
    } else {
      let that = this;
      setTimeout(function(){
        that.reloading = false;
      }, 3000);
    }
  }

  rotate(move){
    this.angle += move[1];

    console.log("angle:", this.angle);
    // this.pos[0] += move[0];
    // this.pos[1] += move[1];
    this.vel[0] += move[0];
    this.vel[1] += move[1];
    /*
    rotation of cannon
    */
  }

  drawAngle(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Angle: "+this.angle* 5, 8, 20);
  }

  isCollidedWith(otherObject){
    let centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }



  // drawRotation(){
  //   this.ctx.save();
  //   this.ctx.translate(50, 450);
  //   this.ctx.fillStyle = "black";
  //   this.ctx.beginPath();
  //   this.ctx.ellipse(100, 100, 20, 50, this.angle*5 * Math.PI/180, 0, 2 * Math.PI);
  //   this.ctx.stroke();
  //   this.ctx.fill();
  //   this.ctx.restore();
  // }

  move(){/*undefined since cannon is not a moving object */}


}

Cannon.RADIUS = 15;
module.exports = Cannon;
