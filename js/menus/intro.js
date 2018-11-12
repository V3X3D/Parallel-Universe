gA.intro = (function() {
  "use strict";

  var init = function() {

    this.update = function() {
      seq1.action();
      seq2.action();
      if(seq3.action()) return true;
    };
    this.render = function() {
      gA.ctx.g.fillStyle = '#fff';
      gA.ctx.g.fillRect(0, 0, gA.cW, gA.cH);
      seq1.draw();
      seq2.draw();
    };
  };

  var seq1 = {
    color: '#000',
    x: -gA.cW,
    y: 0,
    spd: 38,
    delay: 40,
    action: function() {
      if(this.delay > 0) this.delay -= 1;
      if(this.x < 0 && this.delay <= 0) {
        this.x += this.spd;
        if(this.x > 0) this.x = 0;
      }
    },
    draw: function() {
      gA.ctx.g.fillStyle = this.color;
      gA.ctx.g.fillRect(this.x, this.y, gA.cW, gA.cH);
    }
  };
  var seq2 = {
    color: '#fff',
    x: 0,
    y: gA.cH,
    spd: 24,
    delay: 70,
    action: function() {
      if(this.delay > 0) this.delay -= 1;
      if(this.y > gA.cH/2 && this.delay <= 0) {
        this.y -= this.spd;
        if(this.y < gA.cH/2) this.y = gA.cH/2;
      }
    },
    draw: function() {
      gA.ctx.g.fillStyle = this.color;
      gA.ctx.g.fillRect(this.x, this.y, gA.cW, gA.cH);
    }
  };
  var seq3 = {
    delay: 100,
    action: function() {
      if(this.delay > 0) this.delay -= 1;
      if(this.delay <= 0) return true;
      return false;
    }
  };

  return { init: init };
})();
