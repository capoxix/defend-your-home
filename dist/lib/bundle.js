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

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./js/moving_object.js\");\nconst CannonBall = __webpack_require__(/*! ./cannon_ball */ \"./js/cannon_ball.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./js/enemy.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./js/util.js\");\n\n// import CannonBall from './cannon_ball.js';\n// import Enemy from './enemy.js';\n// import Util from './util.js';\n\n\nclass Cannon{\n  constructor(options){\n    // this.radius = Cannon.RADIUS;\n    this.vel = [0, 0];\n    this.color = 'black';\n    this.game = options.game;\n    this.pos = options.pos;\n    this.angle = 0;\n    this.ctx = options.ctx;\n    // this.reloading = false;\n    this.drawReloading = this.drawReloading.bind(this);\n    // this.reload = this.reload.bind(this);\n  }\n\n  draw(ctx){\n    // ctx.fillStyle = this.color;\n    // ctx.beginPath();\n    // ctx.arc(\n    //   this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true\n    // );\n    //\n    // ctx.fill();\n\n\n    // ctx.fillStyle = this.color;\n    // this.ctx.beginPath();\n    // this.ctx.ellipse(this.pos[0], this.pos[1], 10, 25, this.angle*3 * Math.PI/180, 0, 2 * Math.PI);\n    // this.ctx.stroke();\n    // this.ctx.fill();\n    //\n    // ctx.fillStyle = 'brown';\n    // ctx.beginPath();\n    // ctx.arc(\n    //   this.pos[0], 595, 10, 0 , 2 * Math.PI, true\n    // );\n    //\n    // ctx.fill();\n\n    this.drawAngle();\n    this.drawReloading();\n    this.drawRotation();\n    // this.drawWind();\n    // this.drawRotation();\n  }\n\n  fireCannonBall(){\n    const norm = Util.norm(this.vel);\n\n    const relVel = Util.scale(\n      Util.dir(this.vel),\n      CannonBall.SPEED\n    );\n\n    const cannonBallVel = [\n      relVel[0] + this.vel[0], relVel[1] + this.vel[1]\n    ];\n\n    // debugger;\n    let dupPos = Array.from(this.pos);\n\n    const cannonBall = new CannonBall({\n      pos: dupPos,\n      vel: [1,0],\n      color: this.color,\n      game: this.game,\n      angle: this.angle\n    });\n\n    if(this.game.cannonBallsCount != 0) {\n      this.game.add(cannonBall);\n      this.game.cannonBallsCount -= 1;\n    }\n  }\n\n  rotate(move){\n    this.angle += move[1];\n\n    // console.log(\"angle:\", this.angle);\n    // this.pos[0] += move[0];\n    // this.pos[1] += move[1];\n    this.vel[0] += move[0];\n    this.vel[1] += move[1];\n    /*\n    rotation of cannon\n    */\n  }\n\n  drawAngle(){\n    this.ctx.font = \"16px Arial\";\n    this.ctx.fillStyle = \"#0095DD\";\n    this.ctx.fillText(\"Angle: \"+this.angle * 3, 8, 20);\n  }\n\n  drawReloading(){\n    this.ctx.font=\"16px Arial\";\n    this.ctx.fillStyle= \"#0095DD\";\n    this.ctx.fillText(\"Available cannonballs: \"+this.game.cannonBallsCount, 50,50);\n  }\n\n  isCollidedWith(otherObject){\n    let centerDist = Util.dist(this.pos, otherObject.pos);\n    return centerDist < (this.radius + otherObject.radius);\n  }\n\n\n\n  drawRotation(){\n    let cannonTop = document.getElementById('cannon-top');\n    let cannonBottom = document.getElementById('cannon-bottom');\n    this.ctx.save();\n    this.ctx.translate(130, 570);\n    this.ctx.rotate((this.angle-25) * 3 * Math.PI/180);\n    this.ctx.drawImage(cannonTop,-45 ,-45 , 85, 85);\n    this.ctx.restore();\n    this.ctx.save();\n    this.ctx.translate(130,570);\n    this.ctx.drawImage(cannonBottom, -47.5, -47.5, 95, 95);\n    this.ctx.restore();\n\n  }\n\n\n  move(){/*undefined since cannon is not a moving object */}\n\n\n}\n\nCannon.RADIUS = 15;\n// export default Cannon;\nmodule.exports = Cannon;\n\n\n//# sourceURL=webpack:///./js/cannon.js?");

/***/ }),

/***/ "./js/cannon_ball.js":
/*!***************************!*\
  !*** ./js/cannon_ball.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./js/moving_object.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./js/enemy.js\");\n// import MovingObject from './moving_object.js';\n\nconst DEFAULTS = {\n  COLOR: 'black',\n  RADIUS: 5,\n  SPEED: 15\n};\n\n\n\nclass CannonBall extends MovingObject {\n  constructor(options = {}){\n    // let radian = Math.PI * (options.angle * 5)/ 180;\n    // options.pos[0] = Math.cos(radian)*options.pos[0] + options.pos[0];\n    // options.pos[1] = Math.sin(radian)*options.pos[1] + options.pos[1];\n    options.color = DEFAULTS.COLOR;\n    /**/\n    options.pos = options.pos;\n    options.radius = DEFAULTS.RADIUS;\n    options.vel = options.vel;\n    super(options);\n    this.angle = options.angle;\n    this.radian = Math.PI * (90- this.angle)/180;\n    this.airTime = 0;\n    //\n    this.pos[1] = Math.cos(Math.PI* this.angle* 3/ 180)* -42 + this.pos[1];\n    this.pos[0] = Math.sin(Math.PI* this.angle*3/180) * 42 + this.pos[0];\n\n    // console.log(options.vel[0]);\n    this.verticalVelocity = Math.sin(this.radian) * options.vel[0];\n    this.horizontalVelocity = Math.cos(this.radian) * options.vel[0];\n\n    this.windRadian = Math.PI * this.game.windAngle / 180;\n    this.windVerticalVelocity = Math.sin(this.windRadian) * this.game.windVelocity;\n    this.windHorizontalVelocity = Math.cos(this.windRadian)* this.game.windVelocity;\n    // debugger;\n    // // console.log(\"windRadian\", this.windRadian);\n    // console.log(\"windVerticalVelocity\", this.windVerticalVelocity);\n    // console.log(\"windHorizontalVecloity\", this.windHorizontalVelocity);\n  }\n\n  // collidedWith(otherObject){\n  //   // this.game.remove(otherObject);\n  // }\n  updateCannonBall(){\n    let gravity = 2.75 * (this.airTime);\n    this.vel[0] += this.horizontalVelocity;\n    this.vel[1] += (-1 * this.verticalVelocity) + gravity;\n    // debugger;\n    // console.log(\"horizontal\", this.vel[0]);\n    // console.log(\"vertical\", this.vel[1]);\n\n  }\n\n  draw(ctx) {\n    // let radian = Math.PI * (this.angle * 5)/ 180;\n    // this.pos[0] = Math.cos(radian)*20; + this.pos[0];\n    // this.pos[1] = Math.sin(radian)*50 + this.pos[1]; //+ this.pos[1];\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true\n    );\n\n    ctx.fill();\n  }\n\n  move(timeDelta) {\n      // debugger;\n    this.updateCannonBall();\n    this.airTime += 1*60/5000;\n    const velocityScale = timeDelta / 30;//NORMAL_FRAME_TIME_DELTA,\n    const  offsetX = this.vel[0] * velocityScale +this.windHorizontalVelocity;\n    const  offsetY = this.vel[1] * velocityScale + this.windVerticalVelocity;\n    // console.log(\"offsetX\", offsetX);\n    // console.log(\"offsetY\", offsetY);\n    // debugger;\n    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n    if (this.game.isOutOfBounds(this.pos)) {\n      // console.log(\"removing cannonball\");\n      // debugger\n      this.remove();\n      // }\n    }\n  }\n\n  collidedWith(otherObject){\n    if (otherObject instanceof Enemy){\n      console.log(\"cannonball collidedwith\");\n      this.game.crashSound.play();\n      this.game.changeWind();\n      this.game.remove(otherObject);\n      this.game.remove(this);\n      this.game.score++;\n    }\n  }\n}\n\nCannonBall.SPEED = 15;\nCannonBall.RADIUS = 10;\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\n// export default CannonBall;\nmodule.exports = CannonBall;\n\n\n//# sourceURL=webpack:///./js/cannon_ball.js?");

/***/ }),

/***/ "./js/enemy.js":
/*!*********************!*\
  !*** ./js/enemy.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./js/moving_object.js\");\nconst CannonBall = __webpack_require__(/*! ./cannon_ball */ \"./js/cannon_ball.js\");\n// import MovingObject from './moving_object.js';\n// let b = MovingObject;\n// debugger;\nclass Enemy extends MovingObject{\n  constructor(options){\n    options.radius = Enemy.RADIUS;\n    options.vel = [-0.5, 0];\n    options.color = 'brown';\n    // .game = options.game;\n    // this.pos = options.pos;\n    super(options);\n    this.enemyAnimation = [[8,510, 31, 74],[48,510, 47,74], [104,511,39,73],\n    [152,511, 29, 73], [192,510, 40, 74], [240,510,32,74]];\n\n    // this.enemiesAnimation =\n    this.animationCount = 0;\n    this.animationDelay = 0;\n  }\n\n  draw(ctx){\n    let enemyImg = document.getElementById('enemy');\n      this.animationDelay += 1;\n\n    if (this.animationDelay++ >= 15){\n      this.animationDelay = 0;\n      this.animationCount++;\n\n      if (this.animationCount >= this.enemyAnimation.length){\n        this.animationCount = 0;\n        this.enemyAnimation[this.animationCount];\n      }\n      ctx.drawImage(enemyImg,  this.enemyAnimation[this.animationCount][0],   this.enemyAnimation[this.animationCount][1],\n          this.enemyAnimation[this.animationCount][2],\n          this.enemyAnimation[this.animationCount][3], this.pos[0],this.pos[1], 30,75);\n      // ctx.restore();\n    } else {\n      ctx.drawImage(enemyImg,  this.enemyAnimation[this.animationCount][0],   this.enemyAnimation[this.animationCount][1],\n          this.enemyAnimation[this.animationCount][2],\n          this.enemyAnimation[this.animationCount][3], this.pos[0],this.pos[1], 30,75);\n    }\n\n\n\n      // ctx.clearRect(this.pos[0], this.pos[1]-50, 30,75);\n      // updateFrame()\n      // ctx.drawImage(enemyImg,sprite[0], sprite[1], sprite[2], sprite[3], this.pos[0],this.pos[1]-50, 30,75);\n      // ctx.restore();\n\n    // ctx.fillStyle = this.color;\n    // ctx.beginPath();\n    // ctx.arc(\n    //   this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true\n    // );\n    //\n    // ctx.fill();\n\n  }\n\n  move(timeDelta) {\n  // timeDelta is number of milliseconds since last move\n  // if the computer is busy the time delta will be larger\n  // in this case the MovingObject should move farther in this frame\n  // velocity of object is how far it should move in 1/60th of a second\n    const velocityScale = timeDelta /30,//NORMAL_FRAME_TIME_DELTA,\n        offsetX = this.vel[0] * velocityScale,\n        offsetY = this.vel[1] * velocityScale;\n        // console.log(\"moving enemy\");\n\n    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n    if (this.pos[0] < 200) {\n      this.game.endGame();\n    }\n    if (this.game.isOutOfBounds(this.pos)) {\n      this.remove();\n    }\n  }\n\n  // collidedWith(otherObject){\n  //   // if (otherObject instanceof this){\n  //   //   console.log(\"enemy colliding with itself\")\n  //     // this.game.crashSound.play();\n  //     // this.game.changeWind();\n  //     // this.game.remove(otherObject);\n  //     // this.game.remove(this);\n  //   }\n  // }\n}\n\nEnemy.RADIUS = 20;\n\n// export default Enemy;\nmodule.exports = Enemy;\n\n\n//# sourceURL=webpack:///./js/enemy.js?");

/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Cannon = __webpack_require__(/*! ./cannon */ \"./js/cannon.js\");\nconst CannonBall = __webpack_require__(/*! ./cannon_ball */ \"./js/cannon_ball.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./js/enemy.js\");\n\n// import Cannon from  './cannon.js';\n// import CannonBall from './cannon_ball.js';\n// import Enemy from './enemy.js';\n\nclass Game {\n  constructor(ctx){\n    this.ctx = ctx;\n    this.cannon = new Cannon({pos: [120, 575], game: this, ctx: this.ctx});\n    // this.ram = ;\n    this.cannonballs = [];\n    // this.enemy = new Enemy({pos: [750, 580], game: this});\n    this.enemies = [];//[new Enemy({pos: [950,570], game: this})];\n    // this.addEnemies();\n\n    this.score = 1;\n    this.windVelocity = (Math.random() * 2).toFixed(2);\n    this.windAngle = Math.round(Math.random() * 360);\n    this.sound = sound.bind(this);\n    this.crashSound = new sound('sounds/explosion.mp3');\n    this.changeWind = this.changeWind.bind(this);\n    this.score = 0;\n    this.cannonBallsCount = 0;\n    this.addCannonBalls();\n\n  }\n  addCannonBalls(){\n    // this.game.cannonBallsCount += 1;\n    let that = this;\n    setInterval(function(){\n      that.cannonBallsCount += 1;\n    }, 1000);\n  }\n\n  changeWind(){\n    this.windVelocity = (Math.random() * 2).toFixed(2);\n    this.windAngle = Math.round(Math.random() * 360);\n  }\n\n  moveObjects(delta) {\n    this.allObjects().forEach((object) => {\n      object.move(delta);\n    });\n  }\n\n  allObjects() {\n    return [].concat(this.cannon, this.cannonballs, this.enemies);\n  }\n\n  checkCollisions() {\n    const allObjects = this.allObjects();\n    for (let i = 0; i < allObjects.length; i++) {\n      for (let j = 0; j < allObjects.length; j++) {\n        const obj1 = allObjects[i];\n        const obj2 = allObjects[j];\n\n        if (!(obj1 instanceof Cannon || obj2 instanceof Cannon)) {\n          // if (obj1 instanceof CannonBall && obj2 instanceof Enemy)\n          if(obj1 !== obj2)\n            if (obj1.isCollidedWith(obj2)) {\n              const collision = obj1.collidedWith(obj2);\n              if (collision) return;\n            }\n        }\n\n        // if(obj1 instanceof Cannon || obj2 instanceof Cannon){\n        //   console.log(\"check collision\", obj1, obj2);\n        //   if(obj1 != obj2 && !(obj1 instanceof CannonBall) && !(obj2 instanceof CannonBall)){\n        //     if (obj1.isCollidedWith(obj2)){\n        //       console.log(\"GAME OVER\", obj1, \"collidedwith\", obj2);\n        //     }\n        //   }\n        // }\n      }\n    }\n  }\n\n  remove(object){\n    if (object instanceof CannonBall){\n      if(this.cannonballs.indexOf(object)!== -1)\n      this.cannonballs.splice(this.cannonballs.indexOf(object), 1);\n    }else if (object instanceof Enemy){\n      if (this.enemies.indexOf(object) !== -1)\n      this.enemies.splice(this.enemies.indexOf(object), 1);\n    }\n  }\n\n  add(object){\n    // debugger;\n    if (object instanceof CannonBall){\n      this.cannonballs.push(object);\n    }\n    if (object instanceof Enemy){\n      this.enemies.push(object);\n    }\n  }\n\n  addEnemies(){\n    let that = this;\n    this.enemiesCreation = setInterval(function(){\n      that.add(new Enemy({pos: [950,525], game: that}));\n    }, 1000);\n  }\n\n  isOutOfBounds(pos) {\n    return (pos[0] < 0) || (pos[1] < 0) ||\n      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);\n  }\n\n  step(delta){\n    this.moveObjects(delta);\n    this.checkCollisions();\n  }\n\n  draw(ctx){\n    // this.ctx = ctx;\n    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    // debugger;\n    ctx.fillStyle = Game.BG_COLOR;\n    ctx.fillRect(0,0, Game.DIM_X, Game.DIM_Y);\n    // this.cannon.draw(ctx);\n    this.drawWind();\n    this.drawCastle();\n    this.drawScore();\n    this.allObjects().forEach(function(object) {\n      object.draw(ctx);\n    });\n  }\n\n  drawWind(){\n    this.ctx.font = \"16px Arial\";\n    this.ctx.fillStyle = \"white\";\n    this.ctx.fillText(this.windVelocity, 465, 90);\n\n    this.ctx.save();\n    /*translate to center of canvas?*/\n    // this.ctx.translate(150, 100);\n    // this.ctx.translate(400,300);\n    this.ctx.translate(475,125);\n    this.ctx.rotate((this.windAngle-90-180) * Math.PI/180);\n\n    let arrow = document.getElementById('arrow');\n    this.ctx.fillStyle = \"yellow\";\n    // this.ctx.fillRect(0,0,100,100);\n    this.ctx.drawImage(arrow, -25,-25, 50,50);\n    this.ctx.restore();\n    // console.log(this.windAngle)\n  }\n\n  drawCastle(){\n    let castle = document.getElementById(\"castle\");\n    this.ctx.drawImage(castle, 0, 505, 100,100);\n  }\n\n  drawScore(){\n    this.ctx.font = \"16px Arial\";\n    this.ctx.fillStyle = \"black\";\n    this.ctx.fillText(\"Current Score: \"+this.score, 320, 50);\n  }\n\n  endGame(){\n    console.log(\"YOU LOSE ENEMY REACHED YOU!\");\n    window.clearInterval(this.enemiesCreation);\n    this.enemies = [];\n    this.cannonballs = [];\n  }\n\n  // nextLevel(){\n  // }\n}\n\nfunction sound(src){\n  this.sound = document.createElement(\"audio\");\n  this.sound.src = src;\n  this.sound.setAttribute(\"preload\", \"auto\");\n  this.sound.setAttribute(\"controls\", \"none\");\n  this.sound.style.display = \"none\";\n  this.sound.volume = 0.01;\n  document.body.appendChild(this.sound);\n  this.play = function(){\n      this.sound.play();\n  };\n  this.stop = function(){\n      this.sound.pause();\n  };\n}\n\n\n\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.BG_COLOR = 'lightblue';\n\n// export default Game;\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./js/game.js?");

/***/ }),

/***/ "./js/game_view.js":
/*!*************************!*\
  !*** ./js/game_view.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// var fps = 30;\n// var now;\n// var then = Date.now();\n// var interval = 1000/fps;\n// var delta;\n\nclass GameView {\n  constructor(game, ctx){\n    this.ctx = ctx;\n    this.game = game;\n    this.cannon = this.game.cannon;\n    this.animation;\n  }\n\n  bindKeyHandlers(){\n    const cannon = this.cannon;\n\n    Object.keys(GameView.MOVES).forEach((k) => {\n      const move = GameView.MOVES[k];\n      key(k, () => { cannon.rotate(move);});\n    });\n\n    key(\"space\", () => {\n      cannon.fireCannonBall();});\n\n      // key(g, function () { debugger; cannon.fireCannonBall(); });\n  }\n\n  start() {\n    this.bindKeyHandlers();\n    this.lastTime = 0;\n    window.animation = requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate(time){\n    // console.log(\"animating\");\n    const timeDelta = time - this.lastTime;\n\n    this.game.step(timeDelta);\n    this.game.draw(this.ctx);\n    // this.game.cannon.draw(this.ctx);\n    this.lastTime = time;\n\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n\n  // stopAnimation(){\n    // window.cancelAnimationFrame(window.animation);\n  // }\n\n}\n\nGameView.MOVES = {\n  w: [0, -1],\n  s: [0, 1],\n  a: [-1, 0],\n  d: [1, 0]\n};\n\n// export default GameView;\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./js/game_view.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./js/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./js/game_view.js\");\n\n// import Game from './game.js';\n// import GameView from './game_view.js';\n\ndocument.addEventListener(\"DOMContentLoaded\", function(event) {\n  const canvasEl = document.getElementById('game-canvas');\n  canvasEl.width = Game.DIM_X;\n  canvasEl.height = Game.DIM_Y;\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new Game(ctx);\n  new GameView(game, ctx).start();\n  // let game = new Game();\n  // game.startGame();\n });\n\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ }),

/***/ "./js/moving_object.js":
/*!*****************************!*\
  !*** ./js/moving_object.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// import Util from './util.js';\nconst Util = __webpack_require__(/*! ./util.js */ \"./js/util.js\");\n// import Cannon from './cannon.js';\n// import CannonBall from './cannon_ball.js';\n// import Enemy from './enemy.js';\n// const Cannon = require('./cannon');\n// const CannonBall = require('./cannon_ball');\n// const Enemy = require('./enemy');\n\n\nclass MovingObject {\n  constructor(options){\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n  }\n\n  collidedWith(otherObject){}\n\n  draw(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.radius, 0 , 2 * Math.PI, true\n    );\n\n    ctx.fill();\n  }\n\n  move(timeDelta) {\n  // timeDelta is number of milliseconds since last move\n  // if the computer is busy the time delta will be larger\n  // in this case the MovingObject should move farther in this frame\n  // velocity of object is how far it should move in 1/60th of a second\n    const velocityScale = timeDelta /30,//NORMAL_FRAME_TIME_DELTA,\n        offsetX = this.vel[0] * velocityScale,\n        offsetY = this.vel[1] * velocityScale;\n\n    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n    if (this.game.isOutOfBounds(this.pos)) {\n      // console.log(\"removing cannonball\");\n      // debugger\n      this.remove();\n      // }\n    }\n  }\n\n  isCollidedWith(otherObject){\n    let centerDist = Util.dist(this.pos, otherObject.pos);\n    return centerDist < (this.radius + otherObject.radius);\n  }\n\n  remove(){\n    this.game.remove(this);\n  }\n}\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n// export default MovingObject;\n\n// export default MovingObject;\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./js/moving_object.js?");

/***/ }),

/***/ "./js/util.js":
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  dist(pos1, pos2){\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n\n  // Find the length of the vector.\n  norm(vec) {\n    return Util.dist([0, 0], vec);\n  },\n  dir(vec) {\n    const norm = Util.norm(vec);\n    return Util.scale(vec, 1 / norm);\n  },\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n};\n\n// export default Util;\nmodule.exports = Util;\n\n\n//# sourceURL=webpack:///./js/util.js?");

/***/ })

/******/ });