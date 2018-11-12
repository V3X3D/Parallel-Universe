gA.title = (function() {
  "use strict";

  var A = 0;

  gA.ctx.g.font = ''+gA.cW/28+'px monospace';
  var options = {
    opt0: {
      color: function() {return 'rgba(255,255,255,'+A+')';},
      text: 'New',
      y: gA.cH/2-gA.tS-gA.tS/4,
      animation: function(obj, key) {
        gA.change.arrPush(new gA.change.fade('out', options[key].action.bind(obj)));
      },
      action: function(obj) {
        gA.state.titleScreen = false;
        gA.state.transition = true;
        gA.state.gameRunning = true;
        gA.lvlNum = 0;
        gA.nextLevel.go();
      }
    },
    opt1: {
      color: function() {return 'rgba(255,255,255,'+A+')';},
      text: 'Load',
      y: gA.cH/2-gA.tS/4,
      animation: function(obj, key) {
        gA.change.arrPush(new gA.change.fade('out', options[key].action.bind(obj)));
      },
      action: function(obj) {
        gA.state.titleScreen = false;
        gA.state.transition = true;
        gA.state.gameRunning = true;
        gA.lvlNum -= 1;
        gA.nextLevel.go();
      }
    },
    opt2: {
      color: function() {return 'rgba(0,0,0,'+A+')';},
      text: 'Stats',
      y: gA.cH/2+gA.tS-gA.tS/4
      // action: function() { gA.state.titleScreen = true; }
    },
    opt3: {
      color: function() {return 'rgba(0,0,0,'+A+')';},
      text: 'Credits',
      y: gA.cH/2+gA.tS*2-gA.tS/4,
      animation: function(obj, key) {
        // gA.change.arrPush(new gA.change.fade('out', options[key].action.bind(obj)));
      },
      action: function(obj) {
        //
      }
    }
  };
  var shared = {
    x: gA.cW-gA.ctx.g.measureText('Continue').width-gA.tS,
    selected: 0,
    size: 0
  };

  var menu = function() {
    this.done = false;
    this.fadeIn = false;

    var cursor = new gA.cursor.state(options, shared, this);

    for(var key in options)
      if (options.hasOwnProperty(key)) shared.size += 1;

    this.update = function() {
      gA.pause.resetMenu(gA.pause.menu);
      seq1.action();
      seq2.action();
      seq3.action();
      if(seq4.action()) this.done = true;
      if(this.done) cursor.update();
    };
    this.render = function() {
      seq1.draw();
      seq2.draw();
      seq3.draw();
      gA.ctx.g.font = ''+gA.cW/16+'px monospace';
      gA.ctx.g.fillStyle = '#fff';
      gA.ctx.g.fillText('Parallel', gA.tS, gA.cH/2-gA.tS/2);
      gA.ctx.g.fillStyle = '#000';
      gA.ctx.g.fillText('Universe', gA.tS, gA.cH/2+gA.tS+gA.tS/4);

      if(this.done) {
        if(this.fadeIn) {
          gA.change.arrPush(new gA.change.fade('in', undefined, 0.035));
          this.fadeIn = false;
        }
        A += 0.1;
        gA.ctx.g.font = ''+gA.cW/28+'px monospace';
        for(var key in options) {
          if (options.hasOwnProperty(key)) {
            gA.ctx.g.fillStyle = options[key].color();
            gA.ctx.g.fillText(options[key].text, shared.x, options[key].y);
          }
        }
        cursor.render();
      }
    };
  };

  return { menu: new menu() };

})();

var seq1 = {
  color: '#fff',
  x: 0,
  y: -gA.cH,
  spd: 28,
  delay: 30,
  action: function() {
    if(this.delay > 0) this.delay -= 1;
    if(this.y < 0 && this.delay <= 0) {
      this.y += this.spd;
      if(this.y > 0) this.y = 0;
      return true;
    }
    return false;
  },
  draw: function() {
    gA.ctx.g.fillStyle = this.color;
    gA.ctx.g.fillRect(this.x, this.y, gA.cW, gA.cH);
  }
};
var seq2 = {
  color: '#000',
  x: -gA.cW,
  y: 0,
  spd: 38,
  delay: 90,
  action: function() {
    if(this.delay > 0) this.delay -= 1;
    if(this.x < 0 && this.delay <= 0) {
      this.x += this.spd;
      if(this.x > 0) this.x = 0;
      return true;
    }
    return false;
  },
  draw: function() {
    gA.ctx.g.fillStyle = this.color;
    gA.ctx.g.fillRect(this.x, this.y, gA.cW, gA.cH);
  }
};
var seq3 = {
  color: '#fff',
  x: 0,
  y: gA.cH,
  spd: 24,
  delay: 120,
  action: function() {
    if(this.delay > 0) this.delay -= 1;
    if(this.y > gA.cH/2 && this.delay <= 0) {
      this.y -= this.spd;
      if(this.y < gA.cH/2) this.y = gA.cH/2;
      return true;
    }
    return false;
  },
  draw: function() {
    gA.ctx.g.fillStyle = this.color;
    gA.ctx.g.fillRect(this.x, this.y, gA.cW, gA.cH);
  }
};
var seq4 = {
  delay: 150,
  action: function() {
    if(this.delay > 0) this.delay -= 1;
    if(this.delay <= 0) return true;
    return false;
  }
};
