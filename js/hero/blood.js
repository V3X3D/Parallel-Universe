gA.blood = (function() {
  "use strict";

  var inc=50, array=[], i, grid;

  var make = function(range) {
    this.type = 'blood';
    this.x = gA.player.state.x+Math.floor(Math.random() * range)+1;
    this.y = gA.player.state.y+gA.player.state.h;
    this.w = gA.tS/4;
    this.h = gA.tS/4;
    this.plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    this.vx = (Math.random()*4) * this.plusOrMinus;
    this.vy = (Math.random()*8+8)*-1;
    this.spd = 2;

    this.invert = Math.random() < 0.5 ? -1 : 1;

    if(!gA.lvl.cur.bloodClr || gA.customClr) {
      this.RGBo = [gA.bgClr.R, gA.bgClr.G, gA.bgClr.B];
      this.RGB = [gA.bgClr.R, gA.bgClr.G, gA.bgClr.B];
      this.RGB = gA.colorAjust(this.RGB, inc);

      if(this.invert === 1) {
        if(gA.invertClr(this.RGBo[0]) === gA.fgClr.R && gA.invertClr(this.RGBo[1]) === gA.fgClr.G && gA.invertClr(this.RGBo[2]) === gA.fgClr.B) {
          this.RGB = [gA.invertClr(this.RGB[0]), gA.invertClr(this.RGB[1]), gA.invertClr(this.RGB[2])];
        } else {
          this.RGB = [gA.fgClr.R, gA.fgClr.G, gA.fgClr.B];
          this.RGB = gA.colorAjust(this.RGB, inc);
        }
      }
    } else {
      this.RGB = [gA.lvl.cur.bloodClr.R, gA.lvl.cur.bloodClr.G, gA.lvl.cur.bloodClr.B];
      if(!gA.lvl.cur.bloodShft)
        this.RGB = gA.colorAjust(this.RGB, 0);
      else
        this.RGB = gA.colorAjust(this.RGB, Math.floor(Math.random()*(gA.lvl.cur.bloodShft.max - gA.lvl.cur.bloodShft.min + 1))+gA.lvl.cur.bloodShft.min);
    }
    this.color = 'rgba('+ this.RGB[0] +','+this.RGB[1]+','+ this.RGB[2] +',1)';

    this.gravConst = 3;
    this.grav = this.gravConst;
    this.gravMax = 10;
    this.onG = false;
    this.gravCollide = false;
    this.windCollide = false;
    this.action;
    this.jump = true;
    this.wind = false;

    array.push(this);

    this.update = function() {
      grid = new gA.collision.map(this.x, this.y, this.w, this.h);

      if(this.jump) jumpActive(this, grid);
      else if (this.wind) windActive(this, grid);
      else gravActive(this, grid);

      this.y += this.vy;
      this.x += this.vx;
    };
    this.render = function() {
      gA.ctx.g.fillStyle = this.color;
      gA.ctx.g.fillRect(this.x, this.y, this.w, this.h);
    };
  };

  /*COLLISION FUNCTIONS*/
  function windActive(obj, grid) {
    obj.action = 'wind';
    obj.windCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, 0, obj.grav);

    if(obj.windCollide === 'wind') {
      obj.grav = -obj.grav;
      if (-obj.grav > -obj.gravMax-6) obj.grav += 1;
      if(obj.grav !== 0) obj.grav = -obj.grav; // Prevent -0s

      if(obj.grav <= 4) obj.y += obj.grav+1.5;
      else obj.y += obj.grav;

      obj.jump = false;
    } else {
      obj.wind = false;
      obj.y += obj.grav;
    }
  }

  function gravActive(obj, grid) {
    if(obj.grav >= 0) {
      obj.action = 'gravity';
      obj.gravCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, 0, obj.grav);
    } else if (obj.grav < 0) {
      obj.action = 'wind';
      obj.gravCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, 0, obj.grav);
    }

    if (obj.gravCollide === 'wind') {
      obj.wind = true;
    } else if (obj.gravCollide && obj.gravCollide !== 'spike') {
      if(obj.grav < 0) {
        if(obj.gravCollide.tY !== undefined) obj.y = obj.gravCollide.tY + gA.tS;
      }
      obj.y += 0.5;
      obj.grav = obj.gravConst;
      if(obj.vx > 0) obj.vx -= 0.075;
      else obj.vx = 0;
    } else {
      if (obj.grav < obj.gravMax) obj.grav += 0.5;
      obj.y += obj.grav;
    }
  }

  //Not this
  function jumpActive(obj, grid) {
    obj.action = 'jump';
    obj.jumpCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, 0, obj.vy+1);

    if(obj.jumpCollide === 'wind') {
      obj.wind = true;
    } else if(obj.jumpCollide) {
      obj.vy -= 0.2;
    }

    if(obj.vy >= 0) {
      obj.jump = false;
    } else {
      obj.vy += 1;
    }
  }

  var init = function() {
    this.update = function() {for(i=0;i<array.length;i+=1) array[i].update();};
    this.render = function() {for(i= 0;i<array.length;i+=1) array[i].render();};
  };

  var arrayClear = function() { array = []; };

  return {
    make: make,
    init: init,
    arrayClear: arrayClear
  };

})();

