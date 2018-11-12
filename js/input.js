gA.input = (function() {
  "use strict";

  var key, lastKey;
  gA.key = {
    left: false,
    right: false,
    up: false,
    down: false,
    esc: false,
    select: false, //Title option
    reset: false //Title option
  };
  gA.noHold = {
    up: false,
    down: false,
    left: false,
    right: false,
    esc: false
  };

  //Player Movement Keys Pressed
  window.onkeydown = function(e) {
    key = e.keyCode;

    if (key === 37 || key === 65) {
      gA.key.left = true;
    } else if(key === 38 || key === 87) {
      gA.key.up = true;
    } else if(key === 39 || key === 68) {
      gA.key.right = true;
    } else if(key === 83 || key === 40) {
      gA.key.down = true;
    } else if(key === 32 || key === 13) {
      if(gA.state.pauseMenu || gA.state.titleScreen) gA.key.select = true;
      else if(key !== 13) gA.key.up = true;
    } else if(key === 82) {
      gA.key.reset = true;
    }

    if(key === 27 && !gA.end) gA.key.esc = true;

    if(!gA.player.state.alive && gA.state.gameRunning && !gA.noHold.down && ( gA.key.down || key === 82 )) {
      gA.noHold.down = true;
      if(!gA.end) {
        gA.reset.player();
      } else {
        gA.change.arrPush(new gA.change.fade('out', function(){
          gA.newWarn = false;
          gA.lvl.text.reset();
          gA.state.gameRunning = false;
          gA.state.titleScreen = true;
          gA.title.run.menu.called = true;
          gA.cam.state.edgeLock = true;
          gA.player.state.end = false;
          gA.end = false;
          gA.bg.maxAlpha();
        }, 0.035));
      }
    }
    // lastKey = key;
  };

  //Player Movement Keys Released
  window.onkeyup = function(e) {
    lastKey = undefined;
    key = e.keyCode;

    if (key === 37 || key === 65) {
      gA.key.left = false;
      gA.noHold.left = false;
    } else if(key === 38 || key === 87 || key === 32) {
      gA.key.up = false;
      gA.noHold.up = false;
    } else if(key === 39 || key === 68) {
      gA.key.right = false;
      gA.noHold.right = false;
    } else if(key === 83 || key === 40) {
      gA.key.down = false;
      gA.noHold.down = false;
    } else if(key === 82) {
      gA.key.reset = false;
      gA.noHold.down = false;
    }

    if(key === 27) {gA.key.esc = false; gA.noHold.esc = false;}
  };

})();
