gA.viewCollide = (function() {
  "use strict";

  /* This file is a mess and doesn't pull from others,
    that is because it is simply for development shit; thus
    it wasn't worth the time to make it nice. */

  function smartMapInit(map, cTX, cTY) {
    this.tX = 0;
    this.tY = 0;

    this.render = function() {
      for(var y=0; y < map.length; y+=1) {
        for(var x=0; x < map[y].length; x+=1) {
          this.tX = (x * gA.tS) + (cTX-1)*gA.tS;
          this.tY = (y * gA.tS) + (cTY-1)*gA.tS;

          if (map[y][x] === 1) {
            gA.ctx.g.fillStyle = '#fac';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          } else if (map[y][x] === 2) {
            gA.ctx.g.fillStyle = '#acf';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          } else if (map[y][x] === 3) {
            gA.ctx.g.fillStyle = '#ff0';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
            gA.ctx.g.beginPath();
            gA.ctx.g.moveTo(this.tX+gA.tS/2, this.tY);
            gA.ctx.g.lineTo(this.tX, this.tY+gA.tS);
            gA.ctx.g.lineTo(this.tX+gA.tS, this.tY+gA.tS);
            gA.ctx.g.closePath();
            gA.ctx.g.fillStyle = '#f66';
            gA.ctx.g.fill();
          } else if (map[y][x] === 4) {
            gA.ctx.g.fillStyle = '#ff0';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
            gA.ctx.g.beginPath();
            gA.ctx.g.moveTo(this.tX+gA.tS/2, this.tY);
            gA.ctx.g.lineTo(this.tX, this.tY+gA.tS);
            gA.ctx.g.lineTo(this.tX+gA.tS, this.tY+gA.tS);
            gA.ctx.g.closePath();
            gA.ctx.g.fillStyle = '#66f';
            gA.ctx.g.fill();
          } else if (map[y][x] === 5) {
            gA.ctx.g.fillStyle = '#ff0';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
            gA.ctx.g.beginPath();
            gA.ctx.g.moveTo(this.tX, this.tY);
            gA.ctx.g.lineTo(this.tX+gA.tS/2, this.tY+gA.tS);
            gA.ctx.g.lineTo(this.tX+gA.tS, this.tY);
            gA.ctx.g.closePath();
            gA.ctx.g.fillStyle = '#f66';
            gA.ctx.g.fill();
          } else if (map[y][x] === 6) {
            gA.ctx.g.fillStyle = '#ff0';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
            gA.ctx.g.beginPath();
            gA.ctx.g.moveTo(this.tX, this.tY);
            gA.ctx.g.lineTo(this.tX+gA.tS/2, this.tY+gA.tS);
            gA.ctx.g.lineTo(this.tX+gA.tS, this.tY);
            gA.ctx.g.closePath();
            gA.ctx.g.fillStyle = '#66f';
            gA.ctx.g.fill();
          } else if (map[y][x] === 0) {
            gA.ctx.g.fillStyle = '#ff0';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          }

        }
      }
    };
  }

  function spikeCollision(obj, map, cTX, cTY, xDif, yDif) {

    function rectRect(x1, y1, x2, y2, tSw, tSh, tS2w, tS2h) {
      var tSize2w = tS2w || tSw,
        tSize2h = tS2h || tSh;

      if(x1+tSw > x2 && x1 < x2+tSize2w && y1+tSh > y2 && y1 < y2+tSize2h) {
        return true;
      }
      return false;
    }

    //Line Segment Collision Test Vars
    var triRight, triLeft, triBottom, pTop, pLeft, pRight, pBottom;
    var triTopL, triTopR, triBottomM, triBottomL, triBottomR, triTopM;
    var i;

    var triangleLines = [];
    var playerLines = [];

    this.render = function() {

      for(var y=0; y < map.length; y+=1) {
        for(var x=0; x < map[y].length; x+=1) {

          var tX = (x * gA.tS) + (cTX-1)*gA.tS;
          var tY = (y * gA.tS) + (cTY-1)*gA.tS;

          /* Running two rectRect collision checks, this is because the x needs to vary
             this funciton is not being called with an xDif/yDif */
          if (rectRect(obj.x+1, obj.y, tX, tY, obj.w, obj.h, gA.tS, gA.tS)
            || rectRect(obj.x-1, obj.y, tX, tY, obj.w, obj.h, gA.tS, gA.tS)) {

            //Spike checks
            if (map[y][x] === 3 || map[y][x] === 4) {

              triBottomL = [tX, tY+gA.tS];
              triBottomR = [tX+gA.tS, tY+gA.tS];
              triTopM = [tX+gA.tS/2, tY];

              triLeft = new gA.segment.make2(triBottomL[0], triBottomL[1], gA.tS/2, -gA.tS);
              triRight = new gA.segment.make2(triBottomR[0], triBottomR[1], -gA.tS/2, -gA.tS);

              pLeft = new gA.segment.make2(obj.x, obj.y, 0, obj.h);
              pRight = new gA.segment.make2(obj.x+obj.w, obj.y, 0, obj.h);
              pBottom = new gA.segment.make2(obj.x, obj.y+obj.h, obj.w, 0);

              triangleLines = playerLines = [];

              triangleLines.push(triLeft, triRight);
              playerLines.push(pLeft, pRight, pBottom);
            } else if (map[y][x] === 5 || map[y][x] === 6) {

              triTopL = [tX, tY];
              triTopR = [tX+gA.tS, tY];
              triBottomM = [tX+gA.tS/2, tY+gA.tS];

              triLeft = new gA.segment.make2(triTopL[0], triTopL[1], gA.tS/2, gA.tS);
              triRight = new gA.segment.make2(triTopR[0], triTopR[1], -gA.tS/2, gA.tS);

              pLeft = new gA.segment.make2(obj.x, obj.y, 0, obj.h);
              pRight = new gA.segment.make2(obj.x+obj.w, obj.y, 0, obj.h);
              pTop = new gA.segment.make2(obj.x, obj.y, obj.w, 0);

              triangleLines = playerLines = [];

              triangleLines.push(triLeft, triRight);
              playerLines.push(pLeft, pRight, pTop);
            }

            //Spike half checks
            if (map[y][x] === 7 || map[y][x] === 8) {

              triBottomL = [( tX )+gA.tS/4, tY+gA.tS];
              triBottomR = [( tX+gA.tS )-gA.tS/4, tY+gA.tS];
              triTopM = [tX+gA.tS/2, tY+gA.tS/2];

              triLeft = new gA.segment.make2(triBottomL[0], triBottomL[1], gA.tS/4, -gA.tS/2);
              triRight = new gA.segment.make2(triBottomR[0], triBottomR[1], -gA.tS/4, -gA.tS/2);

              pLeft = new gA.segment.make2(obj.x, obj.y, 0, obj.h);
              pRight = new gA.segment.make2(obj.x+obj.w, obj.y, 0, obj.h);
              pBottom = new gA.segment.make2(obj.x, obj.y+obj.h, obj.w, 0);

              triangleLines = playerLines = [];

              triangleLines.push(triLeft, triRight);
              playerLines.push(pLeft, pRight, pBottom);
            } else if (map[y][x] === 9 || map[y][x] === 10) { //Half spike facing down

              triTopL = [( tX )+gA.tS/4, tY];
              triTopR = [( tX+gA.tS )-gA.tS/4, tY];
              triBottomM = [tX+gA.tS/2, tY+gA.tS/2];

              triLeft = new gA.segment.make2(triTopL[0], triTopL[1], gA.tS/4, gA.tS/2);
              triRight = new gA.segment.make2(triTopR[0], triTopR[1], -gA.tS/4, gA.tS/2);

              pLeft = new gA.segment.make2(obj.x, obj.y, 0, obj.h);
              pRight = new gA.segment.make2(obj.x+obj.w, obj.y, 0, obj.h);
              pTop = new gA.segment.make2(obj.x, obj.y, obj.w, 0);

              triangleLines = playerLines = [];

              triangleLines.push(triLeft, triRight);
              playerLines.push(pLeft, pRight, pTop);
            }


          }
        }
      }

      for(i = 0; i < triangleLines.length; i+=1) triangleLines[i].draw(1, 'red');
      for(i = 0; i < playerLines.length; i+=1) playerLines[i].draw(1, 'red');
    };
  }

  return {
    viewMap: smartMapInit, // For showing highlights of potential collisions
    viewSpikeTouch: spikeCollision // Shows the lines in a collision
  };

})();
