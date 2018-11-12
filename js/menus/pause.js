var closeMenu = function(obj) {
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

      this.bgRGB = [gA.lvl.cur.bgClr.R, gA.lvl.cur.bgClr.G, gA.lvl.cur.bgClr.B];
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
        if(this.state.home) {
          gA.pause.home.update.bind(this)();
        } else if (this.state.stats) {
          gA.pause.stats.update.bind(this)();
        }
      }
    };
    this.render = function() {
      gA.ctx.g.fillStyle = this.color;
      gA.ctx.g.fillRect(this.x1, 0, gA.cW, gA.cH/2);
      gA.ctx.g.fillStyle = this.color2;
      gA.ctx.g.fillRect(this.x2, gA.cH/2, gA.cW, gA.cH);

      //Text
      if(this.done) {
        if(this.state.home) {
          gA.pause.home.render.bind(this)();
        } else if(this.state.stats) {
          gA.pause.stats.render.bind(this)();
        }
      }
    };
  };

  return {
    menu: new menu(),
    closeMenu: closeMenu,
    resetMenu: resetMenu
  };

})();
