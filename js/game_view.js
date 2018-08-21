class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.cannon = this.game.addCannon();
  }

  bindKeyHandlers(){
    const cannon = this.cannon;

    Object.keys(GameView.MOVES).forEach((k) => {
      const move = GameView.MOVES[k];
      key(k, () => { cannon.power(move);});
    });

    key("space", () => {cannon.shoot();});
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  w: ['up'],
  s: ['down']
};

module.exports = GameView;
