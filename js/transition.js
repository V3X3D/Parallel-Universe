gA.transitions = (function() {
  "use strict";

  var fadeIn = true;
  var A = 1;

  function fadeToggle() {
    if(fadeIn) fadeIn = false; 
    else fadeIn = true;
  }

  var fade = function() {
    this.x = 0;
    this.y = 0;
    this.bgRGB = '0,0,0';

    this.update = function() {
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
        gA.state.transition = false;
        if(A >= 1) gA.nextLevel.go();
      }
    };

    this.render = function() {
      gA.ctx.g.fillStyle = 'rgba('+this.bgRGB+','+A+')';
      gA.ctx.g.fillRect(this.x, this.y, gA.cW, gA.cH);
    };
  };

  var reset = function() { fadeIn = true; A = 1; };

  return {
    fade: fade,
    reset: reset
  };

})();

