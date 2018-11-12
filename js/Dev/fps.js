gA.fps = (function() {
  "use strict";

  var init = function() {
    this.fps = 0;
    var lastLoop = (new Date()).getMilliseconds();
    var count = 1;

    this.update = function() {

      var currentLoop = (new Date()).getMilliseconds();
      if (lastLoop > currentLoop) {
        this.fps = count;
        count = 1;
      } else {
        count += 1;
      }
      lastLoop = currentLoop;
    };
    this.render = function() {
      gA.ctx.g.font = ''+15+'px monospace';
      gA.ctx.g.lineWidth = 1;
      gA.ctx.g.strokeStyle = 'black';
      gA.ctx.g.strokeText('FPS: '+this.fps+'', gA.cW-gA.ctx.g.measureText('FPS: 00').width, 15);
      gA.ctx.g.fillStyle = 'white';
      gA.ctx.g.fillText('FPS: '+this.fps+'', gA.cW-gA.ctx.g.measureText('FPS: 00').width, 15);
    };

  };

  return {
    init: init
  };

})();

