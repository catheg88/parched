var Game = require("./game.js");
var GameView = require("./gameView.js");

document.addEventListener("DOMContentLoaded", function(){
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  var ctx = canvasEl.getContext("2d");
  ctx.font = '15px "Press Start 2P"';

  var audio = new Audio("http://res.cloudinary.com/dfthfd7v8/video/upload/v1462938433/js_capstone/bg_music.wav");
  audio.loop = true;
  audio.play();

  var game = new Game();
  new GameView(game, ctx).start();
});
