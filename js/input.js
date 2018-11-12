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

    // console.log(key);
    if(key === 27) gA.key.esc = true;

    if (!gA.player.state.alive) {
      switch (key) { //Make sure not hitting any default movement keys to reset
        case 32:
        case 37:
        case 38:
        case 39:
        case 65:
        case 68:
        case 87:
        case 27:
        case 116:
          break;

        default:
          gA.reset.level.update();
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
    }

    if(key === 27) {gA.key.esc = false; gA.noHold.esc = false;}
  };

})();
