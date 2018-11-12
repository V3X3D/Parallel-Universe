gA.sound = (function() {
  "use strict";

  var jump = new Audio('sound/jump8.wav'),
    death = new Audio('sound/death.wav'),
    flatline = new Audio('sound/flatline.ogg'),
    focus = new Audio('sound/focus.wav'),
    respawn = new Audio('sound/respawn.wav'),
    portal = new Audio('sound/portal.ogg'),
    timer = new Audio('sound/timer1.wav');

  jump.volume = 0.2;
  death.volume = 0.35;
  flatline.volume = 0.2;
  focus.volume = 0.2;
  respawn.volume = 0.35;
  portal.volume = 0.15;
  timer.volume = 0.175;

  portal.playbackRate = 1.14;

  var cursor = function() {
    var audio = [], i; //load multiple of an audio element for cycling (lets sound overlap)
    for(i=0; i<3; i+=1) audio.push(new Audio('sound/cursor.ogg'));

    this.play = function() {
      audio[0].volume = 0.3;
      audio[0].play();
      audio.push(audio.shift()); //moving element that just played [0], to end of array
    };
  };

  return { jump, death, flatline, focus, respawn, portal, timer, cursor: new cursor };
})();
