// const MovingObject = require('./moving_object');
const CannonBall = require('./cannon_ball');
const Util = require("./util");


class Cannon{
  constructor(options){
    this.radius = Cannon.RADIUS;
    this.vel = [0, 0];
    this.color = '#D3D3D3';
    this.game = options.game;
    this.pos = options.pos;
    // super(options);
  }

  draw(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true
    );

    ctx.fill();
  }

  fireCannonBall(){
    /*
    */

    const cannonBall = new CannonBall({
      pos: this.pos,
      vel: 15,
      color: this.color,
      game: this.game
    });

    this.game.add(cannonBall);
  }

  rotate(move){
    this.pos[0] += move[0];
    this.pos[1] += move[1];
    this.vel[0] += move[0];
    this.vel[1] += move[1];
    /*
    rotation of cannon
    */
  }

  move(){/*undefined since cannon is not a moving object */}


}

Cannon.RADIUS = 15;
module.exports = Cannon;
