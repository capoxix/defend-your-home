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
    this.game.draw(this.ctx);
    // this.game.cannon.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
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

// export default GameView;
module.exports = GameView;
