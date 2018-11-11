gA.ctx = (function() {
  "use strict";

  var canvas = document.getElementById('canvas'),
    c = canvas.getContext('2d');

  return {
    gCanv: canvas,
    g: c
  };

})();
