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
}

  Enemy.RADIUS = 30;


module.exports = Enemy;
