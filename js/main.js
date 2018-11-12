(function() {
  "use strict";

  window.gA = {};
  gA.scale = 1;
  gA.tS = 32; //Canvas Height
  gA.cW = 20*gA.tS; //Canvas Width
  gA.cH = 14*gA.tS; //Canvas Height
  gA.load = []; //Bg sequences loaded
  gA.lvl = {};
  gA.lvl.cur; //Current level
  gA.lvl.num; //Current level num
  gA.bgClr; //Background color
  gA.fgClr; //Foreground color

  gA.state = {
    titleScreen: true,
    pauseMenu: false,
    gameRunning: false
  };
  gA.end = false;
  gA.transition = false;

  window.onload = function() {

    var Canvas = new gA.canvas.init(),
      Blood = new gA.blood.init(),
      FPS = new gA.fps.init(),
      LevelText = new gA.lvl.text.init();

    gA.map.init.render(true);
    function gameLoop() {

      Canvas.render();
      if(gA.state.gameRunning) {
        /*Game Updating*/
        gA.bg.init.update();
        gA.cam.state.update();
        gA.player.state.update();
        gA.map.animated.update();
        Blood.update();
        gA.hud.state.update();
        if(gA.transition) gA.transitions.fade.update();
        if(gA.end) gA.transitions.end.update();
        if(gA.key.esc && !gA.pause.run.menu.done && !gA.noHold.esc) {
          gA.state.pauseMenu = true;
          gA.state.gameRunning = false;
          gA.timer.pause();
          gA.noHold.esc = true;
        }

        /*GAME DRAWING*/
        gA.bg.init.render();

        gA.ctx.g.save();
        gA.ctx.g.translate(-gA.cam.state.x, -gA.cam.state.y);
          gA.map.init.render();
          gA.player.state.render();
          Blood.render();
          gA.map.animated.render();
        gA.ctx.g.restore();

        gA.hud.state.render();
        LevelText.render();
        if(gA.transition) gA.transitions.fade.render();
        if(gA.end) gA.transitions.end.render();
      } else if(gA.state.pauseMenu || gA.state.titleScreen) {
        if(gA.state.pauseMenu) {
          gA.pause.run.menu.update();
          gA.pause.run.menu.render();
        } else if(gA.state.titleScreen) {
          gA.title.run.menu.update();
          gA.title.run.menu.render();
          gA.transitions.reset();
        }
        // gA.change.state.update();
        // gA.change.state.render();
      }
      gA.change.state.update();
      gA.change.state.render();

      // FPS.update();
      // FPS.render();

      // gA.ctx.v.drawImage(gA.ctx.gCanv, 0, 0, gA.cW*gA.scale, gA.cH*gA.scale);

      window.requestAnimationFrame(gameLoop);
      // setTimeout(gameLoop, 30);
    }
    gameLoop();
  };

}());

