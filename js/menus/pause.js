var closeMenu = function(obj) {
  setTimeout(function() { resetMenu(obj); }.bind(obj), 300);
  gA.state.pauseMenu = false;
  gA.state.gameRunning = true;
};
var resetMenu = function(obj) {
  obj.done = false;
  obj.x1 = -gA.cW;
  obj.x2 = gA.cW;
  gA.state.pauseMenu = false;
};

gA.pause = (function() {
  "use strict";

  gA.ctx.g.font = ''+gA.cW/22+'px monospace';
  var options = {
    opt0: {
      text: 'Continue',
      y: gA.cH/2+gA.tS+16,
      animation:function(obj) { closeMenu(obj); }
    },
    opt1: {
      text: 'Stats',
      y: gA.cH/2+gA.tS*2+16,
      animation: function(obj) { }
    },
    opt2: {
      text: 'Exit',
      y: gA.cH/2+gA.tS*3+16,
      animation: function(obj, key) {
        gA.change.arrPush(new gA.change.fade('out', options[key].action.bind(obj), 0.035));
      },
      action: function(obj) { 
        // resetMenu(obj);
        gA.state.pauseMenu = false;
        gA.map.aniClear();
        gA.state.titleScreen = true;
        gA.title.menu.fadeIn = true;
      }
    }
  };
  var shared = {
    x: gA.cW-gA.ctx.g.measureText('Continue').width-gA.tS,
    selected: 0,
    size: 0
  };

  var menu = function() {
    this.bgRGB;
    this.fgRGB;
    this.color;
    this.color2;
    this.done = false;
    this.spd = 48;
    this.x1 = -gA.cW;
    this.x2 = gA.cW;

    for(var key in options)
      if (options.hasOwnProperty(key)) shared.size += 1;

    var cursor = new gA.cursor.state(options, shared, this);

    this.update = function() {

      this.bgRGB = [gA.level.bgClr.R, gA.level.bgClr.G, gA.level.bgClr.B];
      this.fgRGB = [gA.fgClr.R, gA.fgClr.G, gA.fgClr.B];
      this.bgRGB = gA.colorAjust(this.bgRGB, 30);
      this.fgRGB = gA.colorAjust(this.fgRGB, 30);

      this.color = 'rgba('+ this.bgRGB[0] +','+this.bgRGB[1]+','+ this.bgRGB[2] +',1)';
      this.color2 = 'rgba('+ this.fgRGB[0] +','+this.fgRGB[1]+','+ this.fgRGB[2] +',1)';

      if(this.x1 >= 0) {this.x1 = 0;}
      else {this.x1 += this.spd;}

      if(this.x2 <= 0) {this.x2 = 0; this.done = true;}
      else {this.x2 -= this.spd;}

      if(this.done) {
        if(gA.key.esc) closeMenu(this);
        else cursor.update();
      }
    };
    this.render = function() {
      gA.ctx.g.fillStyle = this.color;
      gA.ctx.g.fillRect(this.x1, 0, gA.cW, gA.cH/2);
      gA.ctx.g.fillStyle = this.color2;
      gA.ctx.g.fillRect(this.x2, gA.cH/2, gA.cW, gA.cH);

      //Text
      if(this.done) {
        //Top
        gA.ctx.g.font = ''+gA.cW/16+'px monospace';
        gA.ctx.g.fillStyle = this.color2;
        gA.ctx.g.fillText('Paused', gA.tS, gA.cH/2-gA.tS);
        var offset = gA.ctx.g.measureText('Paused').width;
        gA.ctx.g.font = ''+gA.cW/32+'px monospace';
        offset = offset-gA.ctx.g.measureText('Level: '+gA.lvlNum+'').width;
        gA.ctx.g.fillText('Level: '+gA.lvlNum+'', offset+gA.tS, gA.cH/2-gA.tS/3);
        //Bottom
        gA.ctx.g.font = ''+gA.cW/22+'px monospace';
        gA.ctx.g.fillStyle = this.color;
        for(var key in options) {
          if (options.hasOwnProperty(key)) {
            gA.ctx.g.fillText(options[key].text, shared.x, options[key].y);
          }
        }

        cursor.render();
      }
    };
  };

  return { 
    menu: new menu(),
    closeMenu: closeMenu,
    resetMenu: resetMenu
  };

})();
