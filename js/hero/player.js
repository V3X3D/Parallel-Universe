gA.player = (function() {
  "use strict";

  var particles = [];
  var nearGround;

  function playerInit() {
    this.alive = true;
    this.x = gA.level.player.x;
    this.y = gA.level.player.y;
    this.w = gA.tS;
    this.h = gA.tS;
    this.spd = 4;
    this.jump = false;
    this.wind = false;
    this.gravConst = 1;
    this.grav = this.gravConst;
    this.gravMax = 16;
    this.vyConst = -12;
    this.vy = this.vyConst;

    if(!gA.level.player.color) {
      this.R = gA.fgClr.R;
      this.G = gA.fgClr.G;
      this.B = gA.fgClr.B;
      this.A = 1;
    } else {
      this.R = gA.level.player.color[0];
      this.G = gA.level.player.color[1];
      this.B = gA.level.player.color[2];
      this.A = 1;
    }
    this.color = 'rgba('+this.R+','+this.G+','+this.B+','+this.A+')';

    this.action;
    this.gravCollide;
    this.leftCollide;
    this.rightCollide;
    this.jumpCollide;
    this.windCollide;

    this.locked = false;
    this.respawn = false;
    this.spawnAni;

    var grid;

    this.update = function() {

      //Make collision grid + get player in map grid position
      grid = new gA.collision.map(this.x, this.y, this.w, this.h).update();

      if(this.alive && !gA.state.transition && !this.locked) {
        // console.log(this.grav);

        //Jump and Gravity
        if (this.wind) windActive(this, grid);
        else if (this.jump) jumpActive(this, grid);
        else gravActive(this, grid);

        if (gA.key.up && !this.jump && !gA.noHold.up) {
          gA.noHold.up = true;
          if (this.gravCollide.tY !== undefined) this.jump = true; // If Gravity
        }
        //Do not put these about jump and gravity or spike collision is not perfect
        if (gA.key.left) leftActive(this, grid);
        if (gA.key.right) rightActive(this, grid);
      }
    };

    this.render = function() {
      // var collisionView = new gA.viewCollide.viewMap(grid.grid, grid.cTX, grid.cTY);
      // collisionView.render();
      // var spikeCollisionView = new gA.viewCollide.viewSpikeTouch(this, grid.grid, grid.cTX, grid.cTY);
      // spikeCollisionView.render();

      this.color = 'rgba('+this.R+','+this.G+','+this.B+','+this.A+')';
      gA.ctx.g.fillStyle = this.color;

      if(!this.alive) this.A -= 0.2; // Fade out if dead

      gA.ctx.g.fillRect(this.x, this.y, this.w, this.h);

      if(this.respawn) {
        this.spawnAni.update();
        this.spawnAni.draw();
      }

    };
  }

  /*COLLISION FUNCTIONS*/
  function windActive(obj, grid) {
    if(obj.grav < 0) {
      obj.action = 'wind';
      obj.windCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, 0, obj.grav);
    } else if(obj.grav >= 0) {
      obj.action = 'gravity';
      obj.windCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, 0, obj.grav);
    }

    if(obj.windCollide === 'wind') { /*WIND*/
      nearGround = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, 0, obj.grav+obj.h).tY;

      obj.grav = -obj.grav;
      if(-obj.grav > -obj.gravMax-2) obj.grav += 1;
      if(obj.grav !== 0) obj.grav = -obj.grav; // Prevent -0s

      if(obj.grav <= 1 && obj.grav >= -1 && nearGround === undefined && obj.windCollide === 'wind') obj.y += obj.grav+2;
      else if(obj.grav <= 3 && obj.grav > 1 && nearGround === undefined && obj.windCollide === 'wind') obj.y += obj.grav+2;
      else obj.y += obj.grav;

      obj.jump = false;
    } else {
      if(obj.grav < 0) { // Rising Collision
        if(obj.windCollide.tY !== undefined) {
          obj.y = ( obj.windCollide.tY + gA.tS );
          obj.grav = 0;
        }
        if(obj.windCollide === 'spike') death(obj);
      } else if (obj.grav >= 0) { // Falling Collision
        if(obj.windCollide.tY !== undefined) {
          obj.y = obj.windCollide.tY - obj.h;
          obj.grav = 0;
        }
        if(obj.windCollide === 'spike') death(obj);
      }
      obj.wind = false;
      obj.y += obj.grav; //Launch player on wind exit
    }
  }

  function jumpActive(obj, grid) {
    obj.action = 'jump';
    obj.jumpCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, 0, obj.vy+1);

    if(obj.jumpCollide === 'wind') { /*WIND*/
      obj.y -= 9; //Pull into wind block
      obj.wind = true;
    } else if(obj.jumpCollide) { /*BLOCK/SPIKE*/
      if(obj.jumpCollide.tY !== undefined) obj.y = obj.jumpCollide.tY + gA.tS;
      obj.vy = 0;
      obj.jump = false;
      if(obj.jumpCollide === 'spike') death(obj);
    } else { /*RISE/FALL*/
      if(obj.vy >= 0) { //At jump peak, use grav
        obj.jump = false;
      } else {
        if (obj.vy < obj.gravMax) obj.vy += 1;
        obj.y += obj.vy;
      }
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

    if(obj.gravCollide === 'wind') { /*WIND*/
      obj.wind = true;
    } else if(obj.gravCollide) { /*BLOCK/SPIKE*/
      if(obj.gravCollide === 'spike') death(obj);
      if(obj.grav >= 0) {
        if(obj.gravCollide.tY !== undefined) obj.y = obj.gravCollide.tY - obj.h;
      } else if(obj.grav < 0) {
        if(obj.gravCollide.tY !== undefined) obj.y = obj.gravCollide.tY + gA.tS;
      }
      obj.grav = obj.gravConst;
      obj.vy = obj.vyConst;
    } else { /*FALLING*/
      if (obj.grav < obj.gravMax) obj.grav += 1;
      obj.y += obj.grav;
    }
  }

  function leftActive(obj, grid) {
    obj.action = 'left';
    obj.leftCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, -obj.spd, 0);

    if(obj.leftCollide === 'wind') { /*WIND*/
      obj.jump = false;
      obj.wind = true;
    } else if(obj.leftCollide) { /*BLOCK/SPIKE*/
      obj.x += obj.spd;
      if(obj.leftCollide === 'spike') death(obj);
    }
    obj.x -= obj.spd; /*MOVE*/
  }

  function rightActive(obj, grid) {
    obj.action = 'right';
    obj.rightCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, obj.spd, 0);

    if(obj.rightCollide === 'wind') { /*WIND*/
      obj.jump = false;
      obj.wind = true;
    } else if(obj.rightCollide) { /*BLOCK/SPIKE*/
      obj.x -= obj.spd;
      if(obj.rightCollide === 'spike') death(obj);
    }
    obj.x += obj.spd; /*MOVE*/
  }

  // Spike collision
  function death(obj) {
    if(obj.alive)  {
      gA.deathNum += 1;
      gA.level.deaths += 1;

      gA.cam.state.shake = true;
      gA.cam.state.offset = obj.grav;

      obj.windCollide = '';
      obj.gravCollide = '';
      obj.leftCollide = '';
      obj.rightCollide = '';
      obj.jumpCollide = '';
      obj.respawn = false;

      for(var i=0; i<Math.floor(Math.random() * 16)+18; i+=1)
        new gA.blood.make(23);

      obj.alive = false;
    }
  }

  return {
    state: new playerInit()
  };

})();

