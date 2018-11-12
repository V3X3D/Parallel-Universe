//Should probably remove the direct seeting of values from this?
gA.timer = {
  secs: 0,
  tempSecs: 0,
  pSecs: 0,
  pSecsTotal: 0,
  start: function() {
    this.secs = 0;
    this.secs = this.newDate();
    this.started = true;
  },
  reset: function() {
    if(this.started) {
      this.secs = (this.newDate() - this.secs)/1000;
      this.secs = Math.abs(this.secs - this.pSecsTotal);
      if(gA.lvl.num-1 > 0) {
        gA.lvl.list[gA.lvl.num-1].totalTime += Math.round(this.secs*100)/100;
        gA.lvl.list[gA.lvl.num-1].totalTime = Math.round(gA.lvl.list[gA.lvl.num-1].totalTime*100)/100;
        if(this.secs < gA.lvl.list[gA.lvl.num-1].minTime || gA.lvl.list[gA.lvl.num-1].minTime === '?')
          gA.lvl.list[gA.lvl.num-1].minTime = Math.round(this.secs*100)/100;
        if(gA.lvl.list[gA.lvl.num-1].maxTime === '?' || this.secs > gA.lvl.list[gA.lvl.num-1].maxTime)
          gA.lvl.list[gA.lvl.num-1].maxTime = Math.round(this.secs*100)/100;
      }
    }
    this.started = false;
    this.pSecsTotal = 0;
    this.start();
  },
  pause: function() {
    this.pSecs = this.newDate();
    this.tempSecs = (this.pSecs - this.secs)/1000;
    this.tempSecs = Math.abs(this.tempSecs - this.pSecsTotal);
    gA.lvl.list[gA.lvl.num].curTime = Math.round(this.tempSecs*100)/100;
  },
  resume: function() {
    this.pSecs = (this.newDate() - this.pSecs)/1000;
    this.pSecsTotal += this.pSecs;
    this.pSecs = 0;
  },
  stop: function() {
    this.started = false;
    this.secs = 0;
    this.pSecs = 0;
    this.pSecsTotal = 0;
  },
  newDate: function() {
    return (new Date()).getTime();
  }
};
