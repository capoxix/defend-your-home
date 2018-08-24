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
