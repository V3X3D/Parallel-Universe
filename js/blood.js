gA.blood = (function() {
  "use strict";

  var array = [];

  var make = function(range) {
    this.x = gA.player.state.x+Math.floor(Math.random() * range)+1;
    this.y = gA.player.state.y+gA.player.state.h;
    this.w = gA.tS/4;
    this.h = gA.tS/4;
    this.dir = Math.floor(Math.random()*2); // 0 left 1 right
    this.vx = Math.random()*4/gA.scale;
    this.vy = (Math.random()*8/gA.scale+8/gA.scale)*-1;
    this.spd = 2/gA.scale;
    this.color = 'rgb('+ (Math.floor(Math.random()*110)+90) +',0,0)';
    this.gravConst = 3/gA.scale;
    this.grav = this.gravConst;
    this.gravMax = 10/gA.scale;
    this.onG = false;
    this.up = true;
    this.gravCollide = false;
    this.action;

    array.push(this);

    var grid;

    this.update = function() {

      //Make collision grid + get map tilePos
      grid = new gA.collision.map(this.x, this.y, this.w, this.h).update();

      if (this.up === false) {
        this.action = 'gravity';
        this.gravCollide = gA.collision.check(this, grid.grid, grid.cTX, grid.cTY, 0, this.grav);

        if (this.gravCollide) {
          this.y += 1/gA.scale;
          this.grav = this.gravConst;
          if(this.vx > 0) {
            this.vx -= 0.1/gA.scale;
          } else {
            this.vx = 0;
          }
        } else {
          if (this.grav > this.gravMax) {
            this.y += Math.round( this.grav );
          } else {
            this.y += Math.round( this.grav *= 1.05 );
          }
        }
      } else {
        this.action = 'jump';
        this.jumpCollide = gA.collision.check(this, grid.grid, grid.cTX, grid.cTY, 0, this.vy+1);

        if(this.jumpCollide) {
          this.vy -= 0.2/gA.scale;
        }

        if(this.vy >= 0) {
          this.up = false;
        } else {
          this.vy += 1/gA.scale;
        }
      }

      this.y += this.vy;
      if(this.dir === 0) {
        this.x -= this.vx;
      } else {
        this.x += this.vx;
      }

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

