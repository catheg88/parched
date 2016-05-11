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
