gA.overlay = (function() {
  "use strict";

  var state = function() {
    this.s = 20;
    this.delay = 50;
    this.y = -this.s;
    this.vy = -1;
    // this.bgClr;
    // this.fgClr;
    this.count = -1;

    this.update = function() {
      if(this.count < gA.deathNum) {
        if(this.y >= this.s) {
          this.delay -= 1;
          if(this.delay <= 0) {
            this.vy = -this.vy;
          }
        } else if(this.y <= -this.s){
          this.vy = -this.vy;
        }
        this.y += this.vy;
        if(this.y >= this.s) this.y = this.s;
        if(this.y <= -this.s) {this.y = -this.s; this.count = gA.deathNum; this.delay = 50;}
      }
    };
    this.render = function() {
      this.bgRGB = [gA.level.bgClr.R, gA.level.bgClr.G, gA.level.bgClr.B];
      this.fgRGB = [gA.fgClr.R, gA.fgClr.G, gA.fgClr.B];
      // this.bgRGB = gA.colorAjust(this.bgRGB, 50);
      // this.fgRGB = gA.colorAjust(this.fgRGB, 50);

      this.bgClr = 'rgba('+ this.bgRGB[0] +','+this.bgRGB[1]+','+ this.bgRGB[2] +',1)';
      this.fgClr = 'rgba('+ this.fgRGB[0] +','+this.fgRGB[1]+','+ this.fgRGB[2] +',1)';

      gA.ctx.g.font = ''+this.s+'px monospace';
      gA.ctx.g.lineWidth = 2;
      // gA.ctx.g.strokeStyle = '#000';
      gA.ctx.g.fillStyle = this.bgClr;
      gA.ctx.g.fillRect(0, 0, gA.cW, this.y+8);
      gA.ctx.g.fillStyle = this.fgClr;
      gA.ctx.g.fillText('Deaths: '+gA.deathNum+'', 0, this.y);
    };
  };

  return {
    state: new state
  };

})();
