gA.player = (function() {
  "use strict";

  function playerInit() {
    this.x = 224;
    this.y = 16;
    this.w = gA.tS;
    this.h = gA.tS;
    this.spd = 4;
    this.jump = false;
    this.gravConst = 8;
    this.grav = this.gravConst;
    this.gravMax = 14;
    this.vyConst = -12;
    this.vy = this.vyConst;
    this.color = '#0f0';

    this.gravCollide;

    this.update = function() {
      //Basics of Jumping (if called).
      if (this.jump === true) {
        gA.collision.checkAround(this.x, this.y+this.vy+1, this.w, this.h, 0, 'jump');

        // Bring vy back down so you don't go flying off the screen
        // Whole numbers help keep away collision bugs
        if (this.vy < this.gravMax) this.vy += 1;
        this.y += this.vy;
      }

      //Rounding was the key to fix lots of collision problems when using gravity/jumping.
      //It seems JS doesn't like crazy decimals (who would have thought).
      if (this.jump === false) {
        this.gravCollide = gA.collision.checkAround(this.x, this.y+this.grav, this.w, this.h, this.grav, 'gravity');

        if (this.gravCollide) {
          this.y += this.grav;
          this.grav = this.gravConst;
        } else {
          this.jump = false;
          if (this.grav > this.gravMax) {
            this.y += Math.round( this.grav );
          } else {
            this.y += Math.round( this.grav *= 1.04 );
          }
        }

      }

      //Jumping Call
      if (gA.key.up === true && this.jump === false && gA.noHold.up === false) {
        //noHold makes you release keys before they get called again
        //in this case it is prevent holding the jump key.
        gA.noHold.up = true;
        if (this.gravCollide === true) {
          this.vy = this.vyConst;
          this.jump = true;
        }
      }

      //Movement Left and Right
      if (gA.key.left === true) {
        gA.collision.checkAround(this.x-this.spd, this.y, this.w, this.h, this.spd, 'left');

        this.x -= this.spd;
      }
      if (gA.key.right === true) {
        gA.collision.checkAround(this.x+this.spd, this.y, this.w, this.h, this.spd, 'right');

        this.x += this.spd;
      }
    };

    this.render = function() {
      gA.ctx.g.fillStyle = this.color;
      gA.ctx.g.fillRect(this.x, this.y, this.w, this.h);
    };
  }

  return {
    state: new playerInit()
  };

})();

