gA.bg = (function() {
  "use strict";

  //All panes
  var array = [];

  var pane = function(sequence) {
    this.x = sequence.x;
    this.y = sequence.y;
    this.w = sequence.w;
    this.h = sequence.h;
    this.sequence = sequence;

    this.logic = function() {
      this.sequence.logic();
    };
    this.draw = function() {
      gA.ctx.b.fillStyle = 'rgb('+gA.fgClr.R+','+gA.fgClr.G+','+gA.fgClr.B+')';
      this.sequence.draw();
    };
  };

  //For updating and render panes
  var init = function() {
    var i;

    this.update = function() {
      array = [];
      for(i = 0; i < gA.load.length; i+=1) {
        array.push(new pane(gA.load[i]));
        array[i].logic();
      }
    };
    this.render = function() {
      for(i = 0; i < array.length; i += 1) array[i].draw();
    };
  };

  return {
    init: new init,
    pane: pane
  };

})();

