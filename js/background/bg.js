gA.bg = (function() {
  "use strict";

  //All panes
  var array = [];

  var pane = function(sequence) {
    this.x = sequence.x;
    this.y = sequence.y;
    this.w = sequence.w;
    this.h = sequence.h;
    this.color = sequence.color;
    this.sequence = sequence;

    this.update = function() {
      this.sequence.logic();
    };
    this.render = function() {
      gA.ctx.b.fillStyle = this.color;
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
        array[i].update();
      }
      // for(i = 0; i < array.length; i += 1) array[i].update();
    };
    this.render = function() {
      for(i = 0; i < array.length; i += 1) array[i].render();
    };
  };

  return {
    init: new init,
    pane: pane
  };

})();

