gA.canvas = (function() {
  "use strict";

  // Setting Up The Canvas
  function canvasInit() {
    gA.ctx.gCanv.width = gA.cW;
    gA.ctx.gCanv.height = gA.cH;

    this.render = function() {
      gA.ctx.g.fillStyle = '#fcd';
      gA.ctx.g.fillRect(0, 0, gA.cW, gA.cH);
    };
  }

  return {
    init: canvasInit
  };

})();
