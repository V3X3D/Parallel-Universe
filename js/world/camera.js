gA.cam = (function() {
  "use strict";

  var state = function() {
    this.curX;
    this.curY;
    this.x = 0;
    this.y = 0;
    this.lvlW = gA.lvl.cur.map[0].length*gA.tS;
    this.lvlH = gA.lvl.cur.map.length*gA.tS;

    this.edgeLock = true;
    this.frozen = false;

    this.shake = false;
    this.invert = Math.random() < 0.5 ? -1 : 1;
    this.offset;
    this.delay = 6;
    this.timer = true;

    this.set = function() {
      this.x = gA.player.state.x+gA.player.state.w/2-gA.cW/2;
      this.y = gA.player.state.y+gA.player.state.h-gA.cH/2;

      if(this.x+gA.cW > this.lvlW) this.x = this.lvlW - gA.cW;
      if(this.x < 0) this.x = 0;
      if(this.y+gA.cH > this.lvlH) this.y = this.lvlH - gA.cH;
      if(this.y < 0) this.y = 0;
    };
    this.update = function() {
      if(this.shake && this.timer) {
        setTimeout(function() {
          if(this.delay > 0) {
            this.invert = -this.invert;
            this.delay -= 1;
            this.x += Math.floor(Math.random()*this.offset+1)*this.invert;
            this.y += Math.floor(Math.random()*this.offset+1)*this.invert;
          } else {
            this.delay = 6;
            this.shake = false;
          }
          this.timer = true;
        }.bind(this), 40);

        this.timer = false;
      } else if(!this.frozen) {
        this.curX = gA.player.state.x+gA.player.state.w/2-gA.cW/2;
        if(this.curX > this.x) {
          this.x += Math.ceil(( this.curX-this.x )/18);
          if(this.x+gA.cW > this.lvlW && this.edgeLock) this.x = this.lvlW - gA.cW;
        } else if(this.curX < this.x) {
          this.x -= Math.ceil(( this.x-this.curX )/18);
          if(this.x < 0 && this.edgeLock) this.x = 0;
        }

        this.curY = gA.player.state.y+gA.player.state.h-gA.cH/2;
        if(this.curY > this.y) {
          this.y += Math.ceil(( this.curY-this.y )/10);
          if(this.y+gA.cH > this.lvlH && this.edgeLock) this.y = this.lvlH - gA.cH;
        } else if(this.curY < this.y) {
          this.y -= Math.ceil(( this.y-this.curY )/10);
          if(this.y < 0 && this.edgeLock) this.y = 0;
        }
      }
    };
  };

  return { state: new state() };
})();

