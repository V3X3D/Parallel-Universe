(function() {
  "use strict";

  function sequence1(spd, dir, offset) { //Bottom to Top
    /*Info*/
    //Dir can be 'U' or 'D'.
    //Offset, is true or false

    this.x = 0;
    this.y = gA.cH;
    this.w = gA.cW;
    this.h = gA.cH;

    if(!offset) this.y -= gA.cH;

    this.logic = function() {
      if(dir === 'D' || dir === undefined) {
        this.y += spd || 2;
        if(this.y >= gA.cH) this.y = -gA.cH;
      } else {
        this.y -= spd || 2;
        if(this.y+this.h <= 0) this.y = gA.cH;
      }
    };
    this.draw = function() {gA.ctx.b.fillRect(this.x, this.y, this.w, this.h);};
  }

  function sequence2(spd, side, dir, offset) {
    /*Info*/
    //Side can be 'T' or 'B'.
    //Dir can be 'L' or 'R'.
    //Offset, is true or false

    this.x = 0;
    this.y = gA.cH/2;
    this.w = gA.cW;
    this.h = gA.cH/2;

    if(side === 'T' || side === undefined) this.y = 0;
    else this.y = gA.cH/2;

    if(!offset) this.x += gA.cW;

    this.logic = function() {
      if(dir === 'R' || dir === undefined) {
        this.x += spd || 2;
        if(this.x >= gA.cW) this.x = -gA.cW;
      } else {
        this.x -= spd || 2;
        if(this.x+this.w <= 0) this.x = gA.cW;
      }
    };
    this.draw = function() {gA.ctx.b.fillRect(this.x, this.y, this.w, this.h);};
  }
  function sequence3(spd, side, dir, offset) { //Half top to bottom
    /*Info*/
    //Side can be 'L' or 'R'.
    //Dir can be 'U' or 'D'.
    //Offset, is true or false

    this.x = gA.cW/2;
    this.y = -gA.cH;
    this.w = gA.cW/2;
    this.h = gA.cH;

    if(side === 'L' || side === undefined) this.x = 0;
    else this.x = gA.cW/2;

    if(!offset) this.y += gA.cH;

    this.logic = function() {
      if(dir === 'D' || dir === undefined) {
        this.y += spd || 2;
        if(this.y >= gA.cH) this.y = -gA.cH;
      } else {
        this.y -= spd || 2;
        if(this.y+this.h <= 0) this.y = gA.cH;
      }
    };

    this.draw = function() {gA.ctx.b.fillRect(this.x, this.y, this.w, this.h);};
  }
  function sequence4(spd, corner, reverse) { //Half top to bottom
    this.x = 0;
    this.y = 0;
    this.w = gA.cW/2;
    this.h = gA.cH/2;
    this.vy = 0;
    this.vx = 0;

      if(corner === 'TL' || corner === undefined) {
        this.vx = spd;
      } else if(corner === 'TR') {
        this.x = gA.cW/2;
        this.vy = spd;
      } else if(corner === 'BR') {
        this.x = gA.cW/2;
        this.y = gA.cH/2;
        this.vx = -spd;
      } else if(corner === 'BL') {
        this.y = gA.cH/2;
        this.vy = -spd;
      }

    this.logic = function() {
      if(this.x < 0) {
        this.x += spd;
        this.vy = -spd;
        this.vx = 0;
      } else if(this.y < 0) {
        this.y += spd;
        this.vx = spd;
        this.vy = 0;
      } else if(this.x+this.w > gA.cW) {
        this.x -= spd;
        this.vy = spd;
        this.vx = 0;
      } else if(this.y+this.h > gA.cH) {
        this.y -= spd;
        this.vx = -spd;
        this.vy = 0;
      }

      if(reverse) {
        this.x -= this.vx;
        this.y -= this.vy;
      } else {
        this.x += this.vx;
        this.y += this.vy;
      }
    };

    this.draw = function() {gA.ctx.b.fillRect(this.x, this.y, this.w, this.h);};
  }

  gA.bgSequence = {
    1: sequence1,
    2: sequence2,
    3: sequence3,
    4: sequence4
  };

})();
