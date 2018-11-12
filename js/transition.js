gA.transitions = (function() {
  "use strict";

  var fadeIn = true, A = 1, once = false;

  function fadeToggle() {
    if(fadeIn) fadeIn = false;
    else fadeIn = true;
  }

  var fade = function() {
    this.x = 0;
    this.y = 0;
    this.bgRGB = '0,0,0';

    this.update = function() {
      gA.heart.pace(1.15);
      if(!fadeIn) {
        if(A < 1) A += 0.035;
        if(A >= 1) {
          fadeToggle();
          A = 1;
        }
      } else {
        if(A > 0) A -= 0.035;
        if(A <= 0) {
          fadeToggle();
          A = 0;
        }
      }
      if(A <= 0 || A >= 1) {
        gA.transition = false;
        if(A >= 1) {
          if(gA.player.state.alive) gA.nextLevel.go();
          else gA.nextLevel.go(-1);
        }
      }
    };

    this.render = function() {
      gA.ctx.g.fillStyle = 'rgba('+this.bgRGB+','+A+')';
      gA.ctx.g.fillRect(this.x, this.y, gA.cW, gA.cH);
    };
  };

  var end = function() {
    this.update = function() {
      if(!once) {
        once = true;
        var timeOut = setTimeout(function() {
          gA.cam.state.edgeLock = false;
        }, 650);
        var timeOut2 = setTimeout(function() {
          gA.player.state.end = true;
          gA.contentLock30 = false;
        }, 1750);
      }
    };
    this.render = function() {
      gA.bg.lowerAlpha();
    };
  };

  var reset = function() { fadeIn = true; A = 1; once = false; };

  return {
    fade: new fade(),
    end: new end(),
    reset: reset
  };
})();

