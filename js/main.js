(function() {
  "use strict";

  window.gA = {};
  gA.tS = 32; //Canvas Height
  gA.cW = 20*gA.tS; //Canvas Width
  gA.cH = 14*gA.tS; //Canvas Height
  gA.load = []; //Bg sequences loaded
  gA.levelsList; //List of levels
  gA.lvlNum; //Current level number
  gA.level; //Current level
  gA.bgClr; //Background color
  gA.fgClr; //Foreground color

  gA.state = {
    titleScreen: false,
    transition: true
  };

  window.onload = function() {

    var Canvas = new gA.canvas.init();
    var Blood = new gA.blood.init();
    var FPS = new gA.fps.init();
    var Transition = new gA.transitions.fade();

    gA.map.init.render();
    function gameLoop() {

      //Game State Updating
      gA.bg.init.update();
      gA.player.state.update();
      gA.map.animated.update();
      Blood.update();
      // console.time('Function #1');
      if(gA.state.transition === true) Transition.update();
      // FPS.update();

      //Game Drawing
      Canvas.render();
      gA.bg.init.render();
      gA.player.state.render();
      gA.map.animated.render();
      Blood.render();
      if(gA.state.transition === true) Transition.render();
      // FPS.render();

      window.requestAnimationFrame(gameLoop);
      // setTimeout(gameLoop, 50);
    }
    gameLoop();
  };

}());

