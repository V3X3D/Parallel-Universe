gA.collision = (function() {
  "use strict";

  //Line Segment Collision Test Vars
  var triRight, triLeft, triBottom, pTop, pLeft, pRight, pBottom;
  var triTopL, triTopR, triBottomM, triBottomL, triBottomR, triTopM;

  function rectRect(x1, y1, x2, y2, tSw, tSh, tS2w, tS2h) {
    var tSize2w = tS2w || tSw,
      tSize2h = tS2h || tSh;

    if(x1+tSw > x2 && x1 < x2+tSize2w && y1+tSh > y2 && y1 < y2+tSize2h) {
      return true;
    }
    return false;
  }

  //Checks around player (better way of doing collision detection)
  function smartMove(obj, map, cTX, cTY, xDif, yDif) {

    for(var y=0; y < map.length; y+=1) {
      for(var x=0; x < map[y].length; x+=1) {

        var tX = (x * gA.tS) + (cTX-1)*gA.tS;
        var tY = (y * gA.tS) + (cTY-1)*gA.tS;

        var xPos = obj.x+xDif;
        var yPos = obj.y+yDif;

        //Block checks
        if (rectRect(xPos, yPos, tX, tY, obj.w, obj.h, gA.tS, gA.tS)) {
          if (map[y][x] === 1 || map[y][x] === 2) {

            if (obj.action === 'gravity' && yPos+obj.h > tY) {
              return { tY: tY };
            }

            return true;
          }

          //Spike full checks
          if (map[y][x] === 3 || map[y][x] === 4) { //Spike facing up

            triBottomL = [tX, tY+gA.tS];
            triBottomR = [tX+gA.tS, tY+gA.tS];
            triTopM = [tX+gA.tS/2, tY];

            triLeft = new gA.segment.make2(triBottomL[0], triBottomL[1], gA.tS/2, -gA.tS);
            triRight = new gA.segment.make2(triBottomR[0], triBottomR[1], -gA.tS/2, -gA.tS);

            pLeft = new gA.segment.make2(obj.x, obj.y, 0, obj.h);
            pRight = new gA.segment.make2(obj.x+obj.w, obj.y, 0, obj.h);
            pBottom = new gA.segment.make2(obj.x, obj.y+obj.h, obj.w, 0);

            if(triRight.intersect(pLeft) || triLeft.intersect(pRight) || triLeft.intersect(pBottom)) {
              return 'spike';
            }
          } else if (map[y][x] === 5 || map[y][x] === 6) { //Spike facing down

            triTopL = [tX, tY];
            triTopR = [tX+gA.tS, tY];
            triBottomM = [tX+gA.tS/2, tY+gA.tS];

            triLeft = new gA.segment.make2(triTopL[0], triTopL[1], gA.tS/2, gA.tS);
            triRight = new gA.segment.make2(triTopR[0], triTopR[1], -gA.tS/2, gA.tS);

            pLeft = new gA.segment.make2(obj.x, obj.y, 0, obj.h);
            pRight = new gA.segment.make2(obj.x+obj.w, obj.y, 0, obj.h);
            pTop = new gA.segment.make2(obj.x, obj.y, obj.w, 0);

            if(triRight.intersect(pLeft) || triLeft.intersect(pRight) || triLeft.intersect(pTop)) {
              return 'spike';
            }
          }

          //Spike half checks
          if (map[y][x] === 7 || map[y][x] === 8) { //Half spike facing up

            triBottomL = [( tX )+gA.tS/4, tY+gA.tS];
            triBottomR = [( tX+gA.tS )-gA.tS/4, tY+gA.tS];
            triTopM = [tX+gA.tS/2, tY+gA.tS/2];

            triLeft = new gA.segment.make2(triBottomL[0], triBottomL[1], gA.tS/4, -gA.tS/2);
            triRight = new gA.segment.make2(triBottomR[0], triBottomR[1], -gA.tS/4, -gA.tS/2);

            pLeft = new gA.segment.make2(obj.x, obj.y, 0, obj.h);
            pRight = new gA.segment.make2(obj.x+obj.w, obj.y, 0, obj.h);
            pBottom = new gA.segment.make2(obj.x, obj.y+obj.h, obj.w, 0);

            if(triRight.intersect(pLeft) || triLeft.intersect(pRight) || triLeft.intersect(pBottom)) {
              return 'spike';
            }
          } else if (map[y][x] === 9 || map[y][x] === 10) { //Half spike facing down

            triTopL = [( tX )+gA.tS/4, tY];
            triTopR = [( tX+gA.tS )-gA.tS/4, tY];
            triBottomM = [tX+gA.tS/2, tY+gA.tS/2];

            triLeft = new gA.segment.make2(triTopL[0], triTopL[1], gA.tS/4, gA.tS/2);
            triRight = new gA.segment.make2(triTopR[0], triTopR[1], -gA.tS/4, gA.tS/2);

            pLeft = new gA.segment.make2(obj.x, obj.y, 0, obj.h);
            pRight = new gA.segment.make2(obj.x+obj.w, obj.y, 0, obj.h);
            pTop = new gA.segment.make2(obj.x, obj.y, obj.w, 0);

            if(triRight.intersect(pLeft) || triLeft.intersect(pRight) || triLeft.intersect(pTop)) {
              return 'spike';
            }
          }

          if (map[y][x] === 11) {
            return 'wind';
          }

        }

      }
    }
    return false;
  }

  function collisionMap(x, y, w, h, gridSize) {
    this.cTX;
    this.cTY;

    //Grid will need to be enlarged if player size is greater
    var grid = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];

    this.update = function() {
      this.cTX = Math.floor((x+w/2)/gA.tS);
      this.cTY = Math.floor((y+h/2)/gA.tS);

      this.grid = grid;

      if (gA.map.curr[this.cTY-1] !== undefined) {
        this.grid[0][0] = (gA.map.curr[this.cTY-1][this.cTX-1]); // Top Left Corner
        this.grid[0][1] = (gA.map.curr[this.cTY-1][this.cTX]); // Above
        this.grid[0][2] = (gA.map.curr[this.cTY-1][this.cTX+1]); // Top Right Corner
      }
      if (gA.map.curr[this.cTY] !== undefined) {
        this.grid[1][0] = (gA.map.curr[this.cTY][this.cTX-1]); // Left
        this.grid[1][1] = (gA.map.curr[this.cTY][this.cTX]); // Player // Not needed if just looking for spike edge collision
        this.grid[1][2] = (gA.map.curr[this.cTY][this.cTX+1]); // Right
      }
      if (gA.map.curr[this.cTY+1] !== undefined) {
        this.grid[2][0] = (gA.map.curr[this.cTY+1][this.cTX-1]); // Bottom Left Corner
        this.grid[2][1] = (gA.map.curr[this.cTY+1][this.cTX]); // Below
        this.grid[2][2] = (gA.map.curr[this.cTY+1][this.cTX+1]); // Bottom Right Corner
      }

      return {
        grid: this.grid,
        cTX: this.cTX,
        cTY: this.cTY
      };
    };
  }

  return {
    map: collisionMap, // Makes map for smarMove and smarMapInit
    check: smartMove // Loops through collisionMap
  };

})();
