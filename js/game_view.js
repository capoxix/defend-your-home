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
    this.animation;
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
    window.animation = requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    // console.log("animating");
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);

    // debugger;
    this.game.draw(this.ctx);
    // this.game.cannon.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));



  //   now = Date.now();
  // delta = now - then;
  //
  // if (delta > interval) {
  //
  //     // update time stuffs
  //
  //     // Just `then = now` is not enough.
  //     // Lets say we set fps at 10 which means
  //     // each frame must take 100ms
  //     // Now frame executes in 16ms (60fps) so
  //     // the loop iterates 7 times (16*7 = 112ms) until
  //     // delta > interval === true
  //     // Eventually this lowers down the FPS as
  //     // 112*10 = 1120ms (NOT 1000ms).
  //     // So we have to get rid of that extra 12ms
  //     // by subtracting delta (112) % interval (100).
  //     // Hope that makes sense.
  //
  //     then = now - (delta % interval);
  //     this.game.step(timeDelta);
  //
  //     // debugger;
  //     this.game.draw(this.ctx);
  //
  //     // ... Code for Drawing the Frame ...
  //   }
  }


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

module.exports = GameView;
