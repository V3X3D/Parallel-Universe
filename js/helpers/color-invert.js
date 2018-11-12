gA.invertClr = function(color) { return color ^= 0xff; };

gA.colorAjust = function(colors, flux, flip) {
  flip = flip || 127.5;
  for(i=0; i<colors.length; i+=1) {
    if(colors[i] !== undefined) {
      if(colors[i] < flip) colors[i] += flux;
      else if(colors[i] > flip) colors[i] -= flux;
    }

    if(colors[i] === undefined) colors[i] = 0;

    if(colors[i] < 0) colors[i] = 0;
    else if(colors[i] > 255) colors[i] = 255;
  }
  return colors;
};

