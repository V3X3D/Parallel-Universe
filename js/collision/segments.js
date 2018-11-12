gA.segment = (function() {
  "use strict";

  var intersectionArray = [];

  function make(x, y, vecx, vecy) {
    this.x = x;
    this.y = y;
    this.vecx = vecx;
    this.vecy = vecy;

    var intersectX;
    var intersectY;

    function same_sign(a, b) {return a*b >= 0;}

    //This is a dev function (remove it in the end)
    this.draw = function(width, color) {
      gA.ctx.g.beginPath();
      gA.ctx.g.lineWidth = width;
      gA.ctx.g.moveTo(this.x, this.y);
      gA.ctx.g.lineTo(this.x+this.vecx, this.y+this.vecy);
      gA.ctx.g.strokeStyle = color;
      gA.ctx.g.stroke();
    };

    this.intersect = function(segment) {
      //line a
      var x1 = this.x;
      var y1 = this.y;
      var x2 = this.x + this.vecx;
      var y2 = this.y + this.vecy;

      //line b
      var x3 = segment.x;
      var y3 = segment.y;
      var x4 = segment.x + segment.vecx;
      var y4 = segment.y + segment.vecy;

      var a1, a2, b1, b2, c1, c2;
      var r1, r2, r3, r4;
      var denom, offset, num;

      a1 = y2 - y1;
      b1 = x1 - x2;
      c1 = (x2 * y1) - (x1 * y2);

      r3 = (a1 * x3) + (b1 * y3) + c1;
      r4 = (a1 * x4) + (b1 * y4) + c1;
      if (r3 !== 0 && r4 !== 0 && same_sign(r3,r4)) return false;

      a2 = y4 - y3;
      b2 = x3 - x4;
      c2 = (x4 * y3) - (x3 * y4);

      r1 = (a2 * x1) + (b2 * y1) + c2;
      r2 = (a2 * x2) + (b2 * y2) + c2;
      if (r1 !== 0 && r2 !== 0 && same_sign(r1,r2)) return false;

      denom = (a1 * b2) - (a2 * b1);

      if(denom < 0) offset = -denom / 2;
      else offset = denom / 2;

      num = (b1 * c2) - (b2 * c1);
      if (num < 0 ) intersectX = (num - offset) / denom;
      else intersectX = (num + offset) / denom;

      num = (a2 * c1) - (a1 * c2);
      if (num < 0) intersectY = (num - offset ) / denom;
      else intersectY = (num + offset) / denom;

      intersectionArray.push(1);
      return true;
    };
  }

  return {
    make: make,
    intersectionArray: intersectionArray
  };

})();
