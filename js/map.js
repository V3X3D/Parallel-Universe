gA.map = (function() {
  "use strict";

  var map = [
    [0 ,2 ,2 ,1 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0 ,2 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0 ,5 ,0 ,6 ,0 ,0 ,0 ,1 ,2 ,0 ,0 ,0 ,0 ,1 ,1 ,2 ,2 ,1 ,0 ,0 ],
    [0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,9 ,0 ,0 ,0 ,2 ,2 ,0 ,0 ,6 ,5 ,0 ,0 ],
    [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,3 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,11],
    [0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,2 ,2 ,2 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,11],
    [1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,2 ,0 ,0 ,0 ,11],
    [0 ,0 ,4 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,2 ,1 ,0 ,0 ,1 ,2 ,0 ,0 ,11],
    [0 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,10,0 ,0 ,0 ,1 ,1 ,0 ,11],
    [0 ,1 ,1 ,2 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
    [0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ],
    [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,1 ,1 ,1 ,2 ,0 ,0 ,0 ,7 ,1 ,1 ,0 ],
    [1 ,2 ,2 ,2 ,1 ,1 ,2 ,1 ,1 ,2 ,2 ,1 ,1 ,0 ,0 ,1 ,2 ,0 ,0 ,0 ]
  ];
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
      for(var y=0; y < map.length; y+=1) {
        for(var x=0; x < map[y].length; x+=1) {
          this.tX = x * gA.tS;
          this.tY = y * gA.tS;

          if (map[y][x] === 1) {
            gA.ctx.m.fillStyle = '#000';
            gA.ctx.m.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          } else if (map[y][x] === 2) {
            gA.ctx.m.fillStyle = '#fff';
            gA.ctx.m.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          } else if (map[y][x] === 3) { //Spike FULL Up
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(this.tX+gA.tS/2, this.tY);
            gA.ctx.m.lineTo(this.tX, this.tY+gA.tS);
            gA.ctx.m.lineTo(this.tX+gA.tS, this.tY+gA.tS);
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = '#000';
            gA.ctx.m.fill();
          } else if (map[y][x] === 4) { //Spike FULL Up
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(this.tX+gA.tS/2, this.tY);
            gA.ctx.m.lineTo(this.tX, this.tY+gA.tS);
            gA.ctx.m.lineTo(this.tX+gA.tS, this.tY+gA.tS);
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = '#fff';
            gA.ctx.m.fill();
          } else if (map[y][x] === 5) { //Spike FULL Down
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(this.tX, this.tY);
            gA.ctx.m.lineTo(this.tX+gA.tS/2, this.tY+gA.tS);
            gA.ctx.m.lineTo(this.tX+gA.tS, this.tY);
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = '#000';
            gA.ctx.m.fill();
          } else if (map[y][x] === 6) { //Spike FULL Down
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(this.tX, this.tY);
            gA.ctx.m.lineTo(this.tX+gA.tS/2, this.tY+gA.tS);
            gA.ctx.m.lineTo(this.tX+gA.tS, this.tY);
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = '#fff';
            gA.ctx.m.fill();
          } else if (map[y][x] === 7) { //Spike HALF Up
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(this.tX+gA.tS/2, this.tY+gA.tS/2); //Top Mid
            gA.ctx.m.lineTo(( this.tX )+gA.tS/4, this.tY+gA.tS); //Bottom Left
            gA.ctx.m.lineTo(( this.tX+gA.tS )-gA.tS/4, this.tY+gA.tS); //Bottom Right
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = '#000';
            gA.ctx.m.fill();
          } else if (map[y][x] === 8) { //Spike HALF Up
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(this.tX+gA.tS/2, this.tY+gA.tS/2); //Top Mid
            gA.ctx.m.lineTo(( this.tX )+gA.tS/4, this.tY+gA.tS); //Bottom Left
            gA.ctx.m.lineTo(( this.tX+gA.tS )-gA.tS/4, this.tY+gA.tS); //Bottom Right
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = '#fff';
            gA.ctx.m.fill();
          } else if (map[y][x] === 9) { //Spike HALF Down
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(( this.tX )+gA.tS/4, this.tY); //Top left
            gA.ctx.m.lineTo(this.tX+gA.tS/2, this.tY+gA.tS/2); // Bottom Mid
            gA.ctx.m.lineTo(( this.tX+gA.tS )-gA.tS/4, this.tY); //Top Right
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = '#000';
            gA.ctx.m.fill();
          } else if (map[y][x] === 10) { //Spike HALF Down
            gA.ctx.m.beginPath();
            gA.ctx.m.moveTo(( this.tX )+gA.tS/4, this.tY); //Top left
            gA.ctx.m.lineTo(this.tX+gA.tS/2, this.tY+gA.tS/2); // Bottom Mid
            gA.ctx.m.lineTo(( this.tX+gA.tS )-gA.tS/4, this.tY); //Top Right
            gA.ctx.m.closePath();
            gA.ctx.m.fillStyle = '#fff';
            gA.ctx.m.fill();
          } else if (map[y][x] === 11) {
            gA.ctx.m.fillStyle = '#00f';
            gA.ctx.m.fillRect(this.tX, this.tY, gA.tS, gA.tS);
          }
        }
      }
    };
  }

  return {
    init: init, //For drawing the map
    curr: map, //Current map
    check: mapAround //The box being checked around the player
  };

})();

