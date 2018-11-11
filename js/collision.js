gA.collision = (function() {
  "use strict";

  //Line Segment Collision Test Vars
  var triRight,
    triLeft,
    triBottom,
    pTop,
    pLeft,
    pRight,
    pBottom;

  //Make segments then check intersections between them
  //Only works if one segment in the check is vertical or horizontal
  function Segment(x, y, vecx, vecy) {
    this.x = x;
    this.y = y;
    this.vecx = vecx;
    this.vecy = vecy;

    this.cross = function(seg) { //Checks if 'this' segment and another intersect

      var denom = ((this.vecx - this.x) * (seg.vecy - seg.y)) - ((this.vecy - this.y) * (seg.vecx - seg.x));
      var numr1 = ((this.y - seg.y) * (seg.vecx - seg.x)) - ((this.x - seg.x) * (seg.vecy - seg.y));
      var numr2 = ((this.y - seg.y) * (this.vecx - this.x)) - ((this.x - seg.x) * (this.vecy - this.y));

      if (denom === 0) return numr1 === 0 && numr2 === 0;

      var r = numr1 / denom;
      var s = numr2 / denom;

      return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
    };
  }

  //Checks around player (better way of doing collision detection)
  function smartMove(px, py, pw, ph, ps, pd) {
    gA.player.state.color = '#0f0';

    for(var y=0; y < gA.map.check.length; y+=1) {
      for(var x=0; x < gA.map.check[y].length; x+=1) {
        var tX = (x * gA.tS) + (gA.cTX-1)*gA.tS;
        var tY = (y * gA.tS) + (gA.cTY-1)*gA.tS;

        if (gA.map.check[y][x] === 1 || gA.map.check[y][x] === 2) { //Ground Tile Values
          if (px < tX+gA.tS && px + pw > tX && py < tY+gA.tS && py + ph > tY) {

            if (pd === 'right' && px+pw > tX) {
              gA.player.state.x = tX - pw - ps;
              gA.player.state.speedX = 0;
            } else if (pd === 'left' && px < tX+gA.tS) {
              gA.player.state.x = tX + gA.tS + ps;
              gA.player.state.speedX = 0;
            } else if (pd === 'jump' && py+ph > tY) {
              gA.player.state.vy = 0;
              // gA.player.state.gravity = 6.5;
              gA.player.state.jump = false;
            } else if (pd === 'gravity' && py < tY+gA.tS) {
              gA.player.state.y = tY - ph - ps;
              gA.player.state.jump = false;
              return true;
            }
          }
        }

        if (gA.map.check[y][x] === 3 || gA.map.check[y][x] === 4) { //Spike Tile Values
          if (px < tX+gA.tS && px + pw > tX && py < tY+gA.tS && py + ph > tY) {

            triRight = new Segment(tX+gA.tS/2, tY, tX+gA.tS, tY+gA.tS);
            triLeft = new Segment(tX+gA.tS/2, tY, tX, tY+gA.tS);

            pLeft = new Segment(px, py, px, py+ph);
            pRight = new Segment(px+pw, py, px+pw, py+ph);
            pBottom = new Segment(px, py+ph, px+pw, py+ph);

            if(triRight.cross(pLeft) || triLeft.cross(pRight)|| triLeft.cross(pBottom)) {
              gA.player.state.color = '#f00'; //Remove this once engine is used in another game
            }
          }
        }

        if (gA.map.check[y][x] === 5 || gA.map.check[y][x] === 6) { //Spike Tile Values
          if (px < tX+gA.tS && px + pw > tX && py < tY+gA.tS && py + ph > tY) {

            // triLeft = new Segment(tX+gA.tS/2, tY+gA.tS, tX+gA.tS, tY);
            triRight = new Segment(tX+gA.tS, tY, tX+gA.tS/2, tY+gA.tS);
            triLeft = new Segment(tX, tY, tX+gA.tS/2, tY+gA.tS);
            // triLeft = new Segment(tX+gA.tS/2, tY, tX, tY+gA.tS);

            pLeft = new Segment(px, py, px, py+ph);
            pRight = new Segment(px+pw, py, px+pw, py+ph);
            pTop = new Segment(px, py, px+pw, py);

            if(triRight.cross(pLeft) || triLeft.cross(pRight) || triLeft.cross(pTop)) {
              gA.player.state.color = '#f00'; //Remove this once engine is used in another game
            }
          }
        }

      }
    }
  }

  function smartMapInit() {
    this.tX = 0;
    this.tY = 0;

    this.render = function() {
      for(var y=0; y < gA.map.check.length; y+=1) {
        for(var x=0; x < gA.map.check[y].length; x+=1) {
          this.tX = (x * gA.tS) + (gA.cTX-1)*gA.tS;
          this.tY = (y * gA.tS) + (gA.cTY-1)*gA.tS;

          if (gA.map.check[y][x] === 1) {
            gA.ctx.g.fillStyle = '#fac';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          } else if (gA.map.check[y][x] === 2) {
            gA.ctx.g.fillStyle = '#acf';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          } else if (gA.map.check[y][x] === 3) {
            gA.ctx.g.fillStyle = '#ff0';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
            gA.ctx.g.beginPath();
            gA.ctx.g.moveTo(this.tX+gA.tS/2, this.tY);
            gA.ctx.g.lineTo(this.tX, this.tY+gA.tS);
            gA.ctx.g.lineTo(this.tX+gA.tS, this.tY+gA.tS);
            gA.ctx.g.closePath();
            gA.ctx.g.fillStyle = '#f66';
            gA.ctx.g.fill();
          } else if (gA.map.check[y][x] === 4) {
            gA.ctx.g.fillStyle = '#ff0';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
            gA.ctx.g.beginPath();
            gA.ctx.g.moveTo(this.tX+gA.tS/2, this.tY);
            gA.ctx.g.lineTo(this.tX, this.tY+gA.tS);
            gA.ctx.g.lineTo(this.tX+gA.tS, this.tY+gA.tS);
            gA.ctx.g.closePath();
            gA.ctx.g.fillStyle = '#66f';
            gA.ctx.g.fill();
          } else if (gA.map.check[y][x] === 5) {
            gA.ctx.g.fillStyle = '#ff0';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
            gA.ctx.g.beginPath();
            gA.ctx.g.moveTo(this.tX, this.tY);
            gA.ctx.g.lineTo(this.tX+gA.tS/2, this.tY+gA.tS);
            gA.ctx.g.lineTo(this.tX+gA.tS, this.tY);
            gA.ctx.g.closePath();
            gA.ctx.g.fillStyle = '#f66';
            gA.ctx.g.fill();
          } else if (gA.map.check[y][x] === 6) {
            gA.ctx.g.fillStyle = '#ff0';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
            gA.ctx.g.beginPath();
            gA.ctx.g.moveTo(this.tX, this.tY);
            gA.ctx.g.lineTo(this.tX+gA.tS/2, this.tY+gA.tS);
            gA.ctx.g.lineTo(this.tX+gA.tS, this.tY);
            gA.ctx.g.closePath();
            gA.ctx.g.fillStyle = '#66f';
            gA.ctx.g.fill();
          } else if (gA.map.check[y][x] === 0) {
            gA.ctx.g.fillStyle = '#ff0';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          }

        }
      }
    };
  }

  function collisionMap() {

    this.update = function() {
      gA.cTX = Math.round(gA.player.state.x/gA.tS);
      gA.cTY = Math.round(gA.player.state.y/gA.tS);

      gA.map.check = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];

      if (gA.map.curr[gA.cTY-1] !== undefined) {
        gA.map.check[0][0] = (gA.map.curr[gA.cTY-1][gA.cTX-1]); // Top Left Corner
        gA.map.check[0][1] = (gA.map.curr[gA.cTY-1][gA.cTX]); // Above
        gA.map.check[0][2] = (gA.map.curr[gA.cTY-1][gA.cTX+1]); // Top Right Corner
      }
      if (gA.map.curr[gA.cTY] !== undefined) {
        gA.map.check[1][0] = (gA.map.curr[gA.cTY][gA.cTX-1]); // Left
        // gA.map.check[1][1] = (gA.map.curr[gA.cTY][gA.cTX]); // Player // Not needed if just looking for spike edge collision
        gA.map.check[1][2] = (gA.map.curr[gA.cTY][gA.cTX+1]); // Right
      }

      if (gA.map.curr[gA.cTY+1] !== undefined) {
        gA.map.check[2][0] = (gA.map.curr[gA.cTY+1][gA.cTX-1]); // Bottom Left Corner
        gA.map.check[2][1] = (gA.map.curr[gA.cTY+1][gA.cTX]); // Below
        gA.map.check[2][2] = (gA.map.curr[gA.cTY+1][gA.cTX+1]); // Bottom Right Corner
      }
    };
  }


  return {
    map: collisionMap, // Makes map for smarMove and smarMapInit
    checkAround: smartMove, // Loops through collisionMap
    view: smartMapInit // For showing highlights of potential collisions
  };

})();
