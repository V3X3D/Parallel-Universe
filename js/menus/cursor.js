gA.cursor = (function() {
  "use strict";

  var state = function(opts, share, context) {

    this.share = share;

    this.curMaxX = this.share.x-gA.tS/1.5;
    this.curMinX = this.share.x-gA.tS;
    this.curX = this.curMinX;
    this.curY = opts[0].y;
    this.curVX = -0.5;

    this.update = function() {
      if(this.curX <= this.curMinX) this.curVX = -this.curVX;
      else if(this.curX >= this.curMaxX) this.curVX = -this.curVX;
      this.curX += this.curVX;

      if(gA.key.down && !gA.noHold.down) {
        gA.noHold.down = true;
        gA.sound.cursor.play();
        gA.key.down = false;
        this.share.selected += 1;
        if(this.share.selected >= opts.length) this.share.selected = 0;
      } else if(gA.key.up && !gA.noHold.up) {
        gA.noHold.up = true;
        gA.sound.cursor.play();
        gA.key.up = false;
        this.share.selected -= 1;
        if(this.share.selected < 0) this.share.selected = opts.length-1;
      }
      this.curY = opts[this.share.selected].y;

      for(var k=0; k<opts.length; k+=1) {
        if(opts[k].y === this.curY && gA.key.select) {
          gA.sound.cursor.play();
          gA.key.select = false;
          opts[k].animation(context, k);
        }
      }
    };
    this.render = function() {
      if(typeof(gA.ctx.g.fillStyle = opts[this.share.selected].color) === 'function')
        gA.ctx.g.fillStyle = opts[this.share.selected].color(context);
      else
        gA.ctx.g.fillStyle = opts[this.share.selected].color;

      gA.ctx.g.fillText('>', this.curX, this.curY);
    };
  };

  return { state: state };
})();
