gA.ctx = (function() {
  "use strict";

  var backgroundCanvas = document.getElementById('background-canvas'),
    bCtx = backgroundCanvas.getContext('2d', { alpha: false });
  var mapCanvas = document.getElementById('map-canvas'),
    mCtx = mapCanvas.getContext('2d', { alpha: false });
  var gameCanvas = document.getElementById('game-canvas'),
    gCtx = gameCanvas.getContext('2d', { alpha: false });

  backgroundCanvas.width = gA.cW;
  backgroundCanvas.height = gA.cH;

  mapCanvas.width = gA.cW;
  mapCanvas.height = gA.cH;

  gameCanvas.width = gA.cW;
  gameCanvas.height = gA.cH;

  return {
    bCanv: backgroundCanvas,
    mCanv: mapCanvas,
    gCanv: gameCanvas,
    b: bCtx,
    m: mCtx,
    g: gCtx
  };

})();
