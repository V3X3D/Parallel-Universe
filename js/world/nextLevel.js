gA.nextLevel = (function() {
  "use strict";

  //Game init stuff
  gA.lvl.num = 1; //Current level num
  gA.lvl.cur = gA.lvl.list[gA.lvl.num];
  gA.lvl.cur.background();
  gA.bgClr = gA.lvl.cur.bgClr; //Background color
  gA.fgClr = gA.lvl.cur.fgClr(); //Foreground color

  var goNextLevel = function(count) {
    if(gA.lvl.num !== 0) {
      if(gA.lvl.cur.curDeaths < gA.lvl.cur.minDeaths || isNaN(gA.lvl.cur.minDeaths))
        gA.lvl.cur.minDeaths = gA.lvl.cur.curDeaths;
      if(gA.lvl.cur.curDeaths > gA.lvl.cur.maxDeaths || isNaN(gA.lvl.cur.maxDeaths))
        gA.lvl.cur.maxDeaths = gA.lvl.cur.curDeaths;

      gA.lvl.cur.curDeaths = 0;
    }

    //Load new level
    gA.lvl.num += count || 1;
    gA.lvl.cur = gA.lvl.list[gA.lvl.num];

    //Unlock colors after lvl 20
    if(gA.lvl.num === 16) gA.contentLock15 = false;

    //Load new level background
    gA.load = [];
    gA.lvl.cur.background();

    //Set new bg/fg color
    if(gA.customClr) {
      if(gA.lvl.cur.invert) {
        gA.bgClr = gA.clr2;
        gA.fgClr = gA.clr;
      } else {
        gA.bgClr = gA.clr;
        gA.fgClr = gA.clr2;
      }
    } else {
      if(gA.lvl.cur.invert) {
        gA.bgClr = gA.lvl.cur.fgClr();
        gA.fgClr = gA.lvl.cur.bgClr;
      } else {
        gA.bgClr = gA.lvl.cur.bgClr;
        gA.fgClr = gA.lvl.cur.fgClr();
      }
    }

    //Update new lvl.cur size for camera logic
    gA.cam.state.lvlW = gA.lvl.cur.map[0].length*gA.tS;
    gA.cam.state.lvlH = gA.lvl.cur.map.length*gA.tS;

    //Clear previous map
    gA.map.aniClear();
    gA.ctx.m.clearRect(0, 0, gA.cW, gA.cH);

    //Reset player for new level
    if(gA.hard) gA.hud.state.time = Math.floor(gA.lvl.list[gA.lvl.num].time/2);
    else gA.hud.state.time = gA.lvl.list[gA.lvl.num].time; //set time
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

    //Saving data
    gA.saveSettings();
    gA.saveLevels();
  };

  return { go: goNextLevel };
})();

