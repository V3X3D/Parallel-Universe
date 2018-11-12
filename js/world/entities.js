gA.entity = (function() {
  "use strict";

  /*NEXT LEVEL WARP*/
  var levelWarp = function(tX, tY, bColor, fColor) {
    this.rotation = 45;
    this.rotation2 = 0;
    this.rate = 2;
    this.s = gA.tS/4;
    this.s2 = gA.tS/2;

    this.delay = 0;

    this.x = tX+gA.tS/2;
    this.y = tY+gA.tS/2;

    this.logic = function() {
      if(this.rotation <= 360) this.rotation += this.rate;
      else this.rotation = 0;

      if(this.rotation2 <= 360) this.rotation2 += this.rate;
      else this.rotation2 = 0;
    };

    this.draw = function() {
      gA.ctx.g.lineWidth = 2;
      gA.ctx.g.setTransform(gA.scale, 0, 0, gA.scale, gA.scale*this.x-gA.cam.state.x, gA.scale*this.y-gA.cam.state.y);
      gA.ctx.g.rotate(this.rotation2*Math.PI/180);
      gA.ctx.g.fillStyle = fColor;
      gA.ctx.g.fillRect(-this.s2/2, -this.s2/2, this.s2, this.s2);
      gA.ctx.g.strokeStyle = bColor;
      gA.ctx.g.strokeRect(-this.s2/2, -this.s2/2, this.s2, this.s2);

      gA.ctx.g.lineWidth = 1;
      gA.ctx.g.setTransform(gA.scale, 0, 0, gA.scale, gA.scale*this.x-gA.cam.state.x, gA.scale*this.y-gA.cam.state.y);
      gA.ctx.g.rotate(this.rotation*Math.PI/180);
      gA.ctx.g.fillStyle = bColor;
      gA.ctx.g.fillRect(-this.s/2, -this.s/2, this.s, this.s);
      gA.ctx.g.strokeStyle = fColor;
      gA.ctx.g.strokeRect(-this.s/2, -this.s/2, this.s, this.s);

      gA.ctx.g.setTransform(gA.scale,0,0,gA.scale,0,0);
    };
  };

  /*WIND AND WIND GENERATOR*/
  var windGen = function(tX, tY, color) {
    var i;

    this.array = [];
    this.countingDown = false;
    this.color = 'rgb('+color.R+','+color.G+','+color.B+')';

    this.logic = function() {
      if(!this.countingDown) {
        this.countingDown = true;
        setTimeout(function() {
          this.array.push(new windBlowing(tX, tY+gA.tS/4, color));
          this.countingDown = false;
        }.bind(this), Math.floor(Math.random()*200)+40);
      }

      for(i=0; i<this.array.length; i+=1) {
        this.array[i].logic();
        if(this.array[i].A <= 0) this.array.splice(i, 1);
      }
    };
    this.draw = function() {
      for(i=0; i<this.array.length; i+=1) this.array[i].draw();
    };
  };

  var windBlowing = function(tX, tY, color) {
    this.rotation = Math.floor(Math.random()*360);
    if(color === gA.bgClr) {
      this.R = gA.fgClr.R;
      this.G = gA.fgClr.G;
      this.B = gA.fgClr.B;
    } else {
      this.R = gA.bgClr.R;
      this.G = gA.bgClr.G;
      this.B = gA.bgClr.B;
    }
    this.A = 1;
    this.color = 'rgba('+this.R+','+this.G+','+this.B+','+this.A+')';
    this.plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    this.xShift = Math.floor(Math.random()*9) * this.plusOrMinus;
    this.spd = Math.floor(Math.random()*3)+6;
    this.size = Math.floor(Math.random()*3)+gA.tS/3;
    this.x = tX+this.xShift;
    this.y = tY;

    this.logic = function() {
      if(this.rotation <= 360) this.rotation += 2;
      else this.rotation = 0;
      this.y -= this.spd;
      this.A -= 0.04;
      this.color = 'rgba('+this.R+','+this.G+','+this.B+','+this.A+')';
    };

    this.draw = function() {
      gA.ctx.g.setTransform(gA.scale, 0, 0, gA.scale, gA.scale*this.x-gA.cam.state.x+gA.tS/2, gA.scale*this.y-gA.cam.state.y+gA.tS/2);
      gA.ctx.g.rotate(this.rotation*Math.PI/180);
      gA.ctx.g.fillStyle = this.color;
      gA.ctx.g.fillRect(-gA.tS/4, -gA.tS/4, this.size, this.size);

      gA.ctx.g.setTransform(gA.scale,0,0,gA.scale,0,0);
      // gCtx.scale(gA.scale,gA.scale);
    };
  };

  return {
    levelWarp: levelWarp,
    windGen: windGen
  };
})();

