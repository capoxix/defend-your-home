const MovingObject = require('./moving_object');
const CannonBall = require('./cannon_ball');
const Enemy = require('./enemy');
const Util = require("./util");

// import CannonBall from './cannon_ball.js';
// import Enemy from './enemy.js';
// import Util from './util.js';


class Cannon{
  constructor(options){
    // this.radius = Cannon.RADIUS;
    this.vel = [0, 0];
    this.color = 'black';
    this.game = options.game;
    this.pos = options.pos;
    this.angle = 0;
    this.ctx = options.ctx;
    // this.reloading = false;
    this.drawReloading = this.drawReloading.bind(this);
    // this.reload = this.reload.bind(this);
  }

  draw(ctx){
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true
    // );
    //
    // ctx.fill();


    // ctx.fillStyle = this.color;
    // this.ctx.beginPath();
    // this.ctx.ellipse(this.pos[0], this.pos[1], 10, 25, this.angle*3 * Math.PI/180, 0, 2 * Math.PI);
    // this.ctx.stroke();
    // this.ctx.fill();
    //
    // ctx.fillStyle = 'brown';
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], 595, 10, 0 , 2 * Math.PI, true
    // );
    //
    // ctx.fill();

    this.drawAngle();
    this.drawReloading();
    this.drawRotation();
    // this.drawWind();
    // this.drawRotation();
  }

  fireCannonBall(){
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

    if(this.game.cannonBallsCount != 0) {
      this.game.add(cannonBall);
      this.game.cannonBallsCount -= 1;
    }
  }

  rotate(move){
    // console.log(this.angle);
    if(this.angle < 25 || move[1] === -1) this.angle += move[1];

    // console.log("angle:", this.angle);
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
    this.ctx.fillStyle = "black";
    this.ctx.fillText(this.angle, 90, 490);
    this.ctx.beginPath();
    this.ctx.arc(112, 478, 2, 0, 2 * Math.PI);
    this.ctx.strokeStyle='black';
    this.ctx.stroke();
  }

  drawReloading(){
    this.ctx.font="16px Arial";
    this.ctx.fillStyle= "black";
    this.ctx.fillText("# of cannonballs: "+this.game.cannonBallsCount, 50,570);
  }

  isCollidedWith(otherObject){
    let centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }



  drawRotation(){
    let cannonTop = document.getElementById('cannon-top');
    let cannonBottom = document.getElementById('cannon-bottom');
    this.ctx.save();
    this.ctx.translate(130, 520);
    this.ctx.rotate((this.angle-70)  * Math.PI/180);
    this.ctx.drawImage(cannonTop,-35 ,-35 , 70, 70);
    this.ctx.restore();
    this.ctx.save();
    this.ctx.translate(130,520);
    this.ctx.drawImage(cannonBottom, -40, -40, 80, 80);
    this.ctx.restore();

  }


  move(){/*undefined since cannon is not a moving object */}


}

Cannon.RADIUS = 15;
// export default Cannon;
module.exports = Cannon;
