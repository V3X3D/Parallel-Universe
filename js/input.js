gA.input = (function() {
  "use strict";

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
    switch(e.keyCode) {
      case 65:
        gA.key.left = true;
        break;
      case 68:
        gA.key.right = true;
        break;
      case 83:
        gA.key.down = true;
        break;
      case 87:
        gA.key.up = true;
        break;
      default:
        break;
    }
  };

  //Player Movement Keys Released
  window.onkeyup = function(e) {
    switch(e.keyCode) {
      case 65:
        gA.key.left = false;
        break;
      case 68:
        gA.key.right = false;
        break;
      case 83:
        gA.key.down = false;
        break;
      case 87:
        gA.key.up = false;
        gA.noHold.up = false;
        break;
      default:
        break;
    }
  };

})();
