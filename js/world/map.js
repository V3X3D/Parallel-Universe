gA.map = (function() {
  "use strict";

  var aniTiles = [];
  var bg, fg, bgArr, fgArr;

  //This var is dev stuff
  var mapAround = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];

  //Function for drawing the map
  function init() {
    this.tX = 0;
    this.tY = 0;

    this.render = function() {
      bg = gA.ctx.m.fillStyle = 'rgb('+gA.bgClr.R+','+gA.bgClr.G+','+gA.bgClr.B+')';
      fg = gA.ctx.m.fillStyle = 'rgb('+gA.fgClr.R+','+gA.fgClr.G+','+gA.fgClr.B+')';

      bgArr = gA.bgClr;
      fgArr = {R: gA.fgClr.R, G: gA.fgClr.G, B: gA.fgClr.B};

      for(var y=0; y < gA.level.map.length; y+=1) {
        for(var x=0; x < gA.level.map[y].length; x+=1) {
          this.tX = x * gA.tS;
          this.tY = y * gA.tS;

          if (gA.level.map[y][x] === 1) {
            gA.ctx.m.fillStyle = bg;
            gA.ctx.m.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          } else if (gA.level.map[y][x] === 2) {
            gA.ctx.m.fillStyle = fg;
            gA.ctx.m.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          } else if (gA.level.map[y][x] === 3) { //Spike FULL Up
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(this.tX+gA.tS/2, this.tY);
            gA.ctx.m.lineTo(this.tX, this.tY+gA.tS);
            gA.ctx.m.lineTo(this.tX+gA.tS, this.tY+gA.tS);
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = bg;
            gA.ctx.m.fill();
          } else if (gA.level.map[y][x] === 4) { //Spike FULL Up
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(this.tX+gA.tS/2, this.tY);
            gA.ctx.m.lineTo(this.tX, this.tY+gA.tS);
            gA.ctx.m.lineTo(this.tX+gA.tS, this.tY+gA.tS);
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = fg;
            gA.ctx.m.fill();
          } else if (gA.level.map[y][x] === 5) { //Spike FULL Down
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(this.tX, this.tY);
            gA.ctx.m.lineTo(this.tX+gA.tS/2, this.tY+gA.tS);
            gA.ctx.m.lineTo(this.tX+gA.tS, this.tY);
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = bg;
            gA.ctx.m.fill();
          } else if (gA.level.map[y][x] === 6) { //Spike FULL Down
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(this.tX, this.tY);
            gA.ctx.m.lineTo(this.tX+gA.tS/2, this.tY+gA.tS);
            gA.ctx.m.lineTo(this.tX+gA.tS, this.tY);
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = fg;
            gA.ctx.m.fill();
          } else if (gA.level.map[y][x] === 7) { //Spike HALF Up
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(this.tX+gA.tS/2, this.tY+gA.tS/2); //Top Mid
            gA.ctx.m.lineTo(( this.tX )+gA.tS/4, this.tY+gA.tS); //Bottom Left
            gA.ctx.m.lineTo(( this.tX+gA.tS )-gA.tS/4, this.tY+gA.tS); //Bottom Right
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = bg;
            gA.ctx.m.fill();
          } else if (gA.level.map[y][x] === 8) { //Spike HALF Up
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(this.tX+gA.tS/2, this.tY+gA.tS/2); //Top Mid
            gA.ctx.m.lineTo(( this.tX )+gA.tS/4, this.tY+gA.tS); //Bottom Left
            gA.ctx.m.lineTo(( this.tX+gA.tS )-gA.tS/4, this.tY+gA.tS); //Bottom Right
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = fg;
            gA.ctx.m.fill();
          } else if (gA.level.map[y][x] === 9) { //Spike HALF Down
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(( this.tX )+gA.tS/4, this.tY); //Top left
            gA.ctx.m.lineTo(this.tX+gA.tS/2, this.tY+gA.tS/2); // Bottom Mid
            gA.ctx.m.lineTo(( this.tX+gA.tS )-gA.tS/4, this.tY); //Top Right
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = bg;
            gA.ctx.m.fill();
          } else if (gA.level.map[y][x] === 10) { //Spike HALF Down
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(( this.tX )+gA.tS/4, this.tY); //Top left
            gA.ctx.m.lineTo(this.tX+gA.tS/2, this.tY+gA.tS/2); // Bottom Mid
            gA.ctx.m.lineTo(( this.tX+gA.tS )-gA.tS/4, this.tY); //Top Right
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = fg;
            gA.ctx.m.fill();
          } else if (gA.level.map[y][x] === 11) {
            // gA.ctx.m.fillStyle = fg;
            // gA.ctx.m.fillRect(this.tX+gA.tS/4, this.tY, gA.tS/2, gA.tS/8);
          } else if (gA.level.map[y][x] === 12) {
            aniTiles.push(new gA.entity.windGenerator(this.tX, this.tY, fgArr));
          } else if (gA.level.map[y][x] === 13) {
            aniTiles.push(new gA.entity.windGenerator(this.tX, this.tY, bgArr));
          } else if (gA.level.map[y][x] === 14) {
            aniTiles.push(new gA.entity.levelWarp(this.tX, this.tY, bg, fg));
          } else if (gA.level.map[y][x] === 15) {
            aniTiles.push(new gA.entity.levelWarp(this.tX, this.tY, fg, bg));
          }

        }
      }
    };
  }

  function animated() {
    var key;
    this.update = function() {
      for(var i = 0; i < aniTiles.length; i+=1) aniTiles[i].logic();
    };
    this.render = function() {
      for(var i = 0; i < aniTiles.length; i+=1) aniTiles[i].draw();
    };
  }

  function animationClear() { aniTiles = []; }

  return {
    init: new init, //For drawing the map
    animated: new animated, //For animated map tiles
    check: mapAround, //The box being checked around the player (for dev stuff)
    aniClear: animationClear
  };

})();

