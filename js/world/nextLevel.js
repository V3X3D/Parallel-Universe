gA.nextLevel = (function() {
  "use strict";

  //Game init stuff
  gA.lvl.num = 1;
  gA.lvl.cur = gA.lvl.list[gA.lvl.num];
  gA.lvl.cur.background();
  gA.bgClr = gA.lvl.cur.bgClr; //Background color
  gA.fgClr = gA.lvl.cur.fgClr(); //Foreground color

  var goNextLevel = function(count) {
    if(gA.lvl.num !== 0) {
      gA.lvl.cur.totalDeaths += gA.lvl.cur.curDeaths;
      if(gA.lvl.cur.curDeaths < gA.lvl.cur.minDeaths || isNaN(gA.lvl.cur.minDeaths))
        gA.lvl.cur.minDeaths = gA.lvl.cur.curDeaths;
      if(gA.lvl.cur.curDeaths > gA.lvl.cur.maxDeaths || isNaN(gA.lvl.cur.maxDeaths))
        gA.lvl.cur.maxDeaths = gA.lvl.cur.curDeaths;

      gA.lvl.cur.curDeaths = 0;
    }

    //Load new level
    gA.lvl.num += count || 1;
    gA.lvl.cur = gA.lvl.list[gA.lvl.num];

    //Load new level background
    gA.load = [];
    gA.lvl.cur.background();
    //Set new bg/fg color
    gA.bgClr = gA.lvl.cur.bgClr;
    gA.fgClr = gA.lvl.cur.fgClr();
    //Update new lvl.cur size for camera logic
    gA.cam.state.lvlW = gA.lvl.cur.map[0].length*gA.tS;
    gA.cam.state.lvlH = gA.lvl.cur.map.length*gA.tS;
    //Clear previous map
    gA.map.aniClear();
    gA.ctx.m.clearRect(0, 0, gA.cW, gA.cH);

    //Reset player for new level
    gA.hud.state.time = gA.lvl.list[gA.lvl.num].time; //Reset time
    //Make sure time is reset before level
    gA.reset.player();
    gA.cam.state.set();

    //Transition
    gA.transition = true;
    //Load new map entities
    gA.map.init.render(true);

    //Start timer
    gA.hud.state.freeze = false;
    gA.timer.reset();
  };

  return { go: goNextLevel };
})();

