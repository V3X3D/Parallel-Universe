gA.input = (function() {
  "use strict";

  var key;

  gA.key = {
    left: false,
    right: false,
    up: false,
    down: false,
    esc: false,
    select: false
  };
  gA.noHold = {
    up: false,
    down: false,
    esc: false
  };

  //Player Movement Keys Pressed
  window.onkeydown = function(e) {
    key = e.keyCode;

    if (key === 37 || key === 65) {
      gA.key.left = true;
    } else if (key === 38 || key === 87) {
      gA.key.up = true;
    } else if (key === 39 || key === 68) {
      gA.key.right = true;
    } else if (key === 83 || key === 40) {
      gA.key.down = true;
    } else if (key === 32 || key === 13) {
      if(gA.state.pauseMenu || gA.state.titleScreen) gA.key.select = true;
      else if(key !== 13) gA.key.up = true;
    }

    if(key === 27 && !gA.end) gA.key.esc = true;

    if (!gA.player.state.alive && gA.state.gameRunning) {
      switch (key) {
        case 32:
        case 37:
        case 38:
        case 39:
        case 65:
        case 68:
        case 87:
        case 27:
        case 116:
        case 83:
        case 40:
          break;

        default:
          if(!gA.end) {
            gA.reset.player();
          } else {
            gA.change.arrPush(new gA.change.fade('out', function(){
              gA.state.gameRunning = false;
              gA.state.titleScreen = true;
              gA.title.run.menu.called = true;
              gA.cam.state.edgeLock = true;
              gA.player.state.end = false;
              gA.end = false;
              gA.bg.maxAlpha();
            }, 0.035));
          }
          break;
      }
    }
  };

  //Player Movement Keys Released
  window.onkeyup = function(e) {
    key = e.keyCode;

    if (key === 37 || key === 65) {
      gA.key.left = false;
    } else if (key === 38 || key === 87 || key === 32) {
      gA.key.up = false;
      gA.noHold.up = false;
    } else if (key === 39 || key === 68) {
      gA.key.right = false;
    } else if (key === 83 || key === 40) {
      gA.key.down = false;
      gA.noHold.down = false;
    }

    if(key === 27) {gA.key.esc = false; gA.noHold.esc = false;}
  };

})();
