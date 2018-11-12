function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return false;
  }
}
if(storageAvailable('localStorage')) {
  gA.saveSettings = function() {
    localStorage.setItem('difficulty', JSON.stringify(gA.hard));
    localStorage.setItem('clr', JSON.stringify(gA.clr));
    localStorage.setItem('clr2', JSON.stringify(gA.clr2));
    localStorage.setItem('customClr', JSON.stringify(gA.customClr));
    localStorage.setItem('lock15', JSON.stringify(gA.contentLock15));
    localStorage.setItem('lock30', JSON.stringify(gA.contentLock30));
    localStorage.setItem('newWarning', JSON.stringify(gA.newWarn));
    localStorage.setItem('volume', JSON.stringify(gA.masterVolume));
  };
  gA.loadSettings = function() {
    if(localStorage.getItem('lock15') !== null)
      gA.contentLock15 = JSON.parse(localStorage.getItem('lock15'));
    if(localStorage.getItem('lock30') !== null)
      gA.contentLock30 = JSON.parse(localStorage.getItem('lock30'));
    if(localStorage.getItem('newWarning') !== null)
      gA.newWarn = JSON.parse(localStorage.getItem('newWarning'));
    if(localStorage.getItem('clr') !== null)
      gA.clr = JSON.parse(localStorage.getItem('clr'));
    if(localStorage.getItem('clr2') !== null)
      gA.clr2 = JSON.parse(localStorage.getItem('clr2'));
    if(localStorage.getItem('customClr') !== null)
      gA.customClr = JSON.parse(localStorage.getItem('customClr'));
    if(localStorage.getItem('difficulty') !== null)
      gA.hard = JSON.parse(localStorage.getItem('difficulty'));
    if(localStorage.getItem('volume') !== null)
      gA.masterVolume = JSON.parse(localStorage.getItem('volume'));
  };

  gA.saveLevels = function() {
    localStorage.setItem('curLevel', JSON.stringify(gA.lvl.num));
    localStorage.setItem('globalTotalDeaths', JSON.stringify(gA.totalDeaths));
    for(var i=1; i<=Object.keys(gA.lvl.list).length; i+=1) {
      localStorage.setItem('minDeaths'+i+'', JSON.stringify(gA.lvl.list[i].minDeaths));
      localStorage.setItem('maxDeaths'+i+'', JSON.stringify(gA.lvl.list[i].maxDeaths));
      localStorage.setItem('totalDeaths'+i+'', JSON.stringify(gA.lvl.list[i].totalDeaths));
      localStorage.setItem('minTime'+i+'', JSON.stringify(gA.lvl.list[i].minTime));
      localStorage.setItem('maxTime'+i+'', JSON.stringify(gA.lvl.list[i].maxTime));
      localStorage.setItem('totalTime'+i+'', JSON.stringify(gA.lvl.list[i].totalTime));
    }
  };
  gA.loadLevels = function() {
    if(localStorage.getItem('curLevel') !== null)
      gA.lvl.num = JSON.parse(localStorage.getItem('curLevel'));
    if(localStorage.getItem('globalTotalDeaths') !== null)
      gA.totalDeaths = JSON.parse(localStorage.getItem('globalTotalDeaths'));
    for(var i=1; i<=Object.keys(gA.lvl.list).length; i+=1) {
      if(localStorage.getItem('minDeaths'+i+'') !== null)
        gA.lvl.list[i].minDeaths = JSON.parse(localStorage.getItem('minDeaths'+i+''));
      if(localStorage.getItem('maxDeaths'+i+'') !== null)
        gA.lvl.list[i].maxDeaths = JSON.parse(localStorage.getItem('maxDeaths'+i+''));
      if(localStorage.getItem('totalDeaths'+i+'') !== null)
        gA.lvl.list[i].totalDeaths = JSON.parse(localStorage.getItem('totalDeaths'+i+''));
      if(localStorage.getItem('minTime'+i+'') !== null)
        gA.lvl.list[i].minTime = JSON.parse(localStorage.getItem('minTime'+i+''));
      if(localStorage.getItem('maxTime'+i+'') !== null)
        gA.lvl.list[i].maxTime = JSON.parse(localStorage.getItem('maxTime'+i+''));
      if(localStorage.getItem('totalTime'+i+'') !== null)
        gA.lvl.list[i].totalTime = JSON.parse(localStorage.getItem('totalTime'+i+''));
    }
  };
} else {
  gA.saveSettings = function(){};
  gA.loadSettings = function(){};
  gA.saveLevels = function(){};
  gA.loadLevels = function(){};
}
