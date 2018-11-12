gA.animations = (function() {
  "use strict";

  var focusTimer, i;

  function focus() {
    this.s = 8;
    this.x = (gA.player.state.x+gA.tS/2)-this.s/2;
    this.y = (gA.player.state.y+gA.tS/2)-this.s/2;
    this.A = 1;
    this.r = 96;
    this.theta1 = 0;
    this.theta2 = 22.5;

    var timer = false;

    this.invert = Math.random() < 0.5 ? -1 : 1;

    this.particles = [];
    for(i=0; i<16; i+=1) this.particles.push({ x: 0, y: 0 });

    clearTimeout(focusTimer);

    function updateParticle(i, theta) {
      this.particles[i].x = this.x + this.r * Math.cos(Math.PI * theta / 180.0);
      this.particles[i].y = this.y + this.r * Math.sin(Math.PI * theta / 180.0);
      this.theta1 += 45;
      this.theta2 += 45;
      this.x = ( gA.player.state.x+gA.tS/2 )-this.s/2;
      this.y = ( gA.player.state.y+gA.tS/2 )-this.s/2;

      this.invert = -this.invert;
      this.x+=Math.floor(Math.random()*6)*this.invert;
      this.invert = Math.random() < 0.5 ? -1 : 1;
      this.invert = -this.invert;
      this.y+=Math.floor(Math.random()*6)*this.invert;
    }

    this.update = function() {
      for(i=0; i<this.particles.length; i+=1) {
        if(i <= 7) updateParticle.call(this, i, this.theta1);
        else if (i >= 8) updateParticle.call(this, i, this.theta2);
      }
      this.r -= 8;
      if(this.r <= 0) this.r = 0;

      if(!timer) {
        timer = true;
        focusTimer = setTimeout(function() {
          this.particles = [];
          gA.player.state.focused = false;
          gA.player.state.focusAni = undefined;
          timer = false;
        }.bind(this), 3500);
      }
      this.A -= 0.0045; //Set a value to match the pace of timeOut timer.
    };

    this.draw = function() {
      if(gA.player.state.alive) {
        this.color = 'rgba('+gA.fgClr.R+','+gA.fgClr.G+','+gA.fgClr.B+','+this.A+')';
        this.color2 = 'rgba('+gA.bgClr.R+','+gA.bgClr.G+','+gA.bgClr.B+','+this.A+')';
        for(i=0; i<this.particles.length; i+=1) {
          if(i <= 7) gA.ctx.g.fillStyle = this.color;
          else gA.ctx.g.fillStyle = this.color2;
          gA.ctx.g.fillRect(this.particles[i].x, this.particles[i].y, this.s, this.s);
        }
      } else {
        this.particles = [];
        clearTimeout(focusTimer);
        gA.player.state.focused = false;
        gA.player.state.focusAni = undefined;
      }
    };
  }

  function respawn() {
    this.s = 8;
    this.x = (gA.player.state.x+gA.tS/2)-this.s/2;
    this.y = (gA.player.state.y+gA.tS/2)-this.s/2;
    this.A = 1;
    this.r = 96;
    this.theta1 = 0;
    this.theta2 = 22.5;

    this.particles = [];
    for(i=0; i<16; i+=1) this.particles.push({ x: 0, y: 0 });

    function updateParticle(i, t) {
      this.particles[i].x = this.x + this.r * Math.cos(Math.PI * t / 180.0);
      this.particles[i].y = this.y + this.r * Math.sin(Math.PI * t / 180.0);
      this.theta1 += 45;
      this.theta2 += 45;
      this.x = ( gA.player.state.x+gA.tS/2 )-this.s/2;
      this.y = ( gA.player.state.y+gA.tS/2 )-this.s/2;
    }

    this.update = function() {
      if(gA.player.state.A < 1) {
        gA.player.state.locked = true;
        if(gA.player.state.A < 0) gA.player.state.A = 0;
        gA.player.state.A += 0.1;
      } else {
        gA.player.state.locked = false;
        for(i=0; i<this.particles.length; i+=1) {
          if(i <= 7) updateParticle.call(this, i, this.theta1);
          else if (i >= 8) updateParticle.call(this, i, this.theta2);
        }
        this.r -= 4.5;
        if(this.r <= 0) this.r = 0;
        if(this.A > 0) this.A -= 0.025;
        if(this.A < 0) gA.player.state.spawn = false;
      }
    };

    this.draw = function() {
      if(!gA.player.state.locked) {
        this.color = 'rgba('+gA.fgClr.R+','+gA.fgClr.G+','+gA.fgClr.B+','+this.A+')';
        this.color2 = 'rgba('+gA.bgClr.R+','+gA.bgClr.G+','+gA.bgClr.B+','+this.A+')';
        for(i=0; i<this.particles.length; i+=1) {
          if(i <= 7) gA.ctx.g.fillStyle = this.color;
          else gA.ctx.g.fillStyle = this.color2;

          gA.ctx.g.fillRect(this.particles[i].x, this.particles[i].y, this.s, this.s);
        }
      }
    };
  }

  return { focus, respawn };
})();

