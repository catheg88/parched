var Bucket = require("./bucket.js");

var GameView = function (game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.MOVES = {
  "left": [-86, 0],
  "right": [86, 0]
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.bindKeyHandlers = function () {
  var bucket = this.game.bucket;

  Object.keys(GameView.MOVES).forEach(function (k) {
    var move = GameView.MOVES[k];
    key(k, function () { bucket.move(move); });
  });
};

GameView.prototype.animate = function(time){
  this.game.draw(this.ctx);
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
