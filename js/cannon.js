// const MovingObject = require('./moving_object');
const CannonBall = require('./cannon_ball');
const Enemy = require('./enemy');
const Util = require("./util");


class Cannon{
  constructor(options){
    this.radius = Cannon.RADIUS;
    this.vel = [0, 0];
    this.color = '#D3D3D3';
    this.game = options.game;
    this.pos = options.pos;
    this.angle = 0;
    this.ctx = options.ctx;
  }

  draw(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true
    );

    ctx.fill();
    this.drawAngle();
    this.drawRotation();
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
    const cannonBall = new CannonBall({
      pos: this.pos,
      vel: [1,0],
      color: this.color,
      game: this.game,
      angle: this.angle
    });

    this.game.add(cannonBall);
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

  drawRotation(){
    this.ctx.save();
    this.ctx.translate(50, 450);
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.ellipse(100, 100, 20, 50, this.angle*5 * Math.PI/180, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  }

  move(){/*undefined since cannon is not a moving object */}


}

Cannon.RADIUS = 15;
module.exports = Cannon;
