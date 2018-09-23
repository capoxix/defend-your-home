const Cannon = require('./cannon');
const CannonBall = require('./cannon_ball');
const Enemy = require('./enemy');

class Game {
  constructor(ctx , soundFnc){
    this.ctx = ctx;
    this.cannon = new Cannon({pos: [120, 525], game: this, ctx: this.ctx});
    this.cannonballs = [];
    this.enemies = [];
    this.windVelocity = (Math.random() * 2).toFixed(2);
    this.windAngle = Math.round(Math.random() * 360);
    this.crashSound = soundFnc('sounds/explosion.mp3');
    this.hp = 20;
    this.score = 0;
    this.cannonBallsCount = 0;
    this.enemiesVelocity = [-0.75 + (-this.score/80),0];
    this.endGameMsg = '';
    this.endGame = this.endGame.bind(this);
    this.changeWind = this.changeWind.bind(this);
  }
  addCannonBalls(){
    let that = this;
    this.cannonBallCreations = setInterval(function(){
      that.cannonBallsCount += 1;
    }, 1000);
  }

  cancelCannonBalls(){
    clearInterval(this.cannonBallCreations);
  }

  addEnemies(){
    let that = this;
    this.enemiesCreation = setInterval(function(){
      that.add(new Enemy({pos: [1150,500], game: that, vel: that.enemiesVelocity}));
    }, 3000);
  }

  cancelEnemies(){
    clearInterval(this.enemiesCreation);
  }

  changeWind(){
    this.windVelocity = (Math.random() * 2).toFixed(2);
    this.windAngle = Math.round(Math.random() * 360);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  allObjects() {
    return [].concat(this.cannon, this.cannonballs, this.enemies);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (!(obj1 instanceof Cannon || obj2 instanceof Cannon)) {
          if((obj1 instanceof Enemy && obj2 instanceof CannonBall)
          || obj2 instanceof Enemy && obj1 instanceof CannonBall){
            if (obj1.isCollidedWith(obj2)) {
              const collision = obj1.collidedWith(obj2);
              if (collision) return;
            }
          }
        }
      }
    }
  }

  remove(object){
    if (object instanceof CannonBall){
      if(this.cannonballs.indexOf(object)!== -1)
        this.cannonballs.splice(this.cannonballs.indexOf(object), 1);
    }else if (object instanceof Enemy){
      if (this.enemies.indexOf(object) !== -1)
        this.enemies.splice(this.enemies.indexOf(object), 1);
    }
  }

  add(object){
    if (object instanceof CannonBall){
      this.cannonballs.push(object);
    }
    if (object instanceof Enemy){
      this.enemies.push(object);
    }
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  step(delta){
    this.moveObjects(delta);
    this.checkCollisions();
  }

  draw(ctx){
    let background = document.getElementById("background");
    ctx.drawImage(background, 0,0,Game.DIM_X, Game.DIM_Y);
    this.drawWind();
    this.drawCastle();
    this.drawScore();
    this.drawHp();
    this.drawHighScore();
    this.drawEndGame();
    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
  }

  drawWind(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.windVelocity, 580, 90);

    this.ctx.save();
    this.ctx.translate(595,125);
    this.ctx.rotate((this.windAngle-90-180) * Math.PI/180);

    let arrow = document.getElementById('arrow');
    this.ctx.drawImage(arrow, -25,-25, 50,50);
    this.ctx.restore();

    let wind = document.getElementById('wind');
    this.ctx.drawImage(wind, 575,150, 50, 50);
  }

  drawCastle(){
    let castle = document.getElementById("castle");
    this.ctx.drawImage(castle, 0, 400, 150,150);
  }

  drawScore(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Score: "+this.score, 20, 30);
  }

  drawHp(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("HP: "+this.hp, 575, 30);
  }

  endGame(){
    this.endGameMsg = "GAME OVER";
    window.clearInterval(this.enemiesCreation);
    window.cancelAnimationFrame(window.requestId);
    window.clearInterval(this.cannonBallCreations);

    this.enemies = [];
    this.cannonballs = [];
    window.highScores.push(this.score);

    if (this.score > window.highScore) window.highScore = this.score;

  }
  drawEndGame(){
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(this.endGameMsg, 500, 65);
  }

  drawHighScore(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("High Score: "+window.highScore, 1070, 30);
  }
}




Game.DIM_X = 1200;
Game.DIM_Y = 600;
Game.BG_COLOR = 'lightblue';

// export default Game;
module.exports = Game;
