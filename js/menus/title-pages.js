gA.title = {};
gA.ctx.g.font = ''+gA.cW/28+'px monospace';
gA.title.home = {
  shared: {
    x: gA.cW-gA.ctx.g.measureText('Continue').width-gA.tS,
    selected: 0
  },
  list: [
    {
      color: function(obj) {return 'rgba(255,255,255,'+obj.A+')';},
      text: 'New',
      y: gA.cH/2-gA.tS-gA.tS/4,
      animation: function(obj, key) {
        obj.fade = true;
        gA.change.arrPush(new gA.change.fade('out', gA.title.home.list[key].action.bind(obj), 0.04));
      },
      action: function() {
        gA.title.run.menu.fade = false;
        gA.state.titleScreen = false;
        gA.state.transition = true;
        gA.state.gameRunning = true;
        gA.lvl.num = 0;
        gA.nextLevel.go();
        this.cursor.share.selected = 0;
      }
    },
    {
      color: function(obj) {return 'rgba(255,255,255,'+obj.A+')';},
      text: 'Load',
      y: gA.cH/2-gA.tS/4,
      animation: function(obj, key) {
        obj.fade = true;
        gA.change.arrPush(new gA.change.fade('out', gA.title.home.list[key].action.bind(obj), 0.04));
      },
      action: function() {
        gA.title.run.menu.fade = false;
        gA.state.titleScreen = false;
        gA.state.transition = true;
        gA.state.gameRunning = true;
        gA.lvl.num -= 1;
        gA.nextLevel.go();
        this.cursor.share.selected = 0;
      }
    },
    {
      color: function(obj) {return 'rgba(0,0,0,'+obj.A+')';},
      text: 'Stats',
      y: gA.cH/2+gA.tS-gA.tS/4,
      animation: function(obj, key) {
        obj.state.home = false;
        obj.state.stats = true;
      },
      action: function(obj) { }
    },
    {
      color: function(obj) {return 'rgba(0,0,0,'+obj.A+')';},
      text: 'Credits',
      y: gA.cH/2+gA.tS*2-gA.tS/4,
      animation: function(obj, key) {
        obj.state.home = false;
        obj.state.credits = true;
      },
      action: function(obj) { }
    }
    // {
    //   color: function(obj) {return 'rgba(0,0,0,'+obj.A+')';},
    //   text: 'Options',
    //   y: gA.cH/2+gA.tS*2-gA.tS/4,
    //   animation: function() { },
    //   action: function(obj) { }
    // }
  ],
  update: function() {
    gA.pause.run.resetMenu(gA.pause.run.menu);
    if(this.done && !this.fade) this.cursor.update();
  },
  render: function() {
    gA.ctx.g.font = ''+gA.cW/16+'px monospace';
    gA.ctx.g.fillStyle = '#fff';
    gA.ctx.g.fillText('Parallel', gA.tS, gA.cH/2-gA.tS/2);
    gA.ctx.g.fillStyle = '#000';
    gA.ctx.g.fillText('Universe', gA.tS, gA.cH/2+gA.tS+gA.tS/4);

    if(this.done) {
      if(this.called) { // Set called to true for fade in effect
        this.fade = true;
        this.called = false;
        gA.change.arrPush(new gA.change.fade('in', function(){gA.title.run.menu.fade = false;}, 0.045));
      }
      this.A += 0.1;
      gA.ctx.g.font = ''+gA.cW/28+'px monospace';
      for(var i=0; i<Object.keys(gA.title.home.list).length; i+=1) {
        gA.ctx.g.fillStyle = gA.title.home.list[i].color(this);
        gA.ctx.g.fillText(gA.title.home.list[i].text, gA.title.home.shared.x, gA.title.home.list[i].y);
      }
      this.cursor.render();
    }
  }
};

gA.title.stats = {
  cur: 1,
  update: function() {
    if(gA.key.esc) {
      this.state.home = true;
      this.state.stats = false;
    } else if(gA.key.right && gA.title.stats.cur < Object.keys(gA.lvl.list).length) {
      gA.title.stats.cur += 1;
      gA.key.right = false;
    } else if(gA.key.left && gA.title.stats.cur > 1) {
      gA.title.stats.cur -= 1;
      gA.key.left = false;
    } else if(gA.key.up) {
      if(gA.title.stats.cur+5 > Object.keys(gA.lvl.list).length) gA.title.stats.cur = Object.keys(gA.lvl.list).length;
      else gA.title.stats.cur += 5;
      gA.key.up = false;
    } else if(gA.key.down) {
      if(gA.title.stats.cur-5 < 1) gA.title.stats.cur = 1;
      else gA.title.stats.cur -= 5;
      gA.key.down = false;
    }
  },
  render: function() {
    gA.ctx.g.fillStyle = '#fff';
    gA.ctx.g.font = ''+gA.cW/12+'px monospace';
    var w = gA.ctx.g.measureText('Stats-lvl:'+1+'').width;
    gA.ctx.g.fillText('Stats-lvl:'+gA.title.stats.cur+'', gA.cW/2-w/2, gA.cH/2-gA.tS);

    gA.ctx.g.fillStyle = '#000';
    gA.ctx.g.font = ''+gA.cW/28+'px monospace';
    gA.ctx.g.fillText('Death Count', gA.tS, gA.cH/2+gA.tS*2-gA.tS/4);
    gA.ctx.g.font = ''+gA.cW/32+'px monospace';
    gA.ctx.g.fillText('Min: '+gA.lvl.list[gA.title.stats.cur].minDeaths+'', gA.tS, gA.cH/2+gA.tS*4-gA.tS/4);
    gA.ctx.g.fillText('Max: '+gA.lvl.list[gA.title.stats.cur].maxDeaths+'', gA.tS, gA.cH/2+gA.tS*5-gA.tS/4);
    gA.ctx.g.fillText('Total: '+gA.lvl.list[gA.title.stats.cur].totalDeaths+'', gA.tS, gA.cH/2+gA.tS*6-gA.tS/4);

    gA.ctx.g.font = ''+gA.cW/28+'px monospace';
    w = gA.ctx.g.measureText('Time Count').width;
    gA.ctx.g.fillText('Time Count', gA.cW-w-gA.tS, gA.cH/2+gA.tS*2-gA.tS/4);
    gA.ctx.g.font = ''+gA.cW/32+'px monospace';
    gA.ctx.g.fillText('Min: '+gA.lvl.list[gA.title.stats.cur].minTime+'', gA.cW-w-gA.tS, gA.cH/2+gA.tS*4-gA.tS/4);
    gA.ctx.g.fillText('Max: '+gA.lvl.list[gA.title.stats.cur].maxTime+'', gA.cW-w-gA.tS, gA.cH/2+gA.tS*5-gA.tS/4);
    gA.ctx.g.fillText('Total: '+gA.lvl.list[gA.title.stats.cur].totalTime+'', gA.cW-w-gA.tS, gA.cH/2+gA.tS*6-gA.tS/4);
  }
};

gA.title.credits = {
  update: function() {
    if(gA.key.esc) {
      this.state.home = true;
      this.state.credits = false;
    }
  },
  render: function() {
    gA.ctx.g.font = ''+gA.cW/16+'px monospace';
    gA.ctx.g.fillStyle = '#fff';
    gA.ctx.g.fillText('Credits', gA.tS, gA.cH/2-gA.tS/2);
    gA.ctx.g.font = ''+gA.cW/28+'px monospace';
    gA.ctx.g.fillStyle = '#000';
    gA.ctx.g.fillText('Design:      J3ST3R', gA.tS, gA.cH/2+gA.tS*2-gA.tS/4);
    gA.ctx.g.fillText('Programming: J3ST3R', gA.tS, gA.cH/2+gA.tS*3-gA.tS/4);
    gA.ctx.g.fillText('Music/Sound: Dub-Z', gA.tS, gA.cH/2+gA.tS*4-gA.tS/4);
    gA.ctx.g.fillText('Contact: email@email.net', gA.tS, gA.cH/2+gA.tS*6-gA.tS/4);
  }
};
