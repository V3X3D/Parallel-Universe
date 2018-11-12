gA.reset = (function() {
  "use strict";

  var resetLevel = function() {

    this.update = function() {
      gA.player.state.alive = true;
      gA.player.state.x = 224/gA.scale;
      gA.player.state.y = 0;
      gA.player.state.A = 1;
      gA.blood.arrayClear();
    };
  };

  return {
    level: new resetLevel()
  };

})();
