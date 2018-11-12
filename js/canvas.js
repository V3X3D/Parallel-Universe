gA.canvas = (function() {
  "use strict";

  function init() {
    this.render = function() {
      if(!gA.state.pauseMenu) {
        gA.ctx.b.fillStyle = 'rgb('+gA.bgClr.R+','+gA.bgClr.G+','+gA.bgClr.B+')';
        gA.ctx.b.fillRect(0, 0, gA.cW, gA.cH);
      }
    };
  }

  return { init: init };
})();
