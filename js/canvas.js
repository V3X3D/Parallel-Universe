gA.canvas = (function() {
  "use strict";

  // Setting Up The Canvas
  function init() {

    this.render = function() {
      gA.ctx.b.fillStyle = '#faa';
      gA.ctx.b.fillRect(0, 0, gA.cW, gA.cH);

      gA.ctx.g.clearRect(0, 0, gA.cW, gA.cH);
    };
  }

  return {
    init: init
  };

})();
