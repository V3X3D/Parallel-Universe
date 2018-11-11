gA.map = (function() {
  "use strict";

  var map = [ //The map, each num represents a tile (see initMap function).
    [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,5,0,5,0,0,0,1,2,0,0,0,0,1,1,0,0,0,0,2],
    [0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,2],
    [0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1],
    [0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,6],
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

  //Function for drawing the map
  function mapInit() {
    this.tX = 0;
    this.tY = 0;

    this.render = function() {
      for(var y=0; y < map.length; y+=1) {
        for(var x=0; x < map[y].length; x+=1) {
          this.tX = x * gA.tS;
          this.tY = y * gA.tS;

          if (map[y][x] === 1) {
            gA.ctx.g.fillStyle = '#000';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          } else if (map[y][x] === 2) {
            gA.ctx.g.fillStyle = '#fff';
            gA.ctx.g.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          } else if (map[y][x] === 3) {
            gA.ctx.g.beginPath();
            gA.ctx.g.moveTo(this.tX+gA.tS/2, this.tY);
            gA.ctx.g.lineTo(this.tX, this.tY+gA.tS);
            gA.ctx.g.lineTo(this.tX+gA.tS, this.tY+gA.tS);
            gA.ctx.g.closePath();
            gA.ctx.g.fillStyle = '#000';
            gA.ctx.g.fill();
          } else if (map[y][x] === 4) {
            gA.ctx.g.beginPath();
            gA.ctx.g.moveTo(this.tX+gA.tS/2, this.tY);
            gA.ctx.g.lineTo(this.tX, this.tY+gA.tS);
            gA.ctx.g.lineTo(this.tX+gA.tS, this.tY+gA.tS);
            gA.ctx.g.closePath();
            gA.ctx.g.fillStyle = '#fff';
            gA.ctx.g.fill();
          } else if (map[y][x] === 5) {
            gA.ctx.g.beginPath();
            gA.ctx.g.moveTo(this.tX, this.tY);
            gA.ctx.g.lineTo(this.tX+gA.tS/2, this.tY+gA.tS);
            gA.ctx.g.lineTo(this.tX+gA.tS, this.tY);
            gA.ctx.g.closePath();
            gA.ctx.g.fillStyle = '#000';
            gA.ctx.g.fill();
          } else if (map[y][x] === 6) {
            gA.ctx.g.beginPath();
            gA.ctx.g.moveTo(this.tX, this.tY);
            gA.ctx.g.lineTo(this.tX+gA.tS/2, this.tY+gA.tS);
            gA.ctx.g.lineTo(this.tX+gA.tS, this.tY);
            gA.ctx.g.closePath();
            gA.ctx.g.fillStyle = '#fff';
            gA.ctx.g.fill();
          }
        }
      }
    };
  }

  return {
    init: mapInit, //For drawing the map
    curr: map, //Current map
    check: mapAround //The box being checked around the player
  };

})();

