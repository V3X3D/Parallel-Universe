(function() {
  "use strict";

  var i;

  window.gA = {};
  gA.scale = 1;
  gA.tS = 32/gA.scale; //Canvas Height
  gA.cW = 20*gA.tS; //Canvas Width
  gA.cH = 14*gA.tS; //Canvas Height

  window.onload = function() {

    var Canvas = new gA.canvas.init();
    var Background = new gA.background.init();
    var Map = new gA.map.init();
    var Blood = new gA.blood.init();
    var FPS = new gA.fps.init();

    Map.render();
    function gameLoop() {

      //Game State Updating
      // Background.update();
      gA.player.state.update();
      Blood.update();
      FPS.update();

      //Game Drawing
      Canvas.render();
      // Background.render();
      gA.player.state.render();
      Blood.render();
      FPS.render();

      window.requestAnimationFrame(gameLoop);
    }
    gameLoop();
  };

}());

