gA.canvas = (function() {
  "use strict";

  // Setting Up The Canvas
  function init() {

    this.render = function() {
      if(!gA.state.pauseMenu) {
        // gA.ctx.n.clearRect(0, 0, gA.cW, gA.cH);
        gA.ctx.b.fillStyle = 'rgb('+gA.level.bgClr.R+','+gA.level.bgClr.G+','+gA.level.bgClr.B+')';
        gA.ctx.b.fillRect(0, 0, gA.cW, gA.cH);
        gA.ctx.m.clearRect(0, 0, gA.cW, gA.cH);
        gA.ctx.g.clearRect(0, 0, gA.cW, gA.cH);
      } else {
        // gA.ctx.n.clearRect(0, 0, gA.cW, gA.cH);
      }
    };
  }

  return {
    init: init
  };

})();
