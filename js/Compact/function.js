window.onload = function() {

  //Canvas Vars
  var canvas = document.getElementById('canvas'),
    c = canvas.getContext('2d'),
    cW = 640, //Canvas Width
    cH = 448; //Canvas Height

  //Player Vars
  var keydown = {
    up: false,
    down: false,
    left: false,
    right: false
  };
  var noHold = {
    up: false
  };

  //Map vars
  var tS = 32; //Size of tiles
  var map = [ //The map, each num represents a tile (see initMap function).
    [0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,1,2,0,0,0,0,1,1,0,0,0,0,2],
    [0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,2],
    [0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,2,1,0,0,0,1,2,2,1,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,4,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,1,1,1,1,1,0,0,4,0,0,0,1],
    [0,2,2,1,1,1,2,1,1,2,2,1,1,0,0,1,2,1,0,0]
  ];
  var mapAround = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];

  //Line Segment Collision Test Vars
  var triRight,
    triLeft,
    triBottom,
    pLeft,
    pRight,
    pBottom;

  // Setting Up The Canvas
  function canvasInit() {
    canvas.width = cW;
    canvas.height = cH;

    this.render = function() {
      c.fillStyle = '#fcd';
      c.fillRect(0, 0, cW, cH);
    };
  }

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

  //Function for drawing the map
  function mapInit() {
    this.tX = 0;
    this.tY = 0;

    this.render = function() {
      for(var y=0; y < map.length; y+=1) {
        for(var x=0; x < map[y].length; x+=1) {
          this.tX = x * tS;
          this.tY = y * tS;

          if (map[y][x] === 1) {
            c.fillStyle = '#000';
            c.fillRect(this.tX, this.tY, tS, tS);
          } else if (map[y][x] === 2) {
            c.fillStyle = '#fff';
            c.fillRect(this.tX, this.tY, tS, tS);
          } else if (map[y][x] === 3) {
            c.beginPath();
            c.moveTo(this.tX+tS/2, this.tY);
            c.lineTo(this.tX, this.tY+tS);
            c.lineTo(this.tX+tS, this.tY+tS);
            c.closePath();
            c.fillStyle = '#000';
            c.fill();
          } else if (map[y][x] === 4) {
            c.beginPath();
            c.moveTo(this.tX+tS/2, this.tY);
            c.lineTo(this.tX, this.tY+tS);
            c.lineTo(this.tX+tS, this.tY+tS);
            c.closePath();
            c.fillStyle = '#fff';
            c.fill();
          }
        }
      }
    };
  }

  function smartMapInit() {
    this.tX = 0;
    this.tY = 0;

    this.render = function() {
      for(var y=0; y < mapAround.length; y+=1) {
        for(var x=0; x < mapAround[y].length; x+=1) {
          this.tX = (x * tS) + (cTX-1)*tS;
          this.tY = (y * tS) + (cTY-1)*tS;

          if (mapAround[y][x] === 1) {
            c.fillStyle = '#fac';
            c.fillRect(this.tX, this.tY, tS, tS);
          } else if (mapAround[y][x] === 2) {
            c.fillStyle = '#acf';
            c.fillRect(this.tX, this.tY, tS, tS);
          } else if (mapAround[y][x] === 3) {
            c.fillStyle = '#ff0';
            c.fillRect(this.tX, this.tY, tS, tS);
            c.beginPath();
            c.moveTo(this.tX+tS/2, this.tY);
            c.lineTo(this.tX, this.tY+tS);
            c.lineTo(this.tX+tS, this.tY+tS);
            c.closePath();
            c.fillStyle = '#f66';
            c.fill();
          } else if (mapAround[y][x] === 4) {
            c.fillStyle = '#ff0';
            c.fillRect(this.tX, this.tY, tS, tS);
            c.beginPath();
            c.moveTo(this.tX+tS/2, this.tY);
            c.lineTo(this.tX, this.tY+tS);
            c.lineTo(this.tX+tS, this.tY+tS);
            c.closePath();
            c.fillStyle = '#66f';
            c.fill();
          } else if (mapAround[y][x] === 0) {
            c.fillStyle = '#ff0';
            c.fillRect(this.tX, this.tY, tS, tS);
          }

        }
      }
    };
  }

  //Collision with map tiles
  function checkMove(px, py, pw, ph, ps, pd) {
    Player.color = '#0f0'; //Remove this once engine is used in another game

    for(var y=0; y < map.length; y+=1) {
      for(var x=0; x < map[y].length; x+=1) {
        var tX = x * tS;
        var tY = y * tS;

        if (map[y][x] === 1 || map[y][x] === 2) { //Ground Tile Values
          if (px < tX+tS && px + pw > tX && py < tY+tS && py + ph > tY) {

            //Change from just if statments to else if (might cause problems).
            if (pd === 'right' && px+pw > tX) {
              Player.x = tX - pw - ps;
              Player.speedX = 0;
            } else if (pd === 'left' && px < tX+tS) {
              Player.x = tX + tS + ps;
              Player.speedX = 0;
            } else if (pd === 'jump' && py+ph > tY) {
              Player.vy = 0;
              Player.gravity = 4.5;
              Player.jump = false;
            } else if (pd === 'gravity' && py < tY+tS) {
              Player.y = tY - ph - ps;
              Player.jump = false;
              return true;
            }

          }
        }

        if (map[y][x] === 3 || map[y][x] === 4) { //Spike Tile Values
          //Checking if inside tile with a spike tile
          if (px < tX+tS && px + pw > tX && py < tY+tS && py + ph > tY) {

            triRight = new Segment(tX+tS/2, tY, tX+tS, tY+tS);
            triLeft = new Segment(tX+tS/2, tY, tX, tY+tS);

            pLeft = new Segment(px, py, px, py+ph);
            pRight = new Segment(px+pw, py, px+pw, py+ph);
            pBottom = new Segment(px, py+ph, px+pw, py+ph);

            //If collision with left or right edge of triangle.
            /*
              NOTE: this collision is checking for 3 things, if square bottom
              vector touches triangle left vector--you don't need to check both
              left and right since they meet at a point--, if square right
              vector touches triangle left, and if square left bector touches
              triangle right.

              This is suffience if the player doesn't continue to collide with
              the triangle; this is because the triangle will have some gaps
              where he will visually collide but won't take damage.

              So it works for insta death games, or ones that move the player
              off of the spike.
            */

            // if(triRight.cross(pLeft) || triLeft.cross(pRight)|| triLeft.cross(pBottom)) {
            //   Player.color = '#f00'; //Remove this once engine is used in another game
            // }

            triBottom = new Segment(tX, tY+tS, tX+tS, tY+tS);

            //If collision triangle; inside and edge.
            /*
              NOTE: many better methods of doing this work but by adding a few
              more checks we cover most cases. So the player should collide
              even when inside the triangle--not just outer collision.

              DOUBLE NOTE: lines don't seem to collide when they are
              perpendicular. Need to improve collision to fix this.
            */
            if(triRight.cross(pLeft) || triLeft.cross(pRight)|| triLeft.cross(pBottom)
              || triRight.cross(pRight) || triLeft.cross(pLeft) || triBottom.cross(pBottom)) {
              Player.color = '#f00'; //Remove this once engine is used in another game
            }

          }
        }
      }
    }
  }

  //Collision with map tiles
  function smartMove(px, py, pw, ph, ps, pd) {
    Player.color = '#0f0';

    for(var y=0; y < mapAround.length; y+=1) {
      for(var x=0; x < mapAround[y].length; x+=1) {
        var tX = (x * tS) + (cTX-1)*tS;
        var tY = (y * tS) + (cTY-1)*tS;

        if (mapAround[y][x] === 1 || mapAround[y][x] === 2) { //Ground Tile Values
          if (px < tX+tS && px + pw > tX && py < tY+tS && py + ph > tY) {

            if (pd === 'right' && px+pw > tX) {
              Player.x = tX - pw - ps;
              Player.speedX = 0;
            } else if (pd === 'left' && px < tX+tS) {
              Player.x = tX + tS + ps;
              Player.speedX = 0;
            } else if (pd === 'jump' && py+ph > tY) {
              Player.vy = 0;
              Player.gravity = 4.5;
              Player.jump = false;
            } else if (pd === 'gravity' && py < tY+tS) {
              Player.y = tY - ph - ps;
              Player.jump = false;
              return true;
            }

          }
        }

        if (mapAround[y][x] === 3 || mapAround[y][x] === 4) { //Spike Tile Values
          if (px < tX+tS && px + pw > tX && py < tY+tS && py + ph > tY) {

            triRight = new Segment(tX+tS/2, tY, tX+tS, tY+tS);
            triLeft = new Segment(tX+tS/2, tY, tX, tY+tS);

            pLeft = new Segment(px, py, px, py+ph);
            pRight = new Segment(px+pw, py, px+pw, py+ph);
            pBottom = new Segment(px, py+ph, px+pw, py+ph);

            triBottom = new Segment(tX, tY+tS, tX+tS, tY+tS);

            if(triRight.cross(pLeft) || triLeft.cross(pRight)|| triLeft.cross(pBottom)
              || triRight.cross(pRight) || triLeft.cross(pLeft) || triBottom.cross(pBottom)) {
              Player.color = '#f00';
            }

          }
        }
      }
    }
  }

  //cT = current tile.
  var cTX, cTY;
  function playerInit() {
    this.x = 224;
    this.y = 32;
    this.w = tS;
    this.h = tS;
    this.spd = 4;
    this.jump = false;
    this.gravConst = 6.5;
    this.grav = this.gravConst;
    this.vyConst = -12;
    this.vy = this.vyConst;
    this.color = '#0f0';

    this.update = function() {
      cTX = Math.round(this.x/tS);
      cTY = Math.round(this.y/tS);

      if (map[cTY-1] !== undefined) {
        mapAround[0][0] = (map[cTY-1][cTX-1]); // Top Left Corner
        mapAround[0][1] = (map[cTY-1][cTX]); // Above
        mapAround[0][2] = (map[cTY-1][cTX+1]); // Top Right Corner
      } else {
        mapAround[0][0] = 0; // Top Left Corner
        mapAround[0][1] = 0; // Above
        mapAround[0][2] = 0; // Top Right Corner
      }

      if (map[cTY] !== undefined) {
        mapAround[1][0] = (map[cTY][cTX-1]); // Left
        mapAround[1][1] = (map[cTY][cTX]); // Player // Not needed if just looking for spike edge collision
        mapAround[1][2] = (map[cTY][cTX+1]); // Right
      } else {
        mapAround[1][0] = 0; // Left
        mapAround[1][2] = 0; // Right
      }

      if (map[cTY+1] !== undefined) {
        mapAround[2][0] = (map[cTY+1][cTX-1]); // Bottom Left Corner
        mapAround[2][1] = (map[cTY+1][cTX]); // Below
        mapAround[2][2] = (map[cTY+1][cTX+1]); // Bottom Right Corner
      } else {
        mapAround[2][0] = 0; // Bottom Left Corner
        mapAround[2][1] = 0; // Below
        mapAround[2][2] = 0; // Bottom Right Corner
      }

      // mapAround[2].push(map[cTY+1][cTX-1]); // Bottom Left Corner
      // mapAround[2].push(map[cTY+1][cTX]); // Below
      // mapAround[2].push(map[cTY+1][cTX+1]);  // Bottom Right Corner

      var gravCollide;

      //Basics of Jumping (if called).
      if (this.jump === true) {
        // checkMove(this.x, this.y+this.vy+1, this.w, this.h, 0, 'jump');
        smartMove(this.x, this.y+this.vy+1, this.w, this.h, 0, 'jump');

        // Bring vy back down so you don't go flying off the screen
        // Whole numbers help keep away collision bugs
        if (this.vy < 23) this.vy += 1;
        this.y += this.vy;
      }

      //Rounding was the key to fix lots of collision problems when using gravity/jumping.
      //It seems JS doesn't like crazy decimals (who would have thought).
      if (this.jump === false) {
        // gravCollide = checkMove(this.x, this.y+this.grav, this.w, this.h, this.grav, 'gravity');
        gravCollide = smartMove(this.x, this.y+this.grav, this.w, this.h, this.grav, 'gravity');

        if (gravCollide) {
          this.y += this.grav;
          this.grav = this.gravConst;
        } else {
          this.jump = false;
          if (this.grav > 13) {
            this.y += Math.round( this.grav );
          } else {
            this.y += Math.round( this.grav *= 1.04 );
          }
        }

      }

      //Jumping Call
      if (keydown.up === true && noHold.up === false) {
        //noHold makes you release keys before they get called again
        //in this case it is prevent holding the jump key.
        noHold.up = true;
        if (gravCollide === true) {
          this.vy = this.vyConst;
          this.jump = true;
        }
      }

      //Movement Left and Right
      if (keydown.left === true) {
        // checkMove(this.x-this.spd, this.y, this.w, this.h, this.spd, 'left');
        smartMove(this.x-this.spd, this.y, this.w, this.h, this.spd, 'left');

        this.x -= this.spd;
      }
      if (keydown.right === true) {
        // checkMove(this.x+this.spd, this.y, this.w, this.h, this.spd, 'right');
        smartMove(this.x+this.spd, this.y, this.w, this.h, this.spd, 'right');

        this.x += this.spd;
      }
    };

    this.render = function() {
      c.fillStyle = this.color;
      c.fillRect(this.x, this.y, this.w, this.h);
    };
  }

  var Canvas = new canvasInit();
  var Map = new mapInit();
  var SmartMap = new smartMapInit();
  var Player = new playerInit();
  function gameLoop() {
    //Game State Updating
    Player.update();

    //Game Drawing
    Canvas.render();
    Map.render();
    SmartMap.render();
    Player.render();

    setTimeout(gameLoop, 16);
  }
  gameLoop();

  //Player Movement Keys Pressed
  window.onkeydown = function(e) {
    switch(e.keyCode) {
      case 65:
        keydown.left = true;
        break;
      case 68:
        keydown.right = true;
        break;
      case 83:
        keydown.down = true;
        break;
      case 87:
        keydown.up = true;
        break;
      default:
        break;
    }
  };

  //Player Movement Keys Released
  window.onkeyup = function(e) {
    switch(e.keyCode) {
      case 65:
        keydown.left = false;
        break;
      case 68:
        keydown.right = false;
        break;
      case 83:
        keydown.down = false;
        break;
      case 87:
        keydown.up = false;
        noHold.up = false;
        break;
      default:
        break;
    }
  };

};
