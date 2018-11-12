gA.reset = (function() {
  "use strict";

  var resetLevel = function(lvl) {
    if(gA.hud.state.time <= 0) {
      if(gA.lvl.num !== 1) {gA.transition = true;}
      else {varResets(); gA.hud.state.time = gA.lvl.list[gA.lvl.num].time;}
    } else if(!gA.transition) {varResets();}
  };

  function varResets() {
    gA.player.state.x = gA.lvl.cur.player.x;
    gA.player.state.y = gA.lvl.cur.player.y;
    gA.player.state.alive = true;
    gA.player.state.focused = false;
    gA.player.state.focusAni = undefined;
    gA.player.state.jump = false;
    gA.player.state.wind = false;
    gA.player.state.grav = 1;

    if(!gA.lvl.cur.player.color) {
      gA.player.state.R = gA.fgClr.R;
      gA.player.state.G = gA.fgClr.G;
      gA.player.state.B = gA.fgClr.B;
    } else {
      gA.player.state.R = gA.lvl.cur.player.color[0];
      gA.player.state.G = gA.lvl.cur.player.color[1];
      gA.player.state.B = gA.lvl.cur.player.color[2];
    }

    gA.player.state.spawnAni = new gA.animations.respawn();
    gA.player.state.spawn = true;

    gA.blood.arrayClear();
    gA.sound.flatline.pause();
    gA.sound.respawn.play();
  }

  return { player: resetLevel };
})();
