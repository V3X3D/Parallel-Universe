gA.nextLevel = (function() {
  "use strict";

  gA.lvlNum = 1;
  gA.level = gA.levelsList[gA.lvlNum];
  gA.level.background();
  gA.bgClr = gA.level.bgClr; //Background color
  gA.fgClr = gA.level.fgClr(); //Foreground color

  var goNextLevel = function(count) {
    //Load new level
    gA.lvlNum += count || 1;
    gA.level = gA.levelsList[gA.lvlNum];

    //Load new level background
    gA.load = [];
    gA.level.background();

    //Set new bg/fg color
    gA.bgClr = gA.level.bgClr;
    gA.fgClr = gA.level.fgClr();

    //Update new level size for camera logic
    gA.cam.state.lvlW = gA.level.map[0].length*gA.tS;
    gA.cam.state.lvlH = gA.level.map.length*gA.tS;

    //Clear previous map
    gA.map.aniClear();
    gA.ctx.m.clearRect(0, 0, gA.cW, gA.cH);

    //Reset player for new level
    gA.reset.level.update(true);
    gA.cam.state.set();

    if(!gA.level.player.color) {
      gA.player.state.R = gA.fgClr.R;
      gA.player.state.G = gA.fgClr.G;
      gA.player.state.B = gA.fgClr.B;
    } else {
      gA.player.state.R = gA.level.player.color[0];
      gA.player.state.G = gA.level.player.color[1];
      gA.player.state.B = gA.level.player.color[2];
    }

    //Transition
    gA.state.transition = true;

    //Load new map
    gA.map.init.render(true);
  };

  return {
    go: goNextLevel
  };

})();

