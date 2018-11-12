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

    //Reset player for new level
    gA.reset.level.update(true);

    //Clear previous map
    gA.map.aniClear();
    gA.ctx.m.clearRect(0, 0, gA.cW, gA.cH);

    //Transition
    gA.state.transition = true;
    gA.transitions.fadeToggle();

    //Load new map
    gA.map.init.render();
  };

  return {
    go: goNextLevel
  };

})();

