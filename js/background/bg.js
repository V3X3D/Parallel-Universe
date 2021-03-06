gA.bg = (function() {
  "use strict";

  //All panes
  var array = [], i, alpha = 1;

  var pane = function(seq) {
    this.x = seq.x;
    this.y = seq.y;
    this.w = seq.w;
    this.h = seq.h;
    this.seq = seq;

    this.logic = function() { this.seq.logic(); };
    this.draw = function() {
      gA.ctx.b.fillStyle = 'rgb('+gA.fgClr.R+','+gA.fgClr.G+','+gA.fgClr.B+', '+alpha+')';
      this.seq.draw();
    };
  };

  //For updating and render panes
  var init = function() {
    this.update = function() {
      array = [];
      for(i=0; i<gA.load.length; i+=1) {
        array.push(new pane(gA.load[i]));
        array[i].logic();
      }
    };
    this.render = function() {
      for(i=0; i<array.length; i+=1) array[i].draw();
    };
  };

  var lowerAlpha = function() { alpha -= 0.035; };
  var maxAlpha = function() { alpha = 1; };

  return {
    init: new init,
    pane: pane,
    lowerAlpha: lowerAlpha,
    maxAlpha: maxAlpha
  };
})();

