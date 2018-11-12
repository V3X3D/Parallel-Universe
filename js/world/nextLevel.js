(function() {

  gA.currLevel = gA.levels[gA.lvlNum];
  gA.currLevel.background();

  gA.nextLevelAni = function() {
    gA.transition = true;
  };
  gA.nextLevel = function(count) {
    gA.transition = false;
    //Load new level
    gA.lvlNum += count || 1;
    gA.currLevel = gA.levels[gA.lvlNum];

    // //Load new level background
    gA.load = [];
    gA.currLevel.background();

    // //Reset player for new level
    gA.reset.level.update();

    // //Clear previous map
    gA.map.aniClear();
    gA.ctx.m.clearRect(0, 0, gA.cW, gA.cH);
    gA.map.init.render();
  };

})();

