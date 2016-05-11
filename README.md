#Parched!

Live:  http://catheg88.github.io/parched/

##Instructions

Use the left and right arrow keys to try to catch the falling raindrops.

Try not to die.

##Game design

Created using the following technologies:

* Javascript
* jQuery, hosted by Google
* CSS and Google fonts
* Images and sound hosted on Cloudinary

##Technical implementation

* The raindrops have speeds set in pixels per frame.  There is only one raindrop in play at any given time.  The raindrop is created with an initial speed of 2px/frame, and a starting position:
"""
var Rain = function (game) {
  this.getStartPos();
  this.fallSpeed = 2;
  this.game = game;
  this.dropped = false;
};
"""
Every frame, the raindrop adjusts its position:
`    this.pos[1] += this.fallSpeed;``
Each time the raindrop falls, it increases its speed by 20%:
`    this.fallSpeed += .2`
Once the raindrop reaches the bottom of the screen, it changes its instance variable `dropped` from false to true, and checks whether it was caught.  If it was, it is assigned a new starting position:
`      game.rain.getStartPos();`


##Features for further development

This game is a continuing work in progress.  Future features to implement include:

* Global leaderboard
* "Flash flood" obstacle requiring vertical bucket movement
* Adjustment of
