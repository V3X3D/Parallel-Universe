gA.reset = (function() {
  "use strict";

  var resetLevel = function() {

    this.update = function() {
      gA.player.state.alive = true;
      gA.player.state.jump = false;
      gA.player.state.wind = false;
      gA.player.state.grav = 1;
      gA.player.state.x = gA.currLevel.player.x;
      gA.player.state.y = gA.currLevel.player.y;
      gA.player.state.R = gA.currLevel.player.color[0];
      gA.player.state.G = gA.currLevel.player.color[1];
      gA.player.state.B = gA.currLevel.player.color[2];
      gA.player.state.A = gA.currLevel.player.color[3];
      gA.player.state.A = 1;

      gA.blood.arrayClear();
    };
  };

  return {
    level: new resetLevel()
  };

})();
