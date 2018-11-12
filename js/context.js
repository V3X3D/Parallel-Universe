gA.ctx = (function() {
  "use strict";

  var gameCanvas = document.getElementById('game-canvas'),
    gCtx = gameCanvas.getContext('2d', { alpha: false });

  gameCanvas.width = gA.cW*gA.scale;
  gameCanvas.height = gA.cH*gA.scale;

  gCtx.webkitImageSmoothingEnabled = false;
  gCtx.imageSmoothingEnabled = false;

  gCtx.scale(gA.scale,gA.scale);

  return {
    gCanv: gameCanvas,
    b: gCtx,
    m: gCtx,
    g: gCtx
  };
})();
