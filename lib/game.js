var Bucket = require("./bucket.js");
var Rain = require("./rain.js");
var GameView = require("./gameView.js");

var Game = function () {
  this.bucket = new Bucket();
  this.rain = new Rain(this);
  this.score = 0;
  this.gameIsOver = false;
  this.dripSound = document.getElementById('drip');
  this.gameOverSound = document.getElementById('gameOverSound');
  this.highScore = 0;
  this.screamCounter = 0;
};

Game.DIM_X = 400;
Game.DIM_Y = 400;

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.drawImage(bg, 0, 0);

  this.bucket.draw(ctx);
  this.rain.draw(ctx);

  if (this.score >= this.highScore) {
    this.highScore = this.score;
  };

  ctx.font = "Press Start 2P";
  ctx.fillStyle = 'yellow';
  ctx.fillText("Score: " + this.score, 5, 20);
  ctx.fillText("High Score: " + this.highScore, 182, 20);

};

Game.prototype.checkCaught = function(game, ctx) {
  if (game.rain.pos[1] >= 354) {
    game.rain.dropped = true;
  }
  if ((game.rain.pos[0] === game.bucket.pos[0] + 12) && game.rain.dropped && !this.gameIsOver) {
    this.dripSound.currentTime = 0;
    this.dripSound.play();
    this.score += 1;
    game.rain.getStartPos();
  } else {
    if (this.screamCounter === 0) {
      this.gameOverSound.play();
      this.screamCounter += 1;
    }
    this.gameOver(game, ctx);
  }
};

Game.prototype.gameOver = function(game, ctx) {
  ctx.drawImage(game_over, 25, 25);
  if (this.gameIsOver === false) {
    setTimeout(function(rain) {
      game.rain.getStartPos();
      game.rain.fallSpeed = 2;
      game.gameIsOver = false;
      game.score = 0;
      game.screamCounter = 0;
      game.bucket.pos = [180, 352];
    }, 3000, game.rain);
  };
  this.gameIsOver = true;

};

module.exports = Game;
