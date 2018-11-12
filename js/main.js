(function() {
  "use strict";

  window.gA = {};
  gA.scale = 1;
  gA.tS = 32/gA.scale; //Canvas Height
  gA.cW = 20*gA.tS; //Canvas Width
  gA.cH = 14*gA.tS; //Canvas Height
  gA.load = [];
  gA.levels = {};
  gA.lvlNum = 1;
  gA.currLevel = gA.levels[1];
  gA.nextLevel;

  window.onload = function() {

    var Canvas = new gA.canvas.init();
    var Blood = new gA.blood.init();
    var FPS = new gA.fps.init();

    gA.map.init.render();
    function gameLoop() {

      //Game State Updating
      gA.bg.init.update();
      gA.player.state.update();
      gA.map.animated.update();
      Blood.update();
      FPS.update();

      //Game Drawing
      Canvas.render();
      gA.bg.init.render();
      gA.player.state.render();
      gA.map.animated.render();
      Blood.render();
      FPS.render();

      window.requestAnimationFrame(gameLoop);
      // setTimeout(gameLoop, 150);
    }
    gameLoop();
  };

}());

