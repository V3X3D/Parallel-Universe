gA.ctx = (function() {
  "use strict";

  var backgroundCanvas = document.getElementById('background-canvas'),
    bCtx = backgroundCanvas.getContext('2d', { alpha: false });
  var mapCanvas = document.getElementById('map-canvas'),
    mCtx = mapCanvas.getContext('2d', { alpha: false });
  var gameCanvas = document.getElementById('game-canvas'),
    gCtx = gameCanvas.getContext('2d', { alpha: false });
  // var menuCanvas = document.getElementById('menu-canvas'),
  //   nCtx = menuCanvas.getContext('2d', { alpha: false });
  // var viewCanvas = document.getElementById('view-canvas'),
  //   vCtx = viewCanvas.getContext('2d', { alpha: false });

  var s = 1;

  backgroundCanvas.width = gA.cW*s;
  backgroundCanvas.height = gA.cH*s;
  mapCanvas.width = gA.cW*s;
  mapCanvas.height = gA.cH*s;
  gameCanvas.width = gA.cW*s;
  gameCanvas.height = gA.cH*s;
  // menuCanvas.width = gA.cW*s;
  // menuCanvas.height = gA.cH*s;

  // viewCanvas.width = gA.cW*2;
  // viewCanvas.height = gA.cH*2;

  // bCtx.mozImageSmoothingEnabled = false;
	bCtx.webkitImageSmoothingEnabled = false;
	bCtx.imageSmoothingEnabled = false;
  // mCtx.mozImageSmoothingEnabled = false;
	mCtx.webkitImageSmoothingEnabled = false;
	mCtx.imageSmoothingEnabled = false;
  // gCtx.mozImageSmoothingEnabled = false;
	gCtx.webkitImageSmoothingEnabled = false;
	gCtx.imageSmoothingEnabled = false;

	// vCtx.webkitImageSmoothingEnabled = false;
	// vCtx.imageSmoothingEnabled = false;

  bCtx.scale(s, s);
  mCtx.scale(s, s);
  gCtx.scale(s, s);
  // vCtx.scale(2, 2);

  return {
    bCanv: backgroundCanvas,
    mCanv: mapCanvas,
    gCanv: gameCanvas,
    // nCanv: menuCanvas,
    // vCanv: viewCanvas,
    // v: vCtx,
    // n: nCtx,
    b: bCtx,
    m: mCtx,
    g: gCtx
  };

})();
