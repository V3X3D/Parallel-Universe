(function() {
  "use strict";

  window.gA = {};
  gA.scale = 1;
  gA.tS = 32; //Canvas Height
  gA.cW = 20*gA.tS; //Canvas Width
  gA.cH = 14*gA.tS; //Canvas Height
  gA.load = []; //Bg sequences loaded
  gA.lvl = {}; //level obj
  gA.lvl.num; //Current level num
  gA.lvl.cur; //Current level
  gA.bgClr; //Background color
  gA.fgClr; //Foreground color
  gA.totalDeaths = 0;
  gA.masterVolume = 0.55;

  //Options
  gA.newWarn = false;
  gA.customClr = false;
  gA.clr = {R: 255, G: 255, B: 255};
  gA.clr2 = {R: 0, G: 0, B: 0};
  gA.hard = false;
  gA.contentLock15 = true;
  gA.contentLock30 = true;

  gA.mX = 0;
  gA.mY = 0;

  //Game States
  gA.state = {
    titleScreen: true,
    pauseMenu: false,
    gameRunning: false
  };
  gA.end = false;
  gA.transition = false;
  gA.started = false;

  window.onload = function() {
    // window.localStorage.clear();
    function starter() {
      gA.started = true;
      gA.ctx.gCanv.removeEventListener('click', starter, false);
      document.removeEventListener('mousemove', mover, false);
    }
    function mover(e) {
      var rect = gA.ctx.gCanv.getBoundingClientRect();
      gA.mX = e.clientX - rect.left - gA.cW/2;
      gA.mY = e.clientY - rect.top - gA.cH/2;
      console.log('dfaklsdjfalkj');
    }
    if(!gA.started) {
      gA.ctx.gCanv.addEventListener('click', starter, false);
      document.addEventListener('mousemove', mover, false);
    }

    gA.loadSettings();
    gA.loadLevels();

    var Canvas = new gA.canvas.init(),
      Blood = new gA.blood.init(),
      FPS = new gA.fps.init(),
      LevelText = new gA.lvl.text.init();

    gA.map.init.render(true);
    function gameLoop() {

      if(!gA.started) {
        gA.ctx.g.font = ''+gA.cW/10+'px verdana';
        gA.ctx.g.fillStyle = '#000';
        gA.ctx.g.fillRect(0,gA.mY/15,gA.cW,gA.cH);
        gA.ctx.g.fillStyle = '#fff';
        gA.ctx.g.fillRect(0,gA.cH/2+gA.mY/15,gA.cW,gA.cH);
        gA.ctx.g.fillText('Click To', gA.cW/2-gA.ctx.g.measureText('Click To').width/2+gA.mX/10, gA.cH/2.5+gA.mY/15);
        gA.ctx.g.fillStyle = '#000';
        gA.ctx.g.fillText('Begin', gA.cW/2-gA.ctx.g.measureText('Begin').width/2+gA.mX/10, gA.cH/1.5+gA.mY/15);
      } else {
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
        } else if(gA.state.pauseMenu) {
          gA.pause.run.menu.update();
          gA.pause.run.menu.render();
        } else if(gA.state.titleScreen) {
          gA.title.run.menu.update();
          gA.title.run.menu.render();
          gA.transitions.reset();
        }
        gA.change.state.update();
        gA.change.state.render();
      }

      // FPS.update();
      // FPS.render();

      window.requestAnimationFrame(gameLoop);
      // setTimeout(gameLoop, 30);
    }
    gameLoop();
  };

}());

