const MovingObject = require('./moving_object');
const CannonBall = require('./cannon_ball');

class Enemy extends MovingObject{
  constructor(options){
    if(options.game.score < 30) options.radius = Enemy.RADIUS;
    if (options.game.score >= 30) options.radius = 43;
    options.color = 'brown';
    super(options);
    this.animationCount = 0;
    this.animationDelay = 0;

    this.enemyAnimation = [[410,1,16,45], [407,50,21,44], [382,2,21,44]];
    this.enemyAnimation2 = [[253,5,17,46], [250,53,22,46], [225,5,23,46]];
    this.enemyAnimation3 = [[348,320,88,62], [253,319,87,63], [161,320,85,62], [66,319,87,63]];
  }

  draw(ctx){
    let enemyImg = document.getElementById('medieval-enemy');
    let enemyImg2 = document.getElementById('medieval-enemy2');
    this.animationDelay += 1;

    let img;
    let animation;
    let width;
    let height;
    this.resetSpawn();

    if (this.game.score < 16) {
      img = enemyImg;
      animation = this.enemyAnimation;
      width = 30;
      height = 75;
    } else if (this.game.score >= 15 && this.game.score < 30){
        img = enemyImg;
        animation = this.enemyAnimation2;
        width = 30;
        height = 75;
    } else {
 
      img = enemyImg2
      animation = this.enemyAnimation3;
      width = 88;
      height = 75;
    }

    if (this.animationDelay++ >= 15){
      this.animationDelay = 0;
      this.animationCount++;

      if (this.animationCount >= animation.length){
        this.animationCount = 0;
        animation[this.animationCount];
      }

      ctx.drawImage(img,  animation[this.animationCount][0],   animation[this.animationCount][1],
          animation[this.animationCount][2],
          animation[this.animationCount][3], this.pos[0],this.pos[1], width,height);
    } else {
      ctx.drawImage(img,  animation[this.animationCount][0],   animation[this.animationCount][1],
          animation[this.animationCount][2],
          animation[this.animationCount][3], this.pos[0],this.pos[1], width, height);
    }
  }
  
  resetSpawn(){
    if(this.game.score === 15 || this.game.score === 29) {
      this.game.enemies = [];
      this.game.score += 1;
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

Enemy.RADIUS = 33;
module.exports = Enemy;
