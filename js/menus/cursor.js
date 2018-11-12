gA.cursor = (function() {
  "use strict";

  var state = function(options, shared, context) {

    this.curMaxX = shared.x-gA.tS/1.5;
    this.curMinX = shared.x-gA.tS;
    this.curX = this.curMinX;
    this.curY = options.opt0.y;
    this.curVX = -0.5;

    this.update = function() {
      if(this.curX <= this.curMinX) this.curVX = -this.curVX;
      else if(this.curX >= this.curMaxX) this.curVX = -this.curVX;
      this.curX += this.curVX;

      if(gA.key.down) {
        gA.key.down = false;
        shared.selected += 1;
        if(shared.selected >= shared.size) shared.selected = 0;
        this.curY = options['opt'+shared.selected+''].y; 
      } else if(gA.key.up) {
        gA.key.up = false;
        shared.selected -= 1;
        if(shared.selected < 0) shared.selected = shared.size-1;
        this.curY = options['opt'+shared.selected+''].y; 
      }

      if(gA.key.select) {
        for(var key in options) {
          if (options.hasOwnProperty(key)) {
            if(options[key].y === this.curY) {
              gA.key.select = false;
              options[key].animation(context, key);
            }
          }
        }
      }
    };
    this.render = function() {
      if(typeof(gA.ctx.g.fillStyle = options['opt'+shared.selected+''].color) === 'function') {
        gA.ctx.g.fillStyle = options['opt'+shared.selected+''].color();
      } else {
        gA.ctx.g.fillStyle = options['opt'+shared.selected+''].color;
      }
      // if(gA.state.titleScreen)
      // else

      gA.ctx.g.fillText('>', this.curX, this.curY);
    };
  };

  return { 
    state: state
  };

})();
