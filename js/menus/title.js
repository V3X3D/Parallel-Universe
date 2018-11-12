(function() {
  "use strict";

  gA.title = {};
  var w, w2, i, cur,
    listProto = {
      color: function(obj) {return 'rgba(0,0,0,1)';},
      text: '',
      animation: function() {}
    };

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
          gA.change.arrPush(new gA.change.fade('out', gA.title.home.list[key].action.bind(obj), 0.04, true));
        },
        action: function() {
          gA.sound.ambient.fade = true;
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
          gA.change.arrPush(new gA.change.fade('out', gA.title.home.list[key].action.bind(obj), 0.04, true));
        },
        action: function() {
          gA.sound.ambient.fade = true;
          gA.title.run.menu.fade = false;
          gA.state.titleScreen = false;
          gA.state.transition = true;
          gA.state.gameRunning = true;
          if(gA.lvl.num <= 0) gA.lvl.num = 0;
          else gA.lvl.num -= 1;
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
        }
      },
      {
        color: function(obj) {return 'rgba(0,0,0,'+obj.A+')';},
        text: 'Options',
        subText: 'NEW!',
        y: gA.cH/2+gA.tS*2-gA.tS/4,
        animation: function(obj, key) {
          if(!gA.contentLock15 || !gA.contentLock30) gA.newWarn = true;
          obj.state.home = false;
          obj.state.options = true;
        }
      }
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
        for(i=0; i<Object.keys(gA.title.home.list).length; i+=1) {
        gA.ctx.g.font = ''+gA.cW/28+'px monospace';
          gA.ctx.g.fillStyle = gA.title.home.list[i].color(this);
          gA.ctx.g.fillText(gA.title.home.list[i].text, gA.title.home.shared.x, gA.title.home.list[i].y);
          if(gA.title.home.list[i].subText && ( !gA.contentLock15 || !gA.contentLock30 ) && !gA.newWarn) {
            w = gA.ctx.g.measureText('Options').width;
            gA.ctx.g.font = ''+gA.cW/50+'px monospace';
            w2 = gA.ctx.g.measureText(gA.title.home.list[i].subText).width;
            gA.ctx.g.fillStyle = '#f00';
            gA.ctx.g.fillText(gA.title.home.list[i].subText, gA.title.home.shared.x+w, gA.title.home.list[i].y-gA.tS/4);
            // gA.ctx.g.fillText(gA.title.home.list[i].subText, gA.title.home.shared.x-w2, gA.title.home.list[i].y-gA.tS/4);
          }
        }
        this.cursor.render();
      }
    }
  };
  gA.title.stats = {
    cur: 1,
    update: function() {
      if(gA.key.esc) {
        gA.sound.cursor.play();
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
      w = gA.ctx.g.measureText('Stats-lvl:'+1+'').width;
      gA.ctx.g.fillText('Stats-lvl:'+gA.title.stats.cur+'', gA.cW/2-w/2, gA.cH/2-gA.tS);

      gA.ctx.g.fillStyle = '#000';
      gA.ctx.g.font = ''+gA.cW/28+'px monospace';
      gA.ctx.g.fillText('Death Count', gA.tS, gA.cH/2+gA.tS*2);
      gA.ctx.g.font = ''+gA.cW/32+'px monospace';
      gA.ctx.g.fillText('Min: '+gA.lvl.list[gA.title.stats.cur].minDeaths+'', gA.tS, gA.cH/2+gA.tS*4);
      gA.ctx.g.fillText('Max: '+gA.lvl.list[gA.title.stats.cur].maxDeaths+'', gA.tS, gA.cH/2+gA.tS*5);
      gA.ctx.g.fillText('Total: '+gA.lvl.list[gA.title.stats.cur].totalDeaths+'', gA.tS, gA.cH/2+gA.tS*6);

      gA.ctx.g.font = ''+gA.cW/28+'px monospace';
      w = gA.ctx.g.measureText('Time Count').width;
      gA.ctx.g.fillText('Time Count', gA.cW-w-gA.tS, gA.cH/2+gA.tS*2);
      gA.ctx.g.font = ''+gA.cW/32+'px monospace';
      gA.ctx.g.fillText('Min: '+gA.lvl.list[gA.title.stats.cur].minTime+'', gA.cW-w-gA.tS, gA.cH/2+gA.tS*4);
      gA.ctx.g.fillText('Max: '+gA.lvl.list[gA.title.stats.cur].maxTime+'', gA.cW-w-gA.tS, gA.cH/2+gA.tS*5);
      gA.ctx.g.fillText('Total: '+gA.lvl.list[gA.title.stats.cur].totalTime+'', gA.cW-w-gA.tS, gA.cH/2+gA.tS*6);
    }
  };
  gA.title.credits = {
    update: function() {
      if(gA.key.esc) {
        gA.noHold.esc = true;
        gA.sound.cursor.play();
        this.state.options = true;
        this.state.credits = false;
      }
    },
    render: function() {
      gA.ctx.g.fillStyle = '#fff';
      gA.ctx.g.font = ''+gA.cW/12+'px monospace';
      w = gA.ctx.g.measureText('Credits').width;
      gA.ctx.g.fillText('Credits', gA.cW/2-w/2, gA.cH/2-gA.tS);

      gA.ctx.g.font = ''+gA.cW/28+'px monospace';
      gA.ctx.g.fillStyle = '#000';
      gA.ctx.g.fillText('Design:      VEXED', gA.tS, gA.cH/2+gA.tS*2-gA.tS/4);
      gA.ctx.g.fillText('Programming: VEXED', gA.tS, gA.cH/2+gA.tS*3-gA.tS/4);
      gA.ctx.g.fillText('Audio:       VEXED/DuB-Ze', gA.tS, gA.cH/2+gA.tS*4-gA.tS/4);
      gA.ctx.g.fillText('Contact:     DeadHexGames@cock.li', gA.tS, gA.cH/2+gA.tS*6-gA.tS/4);
    }
  };
  gA.title.options = {
    shared: {
      x: gA.tS,
      selected: 0
    },
    list: [
      {
        __proto__: listProto,
        textUpdater: function() {
          if(gA.hard) return 'Difficulty: Hard';
          else return 'Difficulty: Normal';
        },
        textLock30: '🔒 (Finish lvl 30)',
        y: gA.cH/2+gA.tS*1.4,
        reset: function(obj, key) { gA.hard = false; },
        animation: function(obj, key) { if(!gA.contentLock30) gA.hard ^= true; }
      },
      {
        __proto__: listProto,
        textUpdater: function(obj, k) {
          if(gA.customClr) return 'Use custom colors: On';
          else return 'Use custom colors: Off';
        },
        textLock15: '🔒 (Finish lvl 15)',
        y: gA.cH/2+gA.tS*2.1,
        reset: function(obj, key) { gA.customClr = false; },
        animation: function(obj, key) { if(!gA.contentLock15) gA.customClr ^= true; }
      },
      {
        __proto__: listProto,
        textUpdater: function(obj, k) {
          if(obj[k].reverse) return 'Invert Color1: On';
          else return 'Invert Color1: Off';
        },
        textLock15: '🔒 (Finish lvl 15)',
        y: gA.cH/2+gA.tS*2.8,
        reverse: false,
        reset: function(obj, key) { obj.list[key].reverse = false; },
        animation: function(obj, key) {
          if(!gA.contentLock15) {
            obj.list[key].reverse ^= true;
            if(obj.list[key].reverse) {
              gA.clr2.R = gA.invertClr(gA.clr.R);
              gA.clr2.G = gA.invertClr(gA.clr.G);
              gA.clr2.B = gA.invertClr(gA.clr.B);
            }
          }
        }
      },
      {
        __proto__: listProto,
        textUpdater: function() {return 'Color1: (R '+gA.clr.R+', G '+gA.clr.G+', B '+gA.clr.B+')';},
        textLock15: '🔒 (Finish lvl 15)',
        y: gA.cH/2+gA.tS*3.5,
        inc: function(obj, key) {
          if(!gA.contentLock15) {
            gA.customClr = true;
            for(i in gA.clr) {
              if(gA.clr.hasOwnProperty(i)) if(gA.clr[i] < 255) gA.clr[i] += 1;
            }
          }
        },
        dec: function(obj, key) {
          if(!gA.contentLock15) {
            gA.customClr = true;
            for(i in gA.clr) {
              if(gA.clr.hasOwnProperty(i)) if(gA.clr[i] > 0) gA.clr[i] -= 1;
            }
          }
        },
        reset: function(obj, key) {
          for(i in gA.clr) { if(gA.clr.hasOwnProperty(i)) gA.clr[i] = 255; }
        },
        animation: function(obj, key) {
          if(!gA.contentLock15) {
            gA.customClr = true;
            for(i in gA.clr) {
              if(!gA.clr.hasOwnProperty(i)) continue;
              gA.clr[i] = Math.floor(Math.random()*255);
            }
            if(obj.list[key-1].reverse) {
              gA.clr2.R = gA.invertClr(gA.clr.R);
              gA.clr2.G = gA.invertClr(gA.clr.G);
              gA.clr2.B = gA.invertClr(gA.clr.B);
            }
          }
        }
      },
      {
        __proto__: listProto,
        textUpdater: function(obj, k) {
          if(obj[2].reverse) return 'Color2: Invert of Color1';
          else return 'Color2: (R '+gA.clr2.R+', G '+gA.clr2.G+', B '+gA.clr2.B+')';
        },
        textLock15: '🔒 (Finish lvl 15)',
        y: gA.cH/2+gA.tS*4.2,
        inc: function(obj, key) {
          if(!gA.contentLock15) {
            gA.customClr = true;
            obj.list[key-3].text = 'Use custom colors: On';
            for(i in gA.clr2) {
              if(gA.clr2.hasOwnProperty(i)) if(gA.clr2[i] < 255) gA.clr2[i] += 1;
            }
          }
        },
        dec: function(obj, key) {
          if(!gA.contentLock15) {
            gA.customClr = true;
            for(i in gA.clr2) {
              if(gA.clr2.hasOwnProperty(i)) if(gA.clr2[i] > 0) gA.clr2[i] -= 1;
            }
          }
        },
        reset: function(obj, key) {
          for(i in gA.clr2) { if(gA.clr2.hasOwnProperty(i)) gA.clr2[i] = 0; }
          obj.list[key-2].reverse = false;
        },
        animation: function(obj, key) {
          if(!gA.contentLock15) {
            gA.customClr = true;
            obj.list[key-2].reverse = false;

            for(i in gA.clr2) {
              if(!gA.clr2.hasOwnProperty(i)) continue;
              gA.clr2[i] = Math.floor(Math.random()*255);
            }
          }
        }
      },
      {
        __proto__: listProto,
        textUpdater: function(obj, k) {
          if(gA.masterVolume === 0) return obj[k].text = 'Volume: MUTE';
          if(gA.masterVolume === 1) return obj[k].text = 'Volume: 100%';
          return 'Volume: '+gA.masterVolume.toFixed(2).toString().split('.')[1]+'%';
        },
        y: gA.cH/2+gA.tS*4.9,
        inc: function(obj, key) {
          if(gA.masterVolume < 1)
            gA.masterVolume = Math.round(( gA.masterVolume+0.01 ) * 100) / 100;

          gA.sound.volumeSet();
        },
        dec: function(obj, key) {
          if(gA.masterVolume > 0)
            gA.masterVolume = Math.round(( gA.masterVolume-0.01 ) * 100) / 100;

          gA.sound.volumeSet();
        }
      },
      {
        __proto__: listProto,
        text: 'Credits',
        y: gA.cH/2+gA.tS*6.4,
        animation: function() {
          gA.title.run.menu.state.options = false;
          gA.title.run.menu.state.credits = true;
        }
      }
    ],
    cursor: undefined,
    update: function() {
      if(gA.title.options.cursor === undefined)
        gA.title.options.cursor = new gA.cursor.state(gA.title.options.list, gA.title.options.shared, gA.title.options);

      for(i=0; i<Object.keys(gA.title.options.list).length; i+=1) {
        cur = gA.title.options.list[i];
        if(cur.textUpdater) { cur.text = cur.textUpdater(gA.title.options.list, i); }
      }

      if(gA.key.esc && !gA.noHold.esc) {
        gA.saveSettings();
        gA.sound.cursor.play();
        this.state.home = true;
        this.state.options = false;
      }

      if(gA.title.options.cursor !== undefined) gA.title.options.cursor.update();
    },
    render: function() {
      gA.ctx.g.fillStyle = '#fff';
      gA.ctx.g.font = ''+gA.cW/12+'px monospace';
      w = gA.ctx.g.measureText('Options').width;
      gA.ctx.g.fillText('Options', gA.cW/2-w/2, gA.cH/2-gA.tS);

      gA.ctx.g.font = ''+gA.cW/36+'px monospace';
      for(i=0; i<Object.keys(gA.title.options.list).length; i+=1) {
        cur = gA.title.options.list[i];

        gA.ctx.g.fillStyle = cur.color(this);
        if(gA.contentLock15 && cur.textLock15) {
          w2 = gA.ctx.g.measureText(cur.textLock15).width;
          gA.ctx.g.fillText(cur.textLock15, gA.cW-w2-gA.tS, cur.y);
        }
        if(gA.contentLock30 && cur.textLock30) {
          w2 = gA.ctx.g.measureText(cur.textLock30).width;
          gA.ctx.g.fillText(cur.textLock30, gA.cW-w2-gA.tS, cur.y);
        }
        gA.ctx.g.fillText(cur.text, gA.title.options.shared.x, cur.y);
      }

      if(gA.title.options.cursor !== undefined) gA.title.options.cursor.render();
      gA.ctx.g.font = ''+gA.cW/50+'px monospace';
      gA.ctx.g.fillText('\'Enter\' To Change', gA.cW-gA.ctx.g.measureText('\'Enter\' To Change').width-gA.tS, gA.cH-gA.tS);
      gA.ctx.g.fillText('\'A/D\', Or \'←/→\' To Adjust', gA.cW-gA.ctx.g.measureText('\'A/D\', Or \'←/→\' To Adjust').width-gA.tS, gA.cH-gA.tS/2);
      gA.ctx.g.fillText('\'R\' To Reset', gA.cW-gA.ctx.g.measureText('\'R\' To Reset').width-gA.tS, gA.cH-gA.tS-gA.tS/2);
    }
  };
})();

gA.title.run = (function() {
  "use strict";

  var menu = function() {
    this.done = false;
    this.fade = false;
    this.called = false;
    this.state = { home: true, stats: false, credits: false, options: false };
    this.A = 0;

    this.cursor = new gA.cursor.state(gA.title.home.list, gA.title.home.shared, this);
    this.intro = new gA.intro.init();

    this.update = function() {
      if(this.intro.update()) this.done = true;

      if(this.state.home) gA.title.home.update.bind(this)();
      else if(this.state.stats) gA.title.stats.update.bind(this)();
      else if(this.state.credits) gA.title.credits.update.bind(this)();
      else if(this.state.options) gA.title.options.update.bind(this)();
      gA.sound.ambient.play();
    };
    this.render = function() {
      this.intro.render();

      if(this.state.home) gA.title.home.render.bind(this)();
      else if(this.state.stats) gA.title.stats.render();
      else if(this.state.credits) gA.title.credits.render();
      else if(this.state.options) gA.title.options.render();
    };
  };

  return { menu: new menu() };
})();

