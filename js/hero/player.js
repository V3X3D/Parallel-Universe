gA.player = (function() {
  "use strict";

  var nearGround, i, grid;
  function playerInit() {
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

    if(!gA.lvl.cur.player.color) {
      this.R = gA.fgClr.R;
      this.G = gA.fgClr.G;
      this.B = gA.fgClr.B;
    } else {
      this.R = gA.lvl.cur.player.color[0];
      this.G = gA.lvl.cur.player.color[1];
      this.B = gA.lvl.cur.player.color[2];
    }
    this.A = 1;

    this.locked = false;
    this.spawn = false;
    this.spawnAni;

    this.focused = false;
    this.focusAni;

    this.end = false;

    this.update = function() {

      if(this.end) death(this);
      if(!this.alive) {gA.hud.state.pace = 1000; gA.heart.stop();}
      if(this.alive && !gA.transition && !this.locked) {
        grid = new gA.collision.map(this.x, this.y, this.w, this.h);

        if(!gA.heart.state()) gA.heart.start();
        if(gA.hud.state.time <= 0) death(this);

        //Focus
        if(this.focused) {
          gA.hud.state.pace = 450;
          gA.heart.pace(1.75);
          if(this.focusAni === undefined) this.focusAni = new gA.animations.focus();
        } else {
          gA.hud.state.pace = 1000;
          gA.heart.pace(1);
        }

        //Jump, Gravity, and Wind
        if(this.wind) windActive(this, grid);
        else if(this.jump) jumpActive(this, grid);
        else gravActive(this, grid);

        if(gA.key.up && !this.jump && !gA.noHold.up) {
          gA.noHold.up = true;
          if(this.gravCollide.tY !== undefined) this.jump = true; // makes sure you are on the ground
        }
        if(gA.key.down && !gA.noHold.down && this.focusAni === undefined && !this.spawn) {
          gA.noHold.down = true;
          this.focused = true;
          // if(this.focused){gA.sound.focus.currentTime = 0; gA.sound.focus.play();}
          if(this.focused){gA.sound.focus.play();}
        }
        //Do not put these above jump and gravity or spike collision is not perfect (or not)
        if(gA.key.left && !gA.noHold.left) leftActive(this, grid);
        if(gA.key.right && !gA.noHold.right) rightActive(this, grid);
      }
    };

    this.render = function() {
      this.color = 'rgba('+this.R+','+this.G+','+this.B+','+this.A+')';
      gA.ctx.g.fillStyle = this.color;

      if(!this.alive) this.A -= 0.2;
      gA.ctx.g.fillRect(this.x, this.y, this.w, this.h);

      if(this.spawn) {this.spawnAni.update(); this.spawnAni.draw();}
      if(this.focused && this.focusAni !== undefined) { this.focusAni.update(); this.focusAni.draw(); }
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

      if(obj.grav <= 1 && obj.grav >= -1 && nearGround === undefined) obj.y += obj.grav+2;
      else if(obj.grav <= 3 && obj.grav > 1 && nearGround === undefined) obj.y += obj.grav+2;
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
        // gA.sound.jump.currentTime = 0;
        gA.sound.jump.play();
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

    if(obj.gravCollide === 'wind') {
      obj.wind = true;
    } else if(obj.gravCollide) {
      if(obj.gravCollide === 'spike') death(obj);
      if(obj.grav >= 0 && obj.gravCollide.tY !== undefined) obj.y = obj.gravCollide.tY - obj.h;
      else if(obj.grav < 0 && obj.gravCollide.tY !== undefined) obj.y = obj.gravCollide.tY + gA.tS;

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

    if(obj.leftCollide === 'wind') {
      obj.jump = false;
      obj.wind = true;
    } else if(obj.leftCollide) {
      obj.x += obj.spd;
      if(obj.leftCollide === 'spike') death(obj);
    }
    obj.x -= obj.spd;
  }

  function rightActive(obj, grid) {
    obj.action = 'right';
    obj.rightCollide = gA.collision.check(obj, grid.grid, grid.cTX, grid.cTY, obj.spd, 0);

    if(obj.rightCollide === 'wind') {
      obj.jump = false;
      obj.wind = true;
    } else if(obj.rightCollide) {
      obj.x -= obj.spd;
      if(obj.rightCollide === 'spike') death(obj);
    }
    obj.x += obj.spd;
  }

  // Spike collision
  function death(obj) {
    if(obj.alive) {
      // gA.sound.death.currentTime = 0;
      gA.sound.death.play();
      if(gA.hud.state.time === 0) {
        // gA.sound.flatline.currentTime = 0;
        gA.sound.flatline.play();
      }
      gA.totalDeaths += 1;
      gA.lvl.cur.curDeaths += 1;
      gA.lvl.cur.totalDeaths += 1;

      if(gA.lvl.cur.curDeaths > gA.lvl.cur.maxDeaths || isNaN(gA.lvl.cur.maxDeaths))
        gA.lvl.cur.maxDeaths = gA.lvl.cur.curDeaths;

      gA.cam.state.shake = true;
      gA.cam.state.offset = obj.grav;

      obj.windCollide = '';
      obj.gravCollide = '';
      obj.leftCollide = '';
      obj.rightCollide = '';
      obj.jumpCollide = '';
      obj.spawn = false;

      for(i=0; i<Math.floor(Math.random() * 16)+18; i+=1)
        new gA.blood.make(23);

      obj.alive = false;
    }
  }

  return { state: new playerInit() };
})();

