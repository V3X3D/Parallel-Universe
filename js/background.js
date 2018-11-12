gA.background = (function() {
  "use strict";

  //All panes
  var array = [];

  var pane = function(sequence) {
    this.x = sequence.x;
    this.y = sequence.y;
    this.w = sequence.w;
    this.h = sequence.h;
    this.sequence = sequence.bind(this)();

    this.update = function() {
      this.sequence.logic();
    };
    this.render = function() {
      gA.ctx.b.fillStyle = 'black';
      this.sequence.draw();
    };
  };

  //For updating and render panes
  var init = function() {
    var i;

    array.push(new pane(sequence1));
    // array.push(new pane(sequence4));

    this.update = function() {
      for(i = 0; i < array.length; i += 1) array[i].update();
    };
    this.render = function() {
      for(i = 0; i < array.length; i += 1) array[i].render();
    };
  };

  //Top to Bottom
  function sequence1() {
    var x = 0;
    var y = -gA.cH;
    var w = gA.cW;
    var h = gA.cH;

    var logic = function() {
      this.y += 2/gA.scale;
      if(this.y > gA.cH) this.y = -gA.cH;
    };
    var draw = function() {
      gA.ctx.b.fillRect(this.x, this.y, this.w, this.h);
    };

    return {
      x: x,
      y: y,
      w: w,
      h: h,
      logic: logic,
      draw: draw
    };
  }

  //Bottom to Top
  function sequence2() {
    var x = 0;
    var y = gA.cH;
    var w = gA.cW;
    var h = gA.cH;

    var logic = function() {
      this.y -= 2/gA.scale;
      if(this.y+this.h < 0) this.y = gA.cH;
    };
    var draw = function() {
      gA.ctx.b.fillRect(this.x, this.y, this.w, this.h);
    };

    return {
      x: x,
      y: y,
      w: w,
      h: h,
      logic: logic,
      draw: draw
    };
  }

  //Top half from left to right
  function sequence3(sequence) {
    var x = -gA.cW;
    var y = 0;
    var w = gA.cW;
    var h = gA.cH/2;

    var logic = function() {
      this.x += 2/gA.scale;
      if(this.x >= gA.cW) this.x = -gA.cW;
    };
    var draw = function() {
      gA.ctx.b.fillRect(this.x, this.y, this.w, this.h);
    };

    if(sequence !== undefined) array.push(new pane(sequence));

    return {
      x: x,
      y: y,
      w: w,
      h: h,
      logic: logic,
      draw: draw
    };
  }
  //Bottom half from left to right
  function sequence4(sequence) {
    var x = 0;
    var y = gA.cH/2;
    var w = gA.cW;
    var h = gA.cH/2;

    var logic = function() {
      this.x += 2/gA.scale;
      if(this.x >= gA.cW) this.x = -gA.cW;
    };
    var draw = function() {
      gA.ctx.b.fillRect(this.x, this.y, this.w, this.h);
    };

    if(sequence !== undefined) array.push(new pane(sequence));

    return {
      x: x,
      y: y,
      w: w,
      h: h,
      logic: logic,
      draw: draw
    };
  }

  return {
    init: init
  };

})();

