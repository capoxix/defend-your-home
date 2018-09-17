const MovingObject = require('./moving_object');
const CannonBall = require('./cannon_ball');

class Enemy extends MovingObject{
  constructor(options){
    if(this.game.score < 30) options.radius = Enemy.RADIUS;
    if (this.game.score >= 30) options.radius = 45;
    options.color = 'brown';
    super(options);
    this.enemyAnimation = [[8,510, 31, 74],[48,510, 47,74], [104,511,39,73],
    [152,511, 29, 73], [192,510, 40, 74], [240,510,32,74]];
    this.enemyAnimation2 = [[477,10,19,62], [439, 10, 25,62], [398,9,34,63], 
    [360,9,24,63]]
    this.animationCount = 0;
    this.animationDelay = 0;

    this.enemyAnimation3 = [[410,1,16,45], [407,50,21,44], [382,2,21,44]];
    this.enemyAnimation4 = [[253,5,17,46], [250,53,22,46], [225,5,23,46]];
    this.enemyAnimation5 = [[348,320,88,62], [253,319,87,63], [161,320,85,62], [66,319,87,63]];
  }

  draw(ctx){
    let enemyImg = document.getElementById('enemy');
    let enemyImg2 = document.getElementById('enemy2');
    let enemyImg3 = document.getElementById('medieval-enemy');
    let enemyImg4 = document.getElementById('medieval-enemy2');
    this.animationDelay += 1;

    let img;
    let animation;
    if (this.game.score < 16) {
      img = enemyImg3;
      animation = this.enemyAnimation3;
    } else if (this.game.score >= 15 && this.game.score < 30){
        if(this.game.score === 15){
          this.game.enemies = [];
          this.game.score += 1;
        }
        img = enemyImg3;
        animation = this.enemyAnimation4;
    } else {
      if(this.game.score === 29) {
        this.game.enemies = [];
        this.game.score += 1;
      }
      img = enemyImg4
      animation = this.enemyAnimation5;
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
          animation[this.animationCount][3], this.pos[0],this.pos[1], 30,75);
    } else {
      ctx.drawImage(img,  animation[this.animationCount][0],   animation[this.animationCount][1],
          animation[this.animationCount][2],
          animation[this.animationCount][3], this.pos[0],this.pos[1], 30,75);
    }

    // if (this.animationDelay++ >= 15){
    //   this.animationDelay = 0;
    //   this.animationCount++;

    //   if (this.animationCount >= this.enemyAnimation.length){
    //     this.animationCount = 0;
    //     this.enemyAnimation[this.animationCount];
    //   }

    //   ctx.drawImage(enemyImg,  this.enemyAnimation[this.animationCount][0],   this.enemyAnimation[this.animationCount][1],
    //       this.enemyAnimation[this.animationCount][2],
    //       this.enemyAnimation[this.animationCount][3], this.pos[0],this.pos[1], 30,75);
    // } else {
    //   ctx.drawImage(enemyImg,  this.enemyAnimation[this.animationCount][0],   this.enemyAnimation[this.animationCount][1],
    //       this.enemyAnimation[this.animationCount][2],
    //       this.enemyAnimation[this.animationCount][3], this.pos[0],this.pos[1], 30,75);
    // }
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
