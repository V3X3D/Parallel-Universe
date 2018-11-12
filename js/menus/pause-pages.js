gA.pause = {};
gA.ctx.g.font = ''+gA.cW/22+'px monospace';
gA.pause.home = {
  shared: {
    x: gA.cW-gA.ctx.g.measureText('Continue').width-gA.tS,
    selected: 0
  },
  list: [
    {
      text: 'Continue',
      y: gA.cH/2+gA.tS+16,
      animation:function(obj) { closeMenu(obj); }
    },
    {
      text: 'Stats',
      y: gA.cH/2+gA.tS*2+16,
      animation: function(obj) {
        obj.state.home = false;
        obj.state.stats = true;
      }
    },
    {
      text: 'Exit',
      y: gA.cH/2+gA.tS*3+16,
      animation: function(obj, key) {
        obj.fade = true;
        gA.change.arrPush(new gA.change.fade('out', gA.pause.home.list[key].action.bind(obj), 0.035));
      },
      action: function() {
        gA.pause.run.menu.fade = false;
        gA.lvl.cur.curDeath = 0;
        gA.state.pauseMenu = false;
        gA.map.aniClear();
        this.cursor.share.selected = 0;
        gA.state.titleScreen = true;
        gA.title.run.menu.called = true;
      }
    }
  ],
  update: function() {
    if(gA.key.esc && !gA.noHold.esc) {
      gA.noHold.esc = true;
      closeMenu(this);
    } else this.cursor.update();
  },
  render: function() {
    //Top
    gA.ctx.g.font = ''+gA.cW/16+'px monospace';
    gA.ctx.g.fillStyle = this.color2;
    gA.ctx.g.fillText('Paused', gA.tS, gA.cH/2-gA.tS);
    var offset = gA.ctx.g.measureText('Paused').width;
    gA.ctx.g.font = ''+gA.cW/32+'px monospace';
    offset = offset-gA.ctx.g.measureText('Level: '+gA.lvl.num+'').width;
    gA.ctx.g.fillText('Level: '+gA.lvl.num+'', offset+gA.tS, gA.cH/2-gA.tS/3);
    //Bottom
    gA.ctx.g.font = ''+gA.cW/22+'px monospace';
    gA.ctx.g.fillStyle = this.color;
    for(var k=0; k<gA.pause.home.list.length; k+=1) {
      gA.ctx.g.fillText(gA.pause.home.list[k].text, gA.pause.home.shared.x, gA.pause.home.list[k].y);
    }

    this.cursor.render();
  }
};

gA.pause.stats = {
  update: function() {
    if(gA.key.esc && !gA.noHold.esc) {
      gA.noHold.esc = true;
      this.state.home = true;
      this.state.stats = false;
    }
  },
  render: function() {
    gA.ctx.g.fillStyle = gA.pause.run.menu.color2;
    gA.ctx.g.font = ''+gA.cW/12+'px monospace';
    var w = gA.ctx.g.measureText('Stats-lvl:'+gA.lvl.num+'').width;
    gA.ctx.g.fillText('Stats-lvl:'+gA.lvl.num+'', gA.cW/2-w/2, gA.cH/2-gA.tS);

    gA.ctx.g.fillStyle = gA.pause.run.menu.color;
    gA.ctx.g.font = ''+gA.cW/28+'px monospace';
    gA.ctx.g.fillText('Death Count', gA.tS, gA.cH/2+gA.tS*2-gA.tS/4);
    gA.ctx.g.font = ''+gA.cW/32+'px monospace';
    gA.ctx.g.fillText('Cur: '+gA.lvl.cur.curDeaths+'', gA.tS, gA.cH/2+gA.tS*4-gA.tS/4);
    gA.ctx.g.fillText('Min: '+gA.lvl.cur.minDeaths+'', gA.tS, gA.cH/2+gA.tS*5-gA.tS/4);
    gA.ctx.g.fillText('Max: '+gA.lvl.cur.maxDeaths+'', gA.tS, gA.cH/2+gA.tS*6-gA.tS/4);

    gA.ctx.g.font = ''+gA.cW/28+'px monospace';
    w = gA.ctx.g.measureText('Time Count').width;
    gA.ctx.g.fillText('Time Count', gA.cW-w-gA.tS, gA.cH/2+gA.tS*2-gA.tS/4);
    gA.ctx.g.font = ''+gA.cW/32+'px monospace';
    gA.ctx.g.fillText('Cur: '+gA.lvl.cur.curTime+'', gA.cW-w-gA.tS, gA.cH/2+gA.tS*4-gA.tS/4);
    gA.ctx.g.fillText('Min: '+gA.lvl.cur.minTime+'', gA.cW-w-gA.tS, gA.cH/2+gA.tS*5-gA.tS/4);
    gA.ctx.g.fillText('Max: '+gA.lvl.cur.maxTime+'', gA.cW-w-gA.tS, gA.cH/2+gA.tS*6-gA.tS/4);
  }
};
