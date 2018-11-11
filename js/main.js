(function() {
  "use strict";

  window.gA = {};
  gA.cW = 640; //Canvas Width
  gA.cH = 448; //Canvas Height
  gA.tS = 32; //Canvas Height
  gA.cTX; //Stores players current 'x' tile (useful for map collision detection)
  gA.cTY; //Stores players current 'y' tile (useful for map collision detection)

  window.onload = function() {

    var Canvas = new gA.canvas.init();
    var Map = new gA.map.init();
    var CollisionView = new gA.collision.view();
    var CollisionMap = new gA.collision.map();
    var FPS = new gA.fps.init();
    function gameLoop() {

      //Game State Updating
      gA.player.state.update();
      CollisionMap.update();
      // FPS.update();

      //Game Drawing
      Canvas.render();
      Map.render();
      CollisionView.render();
      gA.player.state.render();
      // FPS.render();

      window.requestAnimationFrame(gameLoop);
      // setTimeout(gameLoop, 100);
    }
    gameLoop();

  };

}());

