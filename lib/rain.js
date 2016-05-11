var Bucket = require("./bucket.js");
var Game = require("./game.js");

var Rain = function (game) {
  this.getStartPos();
  this.fallSpeed = 2;
  this.game = game;
  this.dropped = false;
};

Rain.prototype.getStartPos = function() {
  var startPos = Math.floor(Math.random() * 5);

  if (startPos === 0) {
    this.pos = [20, 0];
  } else if (startPos === 1) {
    this.pos = [106, 0];
  } else if (startPos === 2) {
    this.pos = [192, 0];
  } else if (startPos === 3) {
    this.pos = [278, 0];
  } else if (startPos === 4) {
    this.pos = [364, 0];
  }

  this.dropped = false;
};

Rain.prototype.draw = function (ctx) {
  this.pos[1] += this.fallSpeed;
  if (this.pos[1] >= 354) {
    this.game.checkCaught(this.game, ctx);

    this.fallSpeed += .2;
  }

  ctx.drawImage(raindrop, this.pos[0], this.pos[1]);
};

module.exports = Rain;
