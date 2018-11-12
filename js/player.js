gA.player = (function() {
  "use strict";

  function playerInit() {
    this.alive = true;
    this.x = 224/gA.scale;
    this.y = 0;
    this.w = gA.tS;
    this.h = gA.tS;
    this.spd = 4/gA.scale;
    this.jump = false;
    this.gravConst = 1;
    this.grav = this.gravConst;
    this.gravMax = 12/gA.scale;
    this.vyConst = -12/gA.scale;
    this.vy = this.vyConst;
    this.A = 1;
    this.R = 0;
    this.G = 0;
    this.B = 0;
    this.color = 'rgba('+this.R+','+this.G+','+this.B+','+this.A+')';
    this.action;

    this.gravCollide;
    this.leftCollide;
    this.rightCollide;
    this.jumpCollide;

    var grid;

    this.update = function() {

      //Make collision grid + get player in map grid position
      grid = new gA.collision.map(this.x, this.y, this.w, this.h).update();

      if(this.alive) {
        //Jump and Gravity
        if (this.jump === true) {
          jumpActive(this, grid);
        } else {
          gravityActive(this, grid);
        }

        if (gA.key.up === true && this.jump === false && gA.noHold.up === false) {
          gA.noHold.up = true;
          if (this.gravCollide) this.jump = true;
        }
        if (gA.key.left === true) {
          leftActive(this, grid);
        }
        if (gA.key.right === true) {
          rightActive(this, grid);
        }
      }
    };

    this.render = function() {
      // var collisionView = new gA.viewCollide.viewMap(grid.grid, grid.cTX, grid.cTY);
      // collisionView.render();
      // var spikeCollisionView = new gA.viewCollide.viewSpikeTouch(this, grid.grid, grid.cTX, grid.cTY);
      // spikeCollisionView.render();

      this.color = 'rgba('+this.R+','+this.G+','+this.B+','+this.A+')';
      gA.ctx.g.fillStyle = this.color;

      if(this.alive) {
        gA.ctx.g.fillRect(this.x, this.y, this.w, this.h);
      } else {
        this.A -= 0.2; // Fade out if dead
        gA.ctx.g.fillRect(this.x, this.y, this.w, this.h);
      }
    };
  }

  // Jumping
  function jumpActive(obj, grid) {
    obj.jumpCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, 0, obj.vy);

    if(obj.jumpCollide && obj.jumpCollide !== 'wind') {
      obj.vy = 0;
      obj.jump = false;
      if(obj.jumpCollide === 'spike') death(obj);
    } else if(obj.jumpCollide === 'wind') {
      obj.vy = 0;
      obj.jump = false;
    }

    if(obj.vy > 0) { //Once at top of jump start using gravity
      obj.jump = false;
    } else {
      if (obj.vy < obj.gravMax) obj.vy += 1/gA.scale;
      obj.y += obj.vy;
    }
  }

  // Gravity
  function gravityActive(obj, grid) {
    obj.action = 'gravity';
    obj.gravCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, 0, obj.grav);

    if (obj.gravCollide && obj.gravCollide !== 'wind') {
      if(obj.gravCollide.tY !== undefined) obj.y = obj.gravCollide.tY - obj.h;
      obj.grav = obj.gravConst;
      obj.vy = obj.vyConst;
      if(obj.gravCollide === 'spike') death(obj);
    } else if(obj.gravCollide === 'wind') {
      obj.jumpCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, 0, obj.vy);
      obj.grav = -16;
      obj.y += obj.grav;
    } else {
      if (obj.grav < obj.gravMax) obj.grav += 1/gA.scale;
      obj.y += obj.grav;
    }
  }

  // Move left / right
  function leftActive(obj, grid) {
    obj.leftCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, -obj.spd, 0);

    if(obj.leftCollide && obj.leftCollide !== 'wind') {
      obj.x += obj.spd;
      // if(obj.leftCollide !== 'wind') obj.x += obj.spd;
      if(obj.leftCollide === 'spike') death(obj);
    }
    obj.x -= obj.spd;
  }

  function rightActive(obj, grid) {
    obj.rightCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, obj.spd, 0);

    if(obj.rightCollide && obj.rightCollide !== 'wind') {
      obj.x -= obj.spd;
      // if(obj.rightCollide !== 'wind') obj.x -= obj.spd;
      if(obj.rightCollide === 'spike') death(obj);
    }
    obj.x += obj.spd;
  }

  // Spike collision
  function death(obj) {
    obj.gravCollide = '';
    obj.leftCollide = '';
    obj.rightCollide = '';
    obj.jumpCollide = '';

    for(var i = 0; i < Math.floor(Math.random() * 16)+18; i+=1) {
      new gA.blood.make(23/gA.scale);
    }

    obj.alive = false;
  }

  return {
    state: new playerInit()
  };

})();

