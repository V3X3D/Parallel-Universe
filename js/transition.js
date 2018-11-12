gA.transitions = (function() {
  "use strict";

  var fadeIn = true;

  function fadeToggle() {
    if(fadeIn === true) fadeIn = false; 
    else if(fadeIn === false) fadeIn = true;
  }

  var fade = function() {
    this.x = 0;
    this.y = 0;
    this.A = 1;
    this.bgRGB = '0,0,0';

    this.update = function() {
      if(fadeIn === false) {
        if(this.A < 1) this.A += 0.035;
        if(this.A > 1) this.A = 1;
      } else {
        if(this.A > 0) this.A -= 0.035;
        if(this.A < 0) this.A = 0;
      }
      if(this.A <= 0 || this.A >= 1) {
        gA.state.transition = false;
        if(this. A === 1) gA.nextLevel.go();
      }
    };

    this.render = function() {
      gA.ctx.g.fillStyle = 'rgba('+this.bgRGB+','+this.A+')';
      gA.ctx.g.fillRect(this.x, this.y, gA.cW, gA.cH);
    };
  };

  return {
    fade: fade,
    fadeToggle: fadeToggle
  };

})();

