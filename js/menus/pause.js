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
      animation:function(obj) {closeMenu(obj);}
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
        if(gA.hud.state.time === 0) gA.lvl.num -= 1;
        gA.lvl.text.reset();
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
      gA.sound.cursor.play();
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

var closeMenu = function(obj) {
  gA.sound.cursor.play();
  setTimeout(function() { resetMenu(obj); }.bind(obj), 300);
  gA.state.pauseMenu = false;
  gA.state.gameRunning = true;
  gA.timer.resume();
};
var resetMenu = function(obj) {
  obj.done = false;
  obj.x1 = -gA.cW;
  obj.x2 = gA.cW;
  gA.state.pauseMenu = false;
};

gA.pause.run = (function() {
  "use strict";

  var menu = function() {
    this.bgRGB;
    this.fgRGB;
    this.color;
    this.color2;
    this.done = false;
    this.fade = false;
    this.spd = 48;
    this.x1 = -gA.cW;
    this.x2 = gA.cW;
    this.state = { home: true, stats: false };

    this.cursor = new gA.cursor.state(gA.pause.home.list, gA.pause.home.shared, this);

    this.update = function() {
      if(!gA.heart.state()) gA.sound.flatline.pause();
      if(gA.heart.state()) gA.heart.pause();

      this.bgRGB = [gA.bgClr.R, gA.bgClr.G, gA.bgClr.B];
      this.fgRGB = [gA.fgClr.R, gA.fgClr.G, gA.fgClr.B];
      this.bgRGB = gA.colorAjust(this.bgRGB, 30);
      this.fgRGB = gA.colorAjust(this.fgRGB, 30);

      this.color = 'rgba('+ this.bgRGB[0] +','+this.bgRGB[1]+','+ this.bgRGB[2] +',1)';
      this.color2 = 'rgba('+ this.fgRGB[0] +','+this.fgRGB[1]+','+ this.fgRGB[2] +',1)';

      if(this.x1 >= 0) {this.x1 = 0;}
      else {this.x1 += this.spd;}

      if(this.x2 <= 0) {this.x2 = 0; this.done = true;}
      else {this.x2 -= this.spd;}

      if(this.done && !this.fade) {
        if(this.state.home) gA.pause.home.update.bind(this)();
        else if (this.state.stats) gA.pause.stats.update.bind(this)();
      }
    };
    this.render = function() {
      gA.ctx.g.fillStyle = this.color;
      gA.ctx.g.fillRect(this.x1, 0, gA.cW, gA.cH/2);
      gA.ctx.g.fillStyle = this.color2;
      gA.ctx.g.fillRect(this.x2, gA.cH/2, gA.cW, gA.cH);

      //Text
      if(this.done) {
        if(this.state.home) gA.pause.home.render.bind(this)();
        else if(this.state.stats) gA.pause.stats.render.bind(this)();
      }
    };
  };

  return {
    menu: new menu(),
    closeMenu: closeMenu,
    resetMenu: resetMenu
  };
})();
