gA.canvas = (function() {
  "use strict";

  // Setting Up The Canvas
  function init() {

    this.render = function() {
      if(!gA.state.pauseMenu) {
        gA.ctx.b.fillStyle = 'rgb('+gA.lvl.cur.bgClr.R+','+gA.lvl.cur.bgClr.G+','+gA.lvl.cur.bgClr.B+')';
        gA.ctx.b.fillRect(0, 0, gA.cW, gA.cH);
        gA.ctx.m.clearRect(0, 0, gA.cW, gA.cH);
        gA.ctx.g.clearRect(0, 0, gA.cW, gA.cH);

        //
        // gA.ctx.v.clearRect(0, 0, gA.cW, gA.cH);
      }
    };
  }

  return {
    init: init
  };

})();
