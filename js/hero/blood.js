gA.blood = (function() {
  "use strict";

  var array = [];

  var make = function(range) {
    this.type = 'blood';
    this.x = gA.player.state.x+Math.floor(Math.random() * range)+1;
    this.y = gA.player.state.y+gA.player.state.h;
    this.w = gA.tS/4;
    this.h = gA.tS/4;
    this.plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    this.vx = (Math.random()*4/gA.scale) * this.plusOrMinus;
    this.vy = (Math.random()*8/gA.scale+8/gA.scale)*-1;
    this.spd = 2;
    this.A = 1;
    this.R = Math.floor(Math.random()*110)+90;
    this.color = 'rgba('+ this.R +',0,0,'+this.A+')';
    this.gravConst = 3/gA.scale;
    this.grav = this.gravConst;
    this.gravMax = 10/gA.scale;
    this.onG = false;
    this.gravCollide = false;
    this.windCollide = false;
    this.action;
    this.jump = true;
    this.wind = false;

    array.push(this);

    var grid;

    this.update = function() {

      //Make collision grid + get map tilePos
      grid = new gA.collision.map(this.x, this.y, this.w, this.h).update();

      if(this.jump === true) {
        jumpActive(this, grid);
      } else if (this.wind === true) {
        windActive(this, grid);
      } else {
        gravActive(this, grid);
      }

      this.y += this.vy;
      this.x += this.vx;

    };
    this.render = function() {
      // var collisionView = new gA.viewCollide.viewMap(grid.grid, grid.cTX, grid.cTY);
      // collisionView.render();
      // var spikeCollisionView = new gA.viewCollide.viewSpikeTouch(this, grid.grid, grid.cTX, grid.cTY);
      // spikeCollisionView.render();

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
      obj.vy -= 0.2/gA.scale;
    }

    if(obj.vy >= 0) {
      obj.jump = false;
    } else {
      obj.vy += 1/gA.scale;
    }
  }

  var init = function() {
    var i;

    this.update = function() {
      for(i = 0; i < array.length; i += 1) array[i].update();
    };
    this.render = function() {
      for(i = 0; i < array.length; i += 1) array[i].render();
    };
  };

  var arrayClear = function() {
    array = [];
  };

  return {
    make: make,
    init: init,
    arrayClear: arrayClear
  };

})();

