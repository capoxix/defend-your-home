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

    this.requestId = undefined;

    // this.loop = this.loop.bind(this);
    // this.start = this.start.bind(this);
    // this.stop =  this.stop.bind(this);
    //
    // this.lastTime = 0;

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

  setup(){
    this.game.draw(this.ctx);
  }

  // stop(){
  //
  // }

  animate(time){
    // console.log("animating");
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    // this.game.cannon.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

  /**/

    // start(){
    //   // debugger;
    //   if(!this.requestId){
    //     this.requestId = window.requestAnimationFrame(this.loop);
    //   }
    // }
    //
    // loop(time){
    //   this.requestId = undefined;
    //
    //   const timeDelta = time- this.lastTime;
    //   this.game.step(timeDelta);
    //   this.game.draw(this.ctx);
    //   this.start();
    //
    // }
    //
    // stop(){
    //   if(this.requestId) {
    //     window.cancelAnimationFrame(this.requestId);
    //     this.requestId = undefined;
    //   }
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
