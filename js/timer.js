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
  reset: function(lastLvl) {
    if(this.started) {
      this.secs = (this.newDate() - this.secs)/1000;
      this.secs = Math.abs(this.secs - this.pSecsTotal);
      if(lastLvl) {
        gA.lvl.list[gA.lvl.num].totalTime += Math.round(this.secs*100)/100;
        gA.lvl.list[gA.lvl.num].totalTime = Math.round(gA.lvl.list[gA.lvl.num].totalTime*100)/100;
        if(this.secs < gA.lvl.list[gA.lvl.num].minTime || gA.lvl.list[gA.lvl.num].minTime === '?')
          gA.lvl.list[gA.lvl.num].minTime = Math.round(this.secs*100)/100;
        if(gA.lvl.list[gA.lvl.num].maxTime === '?' || this.secs > gA.lvl.list[gA.lvl.num].maxTime)
          gA.lvl.list[gA.lvl.num].maxTime = Math.round(this.secs*100)/100;
      } else if(gA.lvl.num-1 > 0) {
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
  newDate: function() { return (new Date()).getTime(); }
};

gA.hud = (function() {
  "use strict";

  var state = function() {
    this.deaths;
    this.pace = 1000;
    this.wait = false;
    this.freeze = false;

    var fSize = gA.cW/30,
      gap = gA.tS/3,
      textR,
      timeOut;

    this.update = function() {
      if(!this.freeze) {
        this.deaths = gA.lvl.list[gA.lvl.num].curDeaths.toString();
        if(this.deaths.length === 1) this.deaths = ''.concat('0',this.deaths);
        if(!this.wait && this.time !== 0) {
          this.wait = true;
          timeOut = setTimeout(function() {
            this.time -= 1;
            this.wait = false;
            if(gA.state.gameRunning) {
              if(this.time <= 4 && this.time !== 0) {
                gA.sound.timer.play();
              } else if(this.time%10 === 0 && this.time !== 0) {
                gA.sound.timer.play();

                if(gA.lvl.list[gA.lvl.num].timeFlip) {
                  var swap=gA.bgClr;
                  gA.bgClr=gA.fgClr;
                  gA.fgClr=swap;
                  if(!gA.lvl.cur.player.color) {
                    gA.player.state.R = gA.fgClr.R;
                    gA.player.state.G = gA.fgClr.G;
                    gA.player.state.B = gA.fgClr.B;
                  } else {
                    gA.player.state.R = gA.lvl.cur.player.color[0];
                    gA.player.state.G = gA.lvl.cur.player.color[1];
                    gA.player.state.B = gA.lvl.cur.player.color[2];
                  }
                  gA.map.aniClear();
                  gA.map.init.render(true);
                }

              }
            }
          }.bind(this), this.pace);
        }
      } else {
        clearTimeout(timeOut);
        this.wait = false;
      }
    };
    this.render = function() {
      gA.ctx.g.font = ''+fSize+'px monospace';
      gA.ctx.g.lineWidth = 3;
      gA.ctx.g.lineJoin = 'circle';
      gA.ctx.g.strokeStyle = 'rgba('+gA.bgClr.R+','+gA.bgClr.G+','+gA.bgClr.B+')';
      gA.ctx.g.strokeText('⌛ '+this.time, gap, gA.tS);
      textR = gA.cW-gA.ctx.g.measureText('💀 '+this.deaths).width-gap;
      gA.ctx.g.strokeText('💀 '+this.deaths, textR, gA.tS);
      gA.ctx.g.strokeText('L '+gA.lvl.num, gA.cW/2-gA.ctx.g.measureText('L '+gA.lvl.num).width/2, gA.tS);
      gA.ctx.g.fillStyle = 'rgba('+gA.fgClr.R+','+gA.fgClr.G+','+gA.fgClr.B+')';
      gA.ctx.g.fillText('⌛ '+this.time, gap, gA.tS);
      gA.ctx.g.fillText('💀 '+this.deaths, textR, gA.tS);
      gA.ctx.g.fillText('L '+gA.lvl.num, gA.cW/2-gA.ctx.g.measureText('L '+gA.lvl.num).width/2, gA.tS);
    };
  };

  return { state: new state() };
})();

