class GameView {
  constructor(game, ctx, bgSoundFnc){
    this.ctx = ctx;
    this.game = game;
    this.cannon = this.game.cannon;
    this.start = this.start.bind(this);
    this.stop =  this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.bgSound = bgSoundFnc('sounds/background.mp3');
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
    this.game.addEnemies();
    this.game.addCannonBalls();
    this.animationPlaying = true;
    this.animate();
    let that = this;
    this.bgSound.play();
    let bgAudioNode = document.getElementById("bgsound");
    setInterval(function(){
      if(!bgAudioNode.muted){
        that.bgSound.play();
      }
    },54000);
  }

  setup(){
    this.bindKeyHandlers();
    this.game.draw(this.ctx);
  }

  animate(time){
    if(this.animationPlaying) {

      const timeDelta = 1000/60;

      this.game.step(timeDelta);
      this.game.draw(this.ctx);

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

module.exports = GameView;
