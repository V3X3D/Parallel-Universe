gA.collision = (function() {
  "use strict";

  //Line Segment Collision Test Vars
  var triR, triL, pT, pL, pR, pB, triTL, triTR, triBM, triBL, triBR, triTM, tX, tY, xPos, yPos, x, y;

  function rectRect(x1, y1, x2, y2, tSw, tSh, tS2w, tS2h) {
    tS2w = tS2w || tSw;
    tS2h = tS2h || tSh;

    if(x1+tSw > x2 && x1 < x2+tS2w && y1+tSh > y2 && y1 < y2+tS2h) return true;
    return false;
  }

  //Spike Collision Functions
  function fullSpikeUpCollision(tX, tY, obj, side) {
    triBL = [tX, tY+gA.tS];
    triBR = [tX+gA.tS, tY+gA.tS];
    triTM = [tX+gA.tS/2, tY];

    triL = new gA.segment.make(triBL[0], triBL[1], gA.tS/2, -gA.tS);
    triR = new gA.segment.make(triBR[0], triBR[1], -gA.tS/2, -gA.tS);

    pL = new gA.segment.make(obj.x, obj.y, 0, obj.h);
    pR = new gA.segment.make(obj.x+obj.w, obj.y, 0, obj.h);
    pB = new gA.segment.make(obj.x, obj.y+obj.h, obj.w, 0);

    if(triR.intersect(pL) || triL.intersect(pR)
      || triL.intersect(pB) || triR.intersect(pB)) {
      return true;
    }
    return false;
  }
  function fullSpikeDownCollision(tX, tY, obj) {
    triTL = [tX, tY];
    triTR = [tX+gA.tS, tY];
    triBM = [tX+gA.tS/2, tY+gA.tS];

    triL = new gA.segment.make(triTL[0], triTL[1], gA.tS/2, gA.tS);
    triR = new gA.segment.make(triTR[0], triTR[1], -gA.tS/2, gA.tS);

    pL = new gA.segment.make(obj.x, obj.y, 0, obj.h);
    pR = new gA.segment.make(obj.x+obj.w, obj.y, 0, obj.h);
    pT = new gA.segment.make(obj.x, obj.y, obj.w, 0);

    if(triR.intersect(pL) || triL.intersect(pR)
      || triL.intersect(pT) || triR.intersect(pT)) {
      return true;
    }
    return false;
  }
  function halfSpikeUpCollision(tX, tY, obj) {
    triBL = [( tX )+gA.tS/4, tY+gA.tS];
    triBR = [( tX+gA.tS )-gA.tS/4, tY+gA.tS];
    triTM = [tX+gA.tS/2, tY+gA.tS/2];

    triL = new gA.segment.make(triBL[0], triBL[1], gA.tS/4, -gA.tS/2);
    triR = new gA.segment.make(triBR[0], triBR[1], -gA.tS/4, -gA.tS/2);

    pL = new gA.segment.make(obj.x, obj.y, 0, obj.h);
    pR = new gA.segment.make(obj.x+obj.w, obj.y, 0, obj.h);
    pB = new gA.segment.make(obj.x, obj.y+obj.h, obj.w, 0);

    if(triR.intersect(pL) || triL.intersect(pR)
      || triL.intersect(pB) || triR.intersect(pB)) {
      return true;
    }
    return false;
  }
  function halfSpikeDownCollision(tX, tY, obj) {
    triTL = [( tX )+gA.tS/4, tY];
    triTR = [( tX+gA.tS )-gA.tS/4, tY];
    triBM = [tX+gA.tS/2, tY+gA.tS/2];

    triL = new gA.segment.make(triTL[0], triTL[1], gA.tS/4, gA.tS/2);
    triR = new gA.segment.make(triTR[0], triTR[1], -gA.tS/4, gA.tS/2);

    pL = new gA.segment.make(obj.x, obj.y, 0, obj.h);
    pR = new gA.segment.make(obj.x+obj.w, obj.y, 0, obj.h);
    pT = new gA.segment.make(obj.x, obj.y, obj.w, 0);

    if(triR.intersect(pL) || triL.intersect(pR)
      || triL.intersect(pT) || triR.intersect(pT)) {
        return true;
    }
    return false;
  }

  function smartMove(obj, map, cTX, cTY, xDif, yDif) {
    for(y=0; y < map.length; y+=1) {
      for(x=0; x < map[y].length; x+=1) {

        tX = (x * gA.tS) + (cTX-1)*gA.tS;
        tY = (y * gA.tS) + (cTY-1)*gA.tS;

        xPos = obj.x+xDif;
        yPos = obj.y+yDif;

        /*BLOCK CHECKS*/
        if (rectRect(xPos, yPos, tX, tY, obj.w, obj.h, gA.tS, gA.tS)) {
          if (map[y][x] === 1 || map[y][x] === 2) {
            if (obj.action === 'gravity' && yPos+obj.h > tY) return { tY: tY };
            if (obj.action === 'wind' || obj.action === 'jump' && yPos < tY+gA.tS) return { tY: tY };
            return true;
          }

          /*SPIKE FULL CHECKS*/
          if(map[y][x] === 3 || map[y][x] === 4) { //Spike facing up
            /*This if statment does a quick check to make sure you aren't
              landing on a block to the right of a spike which is needed since
              this collistion loop goes left to right.*/
            if(map[y][x+1] === 1 || map[y][x+1] === 2)
              if(xPos > tX) return { tY: tY };

            if(fullSpikeUpCollision(tX, tY, obj)) return 'spike';
          } else if (map[y][x] === 5 || map[y][x] === 6) { //Spike facing down
            if(fullSpikeDownCollision(tX, tY, obj)) return 'spike';
          }

          /*SPIKE HALF CHECKS*/
          if (map[y][x] === 7 || map[y][x] === 8) { //Half spike facing up
            if(halfSpikeUpCollision(tX, tY, obj)) return 'spike';
          } else if (map[y][x] === 9 || map[y][x] === 10) { //Half spike facing down
            if(halfSpikeDownCollision(tX, tY, obj)) return 'spike';
          }

          /*WIND*/
          if (map[y][x] === 11 || map[y][x] === 12 || map[y][x] === 13) {

            if (map[y][x+1] === 1 || map[y][x+1] === 2)
              if(obj.action === 'right' && xPos+obj.w > tX+gA.tS) return true;

            //Ground to right - left works
            if (map[y][x+1] === 1 || map[y][x+1] === 2)
              if(obj.action === 'gravity' && xPos+obj.w > tX+gA.tS) return { tX: tX, tY: tY };

            if(obj.action === 'wind') {
              //Spike down to right
              if (map[y][x+1] === 5 || map[y][x+1] === 6)
                if(fullSpikeDownCollision(tX+gA.tS+1, tY, obj)) return 'spike';
              //Half spike down to right
              if (map[y][x+1] === 9 || map[y][x+1] === 10)
                if(halfSpikeDownCollision(tX+gA.tS, tY+gA.tS/2, obj)) return 'spike';
            } else if(obj.action === 'gravity') {
              if (map[y][x+1] === 5 || map[y][x+1] === 6) //Temp fix for right side spike collision
                if(fullSpikeDownCollision(tX+gA.tS, tY, obj)) return 'spike';
              //Spike up to right - left works
              if (map[y][x+1] === 3 || map[y][x+1] === 4)
                if(fullSpikeUpCollision(tX+gA.tS, tY, obj)) return 'spike';
              //Half spike up to right - left already works
              if (map[y][x+1] === 7 || map[y][x+1] === 8)
                if(halfSpikeUpCollision(tX+gA.tS, tY, obj)) return 'spike';
            }

            //wind
            if(obj.type !== 'blood') {
              if (yPos < tY+gA.tS/8 && xPos+obj.w > tX+gA.tS/4 && xPos < (tX+gA.tS)-gA.tS/4) return 'wind';
            } else {
              if (yPos < tY+gA.tS && xPos+obj.w > tX+gA.tS/4 && xPos < ( tX+gA.tS )-gA.tS/4) return 'wind';
            }
          }

          if(map[y][x] === 14 && obj.type !== 'blood') {
            if(xPos+obj.w > tX+gA.tS/4 && xPos < (tX+gA.tS)-gA.tS/4 && yPos+obj.h > tY+gA.tS/4 && yPos < (tY+gA.tS)-gA.tS/4) {
              gA.transition = true;
              gA.hud.state.freeze = true;
              gA.sound.portal.currentTime = 0;
              gA.sound.portal.play();
            }
          }
          if(map[y][x] === 15 && obj.type !== 'blood') {
            if(xPos+obj.w > tX+gA.tS/4 && xPos < (tX+gA.tS)-gA.tS/4 && yPos+obj.h > tY+gA.tS/4 && yPos < (tY+gA.tS)-gA.tS/4) {
              gA.hud.state.freeze = true;
              gA.player.state.locked = true;
              gA.player.state.focused = false;
              gA.player.state.focusAni = undefined;
              gA.heart.stop();
              gA.end = true;
            }
          }

        }
      }
    }
    return false;
  }

  function collisionMap(x, y, w, h, gridSize) {
    var grid = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ], cTX, cTY;

    cTX = Math.floor((x+w/2)/gA.tS);
    cTY = Math.floor((y+h/2)/gA.tS);

    if (gA.lvl.cur.map[cTY-1] !== undefined) {
      grid[0][0] = (gA.lvl.cur.map[cTY-1][cTX-1]); // Top Left Corner
      grid[0][1] = (gA.lvl.cur.map[cTY-1][cTX]); // Above
      grid[0][2] = (gA.lvl.cur.map[cTY-1][cTX+1]); // Top Right Corner
    }
    if (gA.lvl.cur.map[cTY] !== undefined) {
      grid[1][0] = (gA.lvl.cur.map[cTY][cTX-1]); // Left
      grid[1][1] = (gA.lvl.cur.map[cTY][cTX]); // Player //Needed for things like wind
      grid[1][2] = (gA.lvl.cur.map[cTY][cTX+1]); // Right
    }
    if (gA.lvl.cur.map[cTY+1] !== undefined) {
      grid[2][0] = (gA.lvl.cur.map[cTY+1][cTX-1]); // Bottom Left Corner
      grid[2][1] = (gA.lvl.cur.map[cTY+1][cTX]); // Below
      grid[2][2] = (gA.lvl.cur.map[cTY+1][cTX+1]); // Bottom Right Corner
    }
    return { grid, cTX, cTY };
  }

  return {
    map: collisionMap, // Makes map for smarMove
    check: smartMove // Loops through collisionMap
  };

})();
