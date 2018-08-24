/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/cannon.js":
/*!**********************!*\
  !*** ./js/cannon.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./js/moving_object.js");
const CannonBall = __webpack_require__(/*! ./cannon_ball */ "./js/cannon_ball.js");
const Enemy = __webpack_require__(/*! ./enemy */ "./js/enemy.js");
const Util = __webpack_require__(/*! ./util */ "./js/util.js");

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
    this.angle += move[1];

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
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Angle: "+this.angle * 3, 8, 20);
  }

  drawReloading(){
    this.ctx.font="16px Arial";
    this.ctx.fillStyle= "#0095DD";
    this.ctx.fillText("Available cannonballs: "+this.game.cannonBallsCount, 50,50);
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
    this.ctx.rotate((this.angle-25) * 3 * Math.PI/180);
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


/***/ }),

/***/ "./js/cannon_ball.js":
/*!***************************!*\
  !*** ./js/cannon_ball.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./js/moving_object.js");
const Enemy = __webpack_require__(/*! ./enemy */ "./js/enemy.js");
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


/***/ }),

/***/ "./js/enemy.js":
/*!*********************!*\
  !*** ./js/enemy.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./js/moving_object.js");
const CannonBall = __webpack_require__(/*! ./cannon_ball */ "./js/cannon_ball.js");
// import MovingObject from './moving_object.js';
// let b = MovingObject;
// debugger;
class Enemy extends MovingObject{
  constructor(options){
    options.radius = Enemy.RADIUS;
    // options.vel = [-0.5, 0];
    options.color = 'brown';
    // .game = options.game;
    // this.pos = options.pos;
    super(options);
    this.enemyAnimation = [[8,510, 31, 74],[48,510, 47,74], [104,511,39,73],
    [152,511, 29, 73], [192,510, 40, 74], [240,510,32,74]];

    // this.enemiesAnimation =
    this.animationCount = 0;
    this.animationDelay = 0;
  }

  draw(ctx){
    let enemyImg = document.getElementById('enemy');
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
  // timeDelta is number of milliseconds since last move
  // if the computer is busy the time delta will be larger
  // in this case the MovingObject should move farther in this frame
  // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta /30,//NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.pos[0] < 200) {
      this.game.endGame();
    }
    if (this.game.isOutOfBounds(this.pos)) {
      this.game.remove(this);
    }
  }

  collidedWith(otherObject){
    // console.log('deleting enemy got hit by', otherObject);
    //   //weird bug where object still 'exists', but not really
    //   this.game.remove(this);
      delete this;
  }

  // changeScore(){
  //   let score = document.getElementById("score");
  //   score.innerHTML = this.score;
  // }
}

Enemy.RADIUS = 25;

// export default Enemy;
module.exports = Enemy;


/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Cannon = __webpack_require__(/*! ./cannon */ "./js/cannon.js");
const CannonBall = __webpack_require__(/*! ./cannon_ball */ "./js/cannon_ball.js");
const Enemy = __webpack_require__(/*! ./enemy */ "./js/enemy.js");

// import Cannon from  './cannon.js';
// import CannonBall from './cannon_ball.js';
// import Enemy from './enemy.js';

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.cannon = new Cannon({pos: [120, 525], game: this, ctx: this.ctx});
    this.highScores = [];
    this.cannonballs = [];
    this.enemies = [];
    // this.addEnemies();

    this.score = 1;
    this.windVelocity = (Math.random() * 2).toFixed(2);
    this.windAngle = Math.round(Math.random() * 360);
    this.soundFnc = this.soundFnc.bind(this);
    this.crashSound = this.soundFnc('sounds/explosion.mp3');
    // debugger;
    this.changeWind = this.changeWind.bind(this);
    this.score = 0;
    this.cannonBallsCount = 0;
    // this.addCannonBalls();
    this.enemiesVelocity = [-0.5 + (-this.score/70),0];
    this.endGame = this.endGame.bind(this);
    this.endGameMsg = '';
    // this.highScores = [];
    // this.muteVolume = this.muteVolume.bind(this);
    // this.addVolumeButton();
    // this.addVolumeEventListener = this.addVolumeEventListener.bind(this);
    // this.addVolumeEventListener();

  }
  addCannonBalls(){
    // this.game.cannonBallsCount += 1;
    let that = this;
    this.cannonBallCreations = setInterval(function(){
      that.cannonBallsCount += 1;
    }, 1000);
  }

  cancelCannonBalls(){
    clearInterval(this.cannonBallCreations);
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
          // if (obj1 instanceof CannonBall && obj2 instanceof Enemy)
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

  addEnemies(){
    let that = this;
    this.enemiesCreation = setInterval(function(){
      that.add(new Enemy({pos: [950,475], game: that, vel: that.enemiesVelocity}));
    }, 3000);
  }

  cancelEnemies(){
    clearInterval(this.enemiesCreation);
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
    this.drawEndGame();
    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
  }

  drawWind(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.windVelocity, 465, 90);

    this.ctx.save();
    this.ctx.translate(475,125);
    this.ctx.rotate((this.windAngle-90-180) * Math.PI/180);

    let arrow = document.getElementById('arrow');
    this.ctx.fillStyle = "yellow";
    this.ctx.drawImage(arrow, -25,-25, 50,50);
    this.ctx.restore();
  }

  drawCastle(){
    let castle = document.getElementById("castle");
    this.ctx.drawImage(castle, 0, 400, 150,150);
  }

  drawScore(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Current Score: "+this.score, 320, 50);
  }

  endGame(){
    // console.log("YOU LOSE ENEMY REACHED YOU!");
    // this.ctx.font = "16px Arial";
    // this.ctx.fillStyle = "black";
    // this.ctx.fillText("YOU LOSE ENEMY REACHED YOU", 320, 70);
    this.endGameMsg = "YOU LOSE ENEMY REACHED YOU!";
    // console.log("YOU LOSE!!!");
    window.clearInterval(this.enemiesCreation);
    window.cancelAnimationFrame(window.requestId);
    window.clearInterval(this.cannonBallCreations);

    this.enemies = [];
    this.cannonballs = [];
    window.highScores.push(this.score);
  }

  drawEndGame(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(this.endGameMsg, 320, 70);
  }


  // nextLevel(){
  //
  // }

  soundFnc(src){
    // debugger;
    this.sound = document.createElement("audio");
    this.sound.setAttribute("id", 'sound');
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = 0.01;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    };
    this.stop = function(){
        this.sound.pause();
    };
    return this.sound;
  }
}




Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.BG_COLOR = 'lightblue';

// export default Game;
module.exports = Game;


/***/ }),

/***/ "./js/game_view.js":
/*!*************************!*\
  !*** ./js/game_view.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

// var fps = 30;
// var now;
// var then = Date.now();
// var interval = 1000/fps;
// var delta;

class GameView {
  constructor(game, ctx){

    this.ctx = ctx;
    this.game = game;
    this.cannon = this.game.cannon;

    // this.requestId = undefined;

    // this.loop = this.loop.bind(this);
    this.start = this.start.bind(this);
    this.stop =  this.stop.bind(this);
    this.animate = this.animate.bind(this);
    //
    this.lastTime = 0;

  }

  bindKeyHandlers(){
    const cannon = this.cannon;

    Object.keys(GameView.MOVES).forEach((k) => {
      const move = GameView.MOVES[k];
      key(k, () => { cannon.rotate(move);});
    });

    key("space", () => {
      cannon.fireCannonBall();});

      // key(g, function () { debugger; cannon.fireCannonBall(); });
  }

  start() {
    this.bindKeyHandlers();
    // this.lastTime = 0;
    this.game.addEnemies();
    this.game.addCannonBalls();
    this.animationPlaying = true;
    // if(!this.requestId){
      this.animate(this.lastTime);
    // }
    //window.animation = requestAnimationFrame(this.animate.bind(this));
  }
  //
  setup(){
    this.game.draw(this.ctx);
  }

  animate(time){
    // debugger;
    // console.log(time);
    // console.log("animating");
    if(this.animationPlaying) {
      // console.log("time type", typeof(time));
      // debugger;
      const timeDelta = 1000/60;//time - this.lastTime;
      // console.log("timeDelta", timeDelta);
      // debugger;
      // window.time = time;
      // console.log('time', time);
      // console.log("datetime", new Date().getTime());
      // console.log('lastTime', this.lastTime);
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      // this.game.cannon.draw(this.ctx);
      this.lastTime = time;

      this.requestId = requestAnimationFrame(this.animate.bind(this));
      window.requestId = this.requestId;
    }
  }

  stop(){
    window.cancelAnimationFrame(this.requestId);
    this.game.cancelEnemies();
    this.game.cancelCannonBalls();
    // this.animationPlaying = false;
    // this.lastTime = time;

  }

  /**/

    // start(){
    //   // debugger;
    //   this.lastTime = 0;
    //   this.animationPlaying = true;
    //   if(!this.requestId){
    //     this.requestId = window.requestAnimationFrame(this.loop);
    //   }
    // }
    //
    // loop(time){
    //   if(this.animationPlaying){
    //     const timeDelta = time- this.lastTime;
    //     this.game.step(timeDelta);
    //     this.game.draw(this.ctx);
    //     window.requestAnimationFrame(this.loop);
    //   }
    //
    // }
    //
    // stop(){
    //
    //     window.cancelAnimationFrame(this.requestId);
    //     this.animationPlaying = false;
    // }


  // stopAnimation(){
    // window.cancelAnimationFrame(window.animation);
  // }

}

GameView.MOVES = {
  w: [0, -1],
  s: [0, 1],
  a: [-1, 0],
  d: [1, 0]
};

// export default GameView;
module.exports = GameView;


/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./js/game.js");
const GameView = __webpack_require__(/*! ./game_view */ "./js/game_view.js");

// import Game from './game.js';
// import GameView from './game_view.js';

document.addEventListener("DOMContentLoaded", function(event) {
  const canvasEl = document.getElementById('game-canvas');
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  window.highScores = [];

  let started = false;
  // let muted = false;

  let ctx = canvasEl.getContext("2d");
  let game = new Game(ctx);
  let gameV = new GameView(game, ctx);//.setup();//.start();
  gameV.setup();

  let startButton = document.getElementById("start");
  startButton.addEventListener("click", () => {
    if(!started){
      gameV.start();
      started = true;
    }
  });

  let newGameButton = document.getElementById("new-game");
    newGameButton.addEventListener("click", () => {

      /**/
      started = false;
      gameV.stop();

      ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
      game = new Game(ctx);
      gameV = new GameView(game, ctx);
      // console.log("game", game);
      // console.log("gameview", gameV);
      // console.log(ctx);
      gameV.setup();
  });

  let stopButton = document.getElementById("stop");
  stopButton.addEventListener("click", () => {
    if(started) {
      gameV.stop();
      started= false;
    }
  });

  let audioNode = document.getElementById("sound");
  let volumeMute = document.getElementById("volume-mute");

  volumeMute.addEventListener("click", ()=>{
    if (!audioNode.muted)
      audioNode.muted = true;
  });

  let volumeOpen = document.getElementById("volume-up");
  volumeOpen.addEventListener("click",()=>{
    if (audioNode.muted)
    audioNode.muted = false;
  });




  // let game = new Game();
  // game.startGame();
 });


/***/ }),

/***/ "./js/moving_object.js":
/*!*****************************!*\
  !*** ./js/moving_object.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// import Util from './util.js';
const Util = __webpack_require__(/*! ./util.js */ "./js/util.js");
// import Cannon from './cannon.js';
// import CannonBall from './cannon_ball.js';
// import Enemy from './enemy.js';
// const Cannon = require('./cannon');
// const CannonBall = require('./cannon_ball');
// const Enemy = require('./enemy');


class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }

  collidedWith(otherObject){}

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true
    );

    ctx.fill();
  }

  move(timeDelta) {
  // timeDelta is number of milliseconds since last move
  // if the computer is busy the time delta will be larger
  // in this case the MovingObject should move farther in this frame
  // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta /30,//NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.game.isOutOfBounds(this.pos)) {
      // console.log("removing cannonball");
      // debugger
      this.remove();
      // }
    }
  }

  isCollidedWith(otherObject){
    let centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  remove(){
    this.game.remove(this);
  }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
// export default MovingObject;

// export default MovingObject;
module.exports = MovingObject;


/***/ }),

/***/ "./js/util.js":
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Util = {
  dist(pos1, pos2){
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  // Find the length of the vector.
  norm(vec) {
    return Util.dist([0, 0], vec);
  },
  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
};

// export default Util;
module.exports = Util;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map