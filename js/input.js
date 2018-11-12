gA.input = (function() {
  "use strict";

  var key;

  gA.key = {
    left: false,
    right: false,
    up: false,
    down: false
  };
  gA.noHold = {
    up: false
  };

  //Player Movement Keys Pressed
  window.onkeydown = function(e) {
    key = e.keyCode;

    if (key === 37 || key === 65) {
      gA.key.left = true;
    } else if (key === 38 || key === 32 || key === 87) {
      gA.key.up = true;
    } else if (key === 39 || key === 68) {
      gA.key.right = true;
    }

    if (gA.player.state.alive === false) {
      switch (key) { //Make sure not hitting any default movement keys to reset
        case 32:
        case 37:
        case 38:
        case 39:
        case 65:
        case 68:
        case 87:
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
    } else if (key === 38 || key === 32 || key === 87) {
      gA.key.up = false;
      gA.noHold.up = false;
    } else if (key === 39 || key === 68) {
      gA.key.right = false;
    }
  };

})();
