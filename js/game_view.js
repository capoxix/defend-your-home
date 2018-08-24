class GameView {
  constructor(game, ctx){

    this.ctx = ctx;
    this.game = game;
    this.cannon = this.game.cannon;
    this.start = this.start.bind(this);
    this.stop =  this.stop.bind(this);
    this.animate = this.animate.bind(this);

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
  }

  start() {
    this.bindKeyHandlers();
    this.game.addEnemies();
    this.game.addCannonBalls();
    this.animationPlaying = true;
    this.animate(this.lastTime);

  }

  setup(){
    this.game.draw(this.ctx);
  }

  animate(time){
    if(this.animationPlaying) {

      const timeDelta = 1000/60;

      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.lastTime = time;

      this.requestId = requestAnimationFrame(this.animate.bind(this));
      window.requestId = this.requestId;
    }
  }

  stop(){
    window.cancelAnimationFrame(this.requestId);
    this.game.cancelEnemies();
    this.game.cancelCannonBalls();
  }
}

GameView.MOVES = {
  w: [0, -1],
  s: [0, 1],
  a: [-1, 0],
  d: [1, 0]
};

// export default GameView;
module.exports = GameView;
