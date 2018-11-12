gA.ctx = (function() {
  "use strict";

  // var backgroundCanvas = document.getElementById('background-canvas'),
  //   bCtx = backgroundCanvas.getContext('2d', { alpha: false }),
  //   mapCanvas = document.getElementById('map-canvas'),
  //   mCtx = mapCanvas.getContext('2d', { alpha: false }),
  var gameCanvas = document.getElementById('game-canvas'),
    gCtx = gameCanvas.getContext('2d', { alpha: false });

  // backgroundCanvas.width = gA.cW*gA.scale;
  // backgroundCanvas.height = gA.cH*gA.scale;
  // mapCanvas.width = gA.cW*gA.scale;
  // mapCanvas.height = gA.cH*gA.scale;
  gameCanvas.width = gA.cW*gA.scale;
  gameCanvas.height = gA.cH*gA.scale;

  // bCtx.webkitImageSmoothingEnabled = false;
  // bCtx.imageSmoothingEnabled = false;
  // mCtx.webkitImageSmoothingEnabled = false;
  // mCtx.imageSmoothingEnabled = false;
  gCtx.webkitImageSmoothingEnabled = false;
  gCtx.imageSmoothingEnabled = false;

  return {
    // bCanv: backgroundCanvas,
    // mCanv: mapCanvas,
    gCanv: gameCanvas,
    b: gCtx,
    m: gCtx,
    g: gCtx
  };
})();
