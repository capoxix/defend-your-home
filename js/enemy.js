const MovingObject = require('./moving_object');
const CannonBall = require('./cannon_ball');

class Enemy extends MovingObject{
  constructor(options){
    options.radius = Enemy.RADIUS;
    options.color = 'brown';
    super(options);
    this.enemyAnimation = [[8,510, 31, 74],[48,510, 47,74], [104,511,39,73],
    [152,511, 29, 73], [192,510, 40, 74], [240,510,32,74]];
    this.enemyAnimation2 = [[477,10,19,62], [439, 10, 25,62], [398,9,34,63], 
    [360,9,24,63], [334,9,18,63], [291,9,29,63]]
    this.animationCount = 0;
    this.animationDelay = 0;
  }

  draw(ctx){
    let enemyImg = document.getElementById('enemy');
    let enemyImg2 = document.getElementById('flipped-enemy');
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
    } else {
      ctx.drawImage(enemyImg,  this.enemyAnimation[this.animationCount][0],   this.enemyAnimation[this.animationCount][1],
          this.enemyAnimation[this.animationCount][2],
          this.enemyAnimation[this.animationCount][3], this.pos[0],this.pos[1], 30,75);
    }
  }

  move(timeDelta) {

    const velocityScale = timeDelta /30;
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.pos[0] < 180) {
      this.game.hp -= 1;
      this.game.remove(this);
      if(this.game.hp <= 0) this.game.endGame();
    }
    if (this.game.isOutOfBounds(this.pos)) {
      this.game.remove(this);
    }
  }

  collidedWith(otherObject){
    delete this;
  }
}

Enemy.RADIUS = 30;
module.exports = Enemy;
