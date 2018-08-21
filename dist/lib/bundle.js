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

// const MovingObject = require('./moving_object');
const CannonBall = __webpack_require__(/*! ./cannon_ball */ "./js/cannon_ball.js");
const Enemy = __webpack_require__(/*! ./enemy */ "./js/enemy.js");
const Util = __webpack_require__(/*! ./util */ "./js/util.js");


class Cannon{
  constructor(options){
    // this.radius = Cannon.RADIUS;
    this.vel = [0, 0];
    this.color = 'black';
    this.game = options.game;
    this.pos = options.pos;
    this.angle = 0;
    this.ctx = options.ctx;
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
    this.ctx.ellipse(this.pos[0], this.pos[1], 20, 50, this.angle*5 * Math.PI/180, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();

    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.arc(
      this.pos[0], 585, 20, 0 , 2 * Math.PI, true
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


/***/ }),

/***/ "./js/cannon_ball.js":
/*!***************************!*\
  !*** ./js/cannon_ball.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./js/moving_object.js");

const DEFAULTS = {
  COLOR: 'black',
  RADIUS: 10,
  SPEED: 15
};



class CannonBall extends MovingObject {
  constructor(options = {}){
    // let radian = Math.PI * (options.angle * 5)/ 180;
    // options.pos[0] = Math.cos(radian)*options.pos[0] + options.pos[0];
    // options.pos[1] = Math.sin(radian)*options.pos[1] + options.pos[1];
    options.color = DEFAULTS.COLOR;
    /**/
    options.pos = options.pos;
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel;
    super(options);
    this.angle = options.angle;
    this.radian = Math.PI * (90- this.angle)/180;
    this.airTime = 0;
    //
    this.pos[0] = Math.cos(this.radian)*this.pos[0] + this.pos[0];
    // this.pos[1] = Math.sin(this.radian)*this.pos[1] + this.pos[1];
    //
    console.log(options.vel[0]);
    this.verticalVelocity = Math.sin(this.radian) * options.vel[0];
    this.horizontalVelocity = Math.cos(this.radian) * options.vel[0];

    this.windRadian = Math.PI * this.game.windAngle / 180;
    this.windVerticalVelocity = Math.sin(this.windRadian) * this.game.windVelocity;
    this.windHorizontalVelocity = Math.cos(this.windRadian)* this.game.windVelocity;
    // debugger;
    // console.log("windRadian", this.windRadian);
    // console.log("windVerticalVelocity", this.windVerticalVelocity);
    // console.log("windHorizontalVecloity", this.windHorizontalVelocity);
  }

  // collidedWith(otherObject){
  //   // this.game.remove(otherObject);
  // }
  updateCannonBall(){
    let gravity = 2.5 * (this.airTime);
    this.vel[0] += this.horizontalVelocity;
    this.vel[1] += (-1 * this.verticalVelocity) + gravity;
    // debugger;
    // console.log("horizontal", this.vel[0]);
    // console.log("vertical", this.vel[1]);

  }

  draw(ctx) {
    // let radian = Math.PI * (this.angle * 5)/ 180;
    // this.pos[0] = Math.cos(radian)*20; + this.pos[0];
    // this.pos[1] = Math.sin(radian)*50 + this.pos[1]; //+ this.pos[1];
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true
    );

    ctx.fill();
  }

  move(timeDelta) {
      // debugger;
    this.updateCannonBall();
    this.airTime += 1*60/5000;
    const velocityScale = timeDelta / 30;//NORMAL_FRAME_TIME_DELTA,
    const  offsetX = this.vel[0] * velocityScale +this.windHorizontalVelocity;
    const  offsetY = this.vel[1] * velocityScale + this.windVerticalVelocity;
    // console.log("offsetX", offsetX);
    // console.log("offsetY", offsetY);
    // debugger;
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.game.isOutOfBounds(this.pos)) {
      // console.log("removing cannonball");
      // debugger
      this.remove();
      // }
    }
  }
}

CannonBall.SPEED = 15;
CannonBall.RADIUS = 10;
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = CannonBall;


/***/ }),

/***/ "./js/enemy.js":
/*!*********************!*\
  !*** ./js/enemy.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./js/moving_object.js");

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


/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// const Ram = require('./ram');
const Cannon = __webpack_require__(/*! ./cannon */ "./js/cannon.js");
const CannonBall = __webpack_require__(/*! ./cannon_ball */ "./js/cannon_ball.js");
const Enemy = __webpack_require__(/*! ./enemy */ "./js/enemy.js");

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.cannon = new Cannon({pos: [250, 550], game: this, ctx: this.ctx});
    // this.ram = ;
    this.cannonballs = [];
    // this.enemy = new Enemy({pos: [750, 580], game: this});
    this.enemies = [new Enemy({pos: [750,570], game: this})];

    this.level = 2;
    this.windVelocity = (Math.random() * this.level).toFixed(2);
    this.windAngle = Math.round(Math.random() * 360);
    // console.log("windVelocity", this.windVelocity);
    // console.log("windAngle", this.windAngle);
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
          if(obj1 !== obj2)
            if (obj1.isCollidedWith(obj2)) {
              const collision = obj1.collidedWith(obj2);
              if (collision) return;
            }
        }
      }
    }
  }

  remove(object){
    if (object instanceof CannonBall){
      // console.log("removing cannonball");
      this.cannonballs.splice(this.cannonballs.indexOf(object), 1);
    }else if (object instanceof Enemy){
      // console.log("delete enemy!");
      this.enemies.splice(this.enemies.indexOf(object), 1);
    }
  }

  add(object){
    // debugger;
    if (object instanceof CannonBall){
      this.cannonballs.push(object);
    }
  }

  addEnemies(){

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
    // this.ctx = ctx;
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // debugger;
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0,0, Game.DIM_X, Game.DIM_Y);
    // this.cannon.draw(ctx);
    this.drawWind();
    this.drawCastle();
    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
  }

  drawWind(){
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.windVelocity, 365, 90);

    this.ctx.save();
    /*translate to center of canvas?*/
    // this.ctx.translate(150, 100);
    // this.ctx.translate(400,300);
    this.ctx.translate(375,125);
    this.ctx.rotate((this.windAngle-90) * Math.PI/180);

    let arrow = document.getElementById('arrow');
    this.ctx.fillStyle = "yellow";
    // this.ctx.fillRect(0,0,100,100);
    this.ctx.drawImage(arrow, -25,-25, 50,50);
    this.ctx.restore();
  }

  drawCastle(){
    let castle = document.getElementById("castle");
    this.ctx.drawImage(castle, 0, 410, 200,200);
  }

  // nextLevel(){
  // }
}



Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.BG_COLOR = 'lightblue';

module.exports = Game;


/***/ }),

/***/ "./js/game_view.js":
/*!*************************!*\
  !*** ./js/game_view.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.cannon = this.game.cannon;
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
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    // console.log("animating");
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    // this.game.step();

    // debugger;
    this.game.draw(this.ctx);
    // this.game.cannon.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  w: [0, -1],
  s: [0, 1],
  a: [-1, 0],
  d: [1, 0]
};

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

document.addEventListener("DOMContentLoaded", function(event) {
  const canvasEl = document.getElementById('game-canvas');
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game(ctx);
  new GameView(game, ctx).start();
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

const Util = __webpack_require__(/*! ./util */ "./js/util.js");

class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }

  collidedWith(otherObject){
    // debugger;
    console.log(this, "colliding with", otherObject);
    this.game.remove(otherObject);
    this.game.remove(this);
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
  // timeDelta is number of milliseconds since last move
  // if the computer is busy the time delta will be larger
  // in this case the MovingObject should move farther in this frame
  // velocity of object is how far it should move in 1/60th of a second
  const velocityScale = timeDelta /30,//NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

  if (this.game.isOutOfBounds(this.pos)) {
    console.log("removing cannonball");
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

module.exports = Util;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map