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
    this.draw = function() {
      gA.ctx.b.fillRect(this.x, this.y, this.w, this.h);
    };
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
    this.draw = function() {
      gA.ctx.b.fillRect(this.x, this.y, this.w, this.h);
    };
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

    this.draw = function() {
      gA.ctx.b.fillRect(this.x, this.y, this.w, this.h);
    };
  }

  gA.bgSequence = {
    1: sequence1,
    2: sequence2,
    3: sequence3
  };

})();
