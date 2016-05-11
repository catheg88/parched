/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(4);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Bucket = __webpack_require__(2);
	var Rain = __webpack_require__(3);
	var GameView = __webpack_require__(4);
	
	var Game = function () {
	  this.bucket = new Bucket();
	  this.rain = new Rain(this);
	  this.score = 0;
	  this.gameIsOver = false;
	};
	
	Game.DIM_X = 400;
	Game.DIM_Y = 400;
	
	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  ctx.drawImage(bg, 0, 0);
	
	  this.bucket.draw(ctx);
	  this.rain.draw(ctx);
	
	  ctx.font = "Press Start 2P";
	  ctx.fillStyle = 'yellow';
	  ctx.fillText("Score: " + this.score, 5, 20);
	};
	
	Game.prototype.checkCaught = function(game, ctx) {
	  if (game.rain.pos[1] >= 354) {
	    game.rain.dropped = true;
	  }
	  if ((game.rain.pos[0] === game.bucket.pos[0] + 12) && game.rain.dropped && !this.gameIsOver) {
	    this.score += 1;
	    game.rain.getStartPos();
	  } else {
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
	      game.bucket.pos = [180, 352];
	    }, 3000, game.rain);
	  };
	  this.gameIsOver = true;
	
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Bucket = function() {
	  this.pos = [180, 352];
	};
	
	Bucket.prototype.draw = function (ctx) {
	  ctx.fillStyle = "#FF0000";
	  var bucket = document.getElementById("bucket");
	  ctx.drawImage(bucket, this.pos[0], this.pos[1]);
	};
	
	Bucket.prototype.move = function(move) {
	  this.pos[0] = this.pos[0] + move[0];
	  this.pos[1] = this.pos[1] + move[1];
	
	  if (this.pos[0] < 8) {
	    this.pos[0] = 8;
	  }
	  if (this.pos[0] > 352) {
	    this.pos[0] = 352;
	  }
	};
	
	module.exports = Bucket;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Bucket = __webpack_require__(2);
	var Game = __webpack_require__(1);
	
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Bucket = __webpack_require__(2);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map