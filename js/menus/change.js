gA.change = (function() {
  "use strict";

  var array = [];

  var fade = function(type, action, spd) {
    this.x = 0;
    this.y = 0;
    this.spd = spd || 0.1;
    this.bgRGB = '0,0,0';

    if(type === 'in') this.A = 1;
    else this.A = 0;

    this.logic = function() {
      if(type === 'out') {
        if(this.A < 1) this.A += this.spd;
        if(this.A > 1) this.A = 1;
      } else if(type === 'in'){
        if(this.A > 0) this.A -= this.spd;
        if(this.A < 0) this.A = 0;
      }

      if(this.A <= 0 || this.A >= 1) {
        gA.state.transition = false;
        if(action !== undefined) action();
      }
    };

    this.draw = function() {
      gA.ctx.g.fillStyle = 'rgba('+this.bgRGB+','+this.A+')';
      gA.ctx.g.fillRect(this.x, this.y, gA.cW, gA.cH);
      if(this.A <= 0 || this.A >= 1) array = [];
    };
  };

  var state = function() {
    var i;
    this.update = function() { for(i=0; i<array.length; i+=1) array[i].logic(); };
    this.render = function() { for(i=0; i<array.length; i+=1) array[i].draw(); };
  };
  var arrPush = function(content) { array.push(content); };

  return { 
    state: new state,
    fade: fade,
    arrPush: arrPush
  };

})();

