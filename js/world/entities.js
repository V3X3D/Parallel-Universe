gA.entity = (function() {
  "use strict";

  var levelWarp = function(tX, tY, bColor, fColor) {
    this.rotation = 45;
    this.rotation2 = 0;
    this.rate = 2;
    this.s = gA.tS/2;

    this.update = function() {
      if(this.rotation <= 360) this.rotation += this.rate; 
      else this.rotation = 0;

      if(this.s > 0 && gA.transition === true) {
        this.rate = 4;
        this.s += 24; 
        if(tX < gA.cW/2) tX += 10; 
        else if(tX > gA.cW/2) tX -= 10; 
        if(tY < gA.cH/2) tY += 8;
        else if(tY > gA.cH/2) tY -= 8;
      }
      if (this.s > 1024) {
        gA.transition = false;
        gA.nextLevel();
      }

      if(this.rotation2 <= 360) this.rotation2 += this.rate;
      else this.rotation2 = 0;
    };

    this.draw = function() {
      gA.ctx.g.setTransform(1, 0, 0, 1, tX+gA.tS/2, tY+gA.tS/2);
      gA.ctx.g.rotate(this.rotation*Math.PI/180);
      gA.ctx.g.fillStyle = bColor;
      gA.ctx.g.fillRect(-gA.tS/4, -gA.tS/4, gA.tS/2, gA.tS/2);

      gA.ctx.g.setTransform(1, 0, 0, 1, tX+gA.tS/2, tY+gA.tS/2);
      gA.ctx.g.rotate(this.rotation2*Math.PI/180);
      gA.ctx.g.fillStyle = fColor;
      gA.ctx.g.fillRect(0-this.s/2, 0-this.s/2, this.s, this.s);

      gA.ctx.g.setTransform(1,0,0,1,0,0);
    };
  };

  var windGenerator = function(tX, tY, color) {
    var i;

    this.array = [];
    this.countingDown = false;
    this.color = '#fff';

    if(color === 'white') {
      this.color = '#000';
    }

    this.update = function() {
      if(this.countingDown === false) {
        this.countingDown = true;
        setTimeout(function() {
          this.array.push(new windBlowing(tX, tY+gA.tS/4, color));
          this.countingDown = false;
        }.bind(this), Math.floor(Math.random()*200)+40);
      }

      for(i = 0; i < this.array.length; i+=1) {
        this.array[i].update();
        if(this.array[i].A <= 0) this.array.splice(i, 1);
      }
    };
    this.draw = function() {
      gA.ctx.m.fillStyle = this.color;
      gA.ctx.m.fillRect(tX, tY+gA.tS-gA.tS/8, gA.tS, gA.tS/8);
      for(i = 0; i < this.array.length; i+=1) this.array[i].draw();
    };
  };

  var windBlowing = function(tX, tY, color) {
    this.rotation = Math.floor(Math.random()*360);
    this.A = 1;
    this.color = 'rgba(255,255,255,'+this.A+')';
    this.plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    this.xShift = Math.floor(Math.random()*9) * this.plusOrMinus;
    this.spd = Math.floor(Math.random()*3)+6;
    this.size = Math.floor(Math.random()*3)+gA.tS/3;
    this.x = tX+this.xShift;
    this.y = tY;

    this.update = function() {
      if(this.rotation <= 360) this.rotation += 2;
      else this.rotation = 0;
      this.y -= this.spd;
      this.A -= 0.04;
      if(color === 'white') {
        this.color = 'rgba(255,255,255,'+this.A+')';
      } else {
        this.color = 'rgba(0,0,0,'+this.A+')';
      }
    };

    this.draw = function() {
      gA.ctx.g.setTransform(1, 0, 0, 1, this.x+gA.tS/2, this.y+gA.tS/2);
      gA.ctx.g.rotate(this.rotation*Math.PI/180);
      gA.ctx.g.fillStyle = this.color;
      gA.ctx.g.fillRect(-gA.tS/4, -gA.tS/4, this.size, this.size);

      gA.ctx.g.setTransform(1,0,0,1,0,0);
    };
  };

  return {
    levelWarp: levelWarp,
    windGenerator: windGenerator
  };

})();

