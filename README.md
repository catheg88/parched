#Parched!

Live:  http://catheg88.github.io/parched/

##Instructions

Use the left and right arrow keys to try to catch the falling raindrops.

Try not to die.

##Game design

Created using the following technologies:

* Javascript, using webpack to
* jQuery, hosted by Google
* CSS and Google fonts
* Images and sound hosted on Cloudinary

##Technical implementation

The raindrops have speeds set in pixels per frame.  There is only one raindrop in play at any given time.  The raindrop is created with an initial speed of 2px/frame, and a starting position:
```javascript
var Rain = function (game) {
  this.getStartPos();
  this.fallSpeed = 2;
  this.game = game;
  this.dropped = false;
};
```

Every frame, the raindrop adjusts its position: `this.pos[1] += this.fallSpeed;`
Each time the raindrop falls, it increases its speed by 20%: `this.fallSpeed += .2`
Once the raindrop reaches the bottom of the screen, it changes its instance variable `dropped` from false to true, and checks whether it was caught, comparing the position of the fallen drop and the bucket.  If it was indeed caught, the drop is assigned a new starting position: `game.rain.getStartPos();`

Audio was added via `<audio>`tags in the `index.html` header.  The mute button uses jQuery to identify all audio objects on the page and set their volume to either 0% (if playing) or 100% (if muted):
```html
<script>
$('#mute').on('click', function(){
  sounds = $('.sound')
  sounds.each(function(){
    if(this.volume === 0) {
      this.volume = 1;
    } else {
      this.volume = 0;
    }
  });
});
</script>
```

##Features for further development

This game is a continuing work in progress.  Future features to implement include:

* Global leaderboard
* "Flash flood" obstacle requiring vertical bucket movement
* Adjustment of
