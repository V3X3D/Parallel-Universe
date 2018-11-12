gA.sound = (function() {
  "use strict";

  var jump = new Audio('sound/jump.mp3'),
    flatline = new Audio('sound/flatline.mp3'),
    focus = new Audio('sound/focus.mp3'),
    respawn = new Audio('sound/respawn.mp3'),
    portal = new Audio('sound/portal.mp3'),
    swipe = new Audio('sound/swipe.mp3'),
    timer = new Audio('sound/timer.mp3');

  var volumeSet = function() {
    jump.volume = gA.masterVolume;
    flatline.volume = gA.masterVolume;
    focus.volume = gA.masterVolume;
    respawn.volume = gA.masterVolume;
    portal.volume = gA.masterVolume;
    swipe.volume = gA.masterVolume;
    timer.volume = gA.masterVolume;
    gA.heart.vol();
  };
  volumeSet();

  var ambient = function() {
    var audio = [], played = false, timeoutOver = true, amt = 0.03, volume, i, duration, timeout;
    for(i=0; i<2; i+=1) audio.push(new Audio('sound/ambient.mp3'));

    audio[0].addEventListener('loadedmetadata', function() { duration = audio[0].duration; }, false);

    this.fade = false;
    this.volumeFade = function() {
      if(gA.masterVolume-amt >= 0) volume = gA.masterVolume-amt;
      else volume = 0;
      amt += 0.035;
      audio[0].volume = volume;
    };
    this.volumeSet = function() {
      volume = gA.masterVolume;
      audio[0].volume = volume;
    };
    this.play = function() {
      if(this.fade) this.volumeFade();
      else this.volumeSet();
      if(!played) {
        audio[0].play();
        played = true;
      }
      if(timeoutOver) {
        timeoutOver = false;
        var timeout = setTimeout(function() {
          audio.push(audio.shift());
          timeoutOver = true;
          played = false;
        }, duration*930);
      }
    };
    this.pause = function() {
      amt = 0.03;
      audio[0].pause();
      audio[0].currentTime = 0;
      clearTimeout(timeout);
      played = false;
    };
  };

  var death = function() {
    var audio = [], i; //load multiple of an audio element for cycling (lets sound overlap)
    for(i=0; i<3; i+=1) audio.push(new Audio('sound/death.mp3'));

    this.play = function() {
      audio[0].volume = gA.masterVolume;
      audio[0].play();
      audio.push(audio.shift()); //moving element that just played [0], to end of array
    };
  };

  // var swipe = function() {
  //   var audio = [], i; //load multiple of an audio element for cycling (lets sound overlap)
  //   for(i=0; i<3; i+=1) audio.push(new Audio('sound/swipe.mp3'));

  //   this.play = function() {
  //     audio[0].volume = gA.masterVolume;
  //     audio[0].play();
  //     audio.push(audio.shift()); //moving element that just played [0], to end of array
  //   };
  // };

  var cursor = function() {
    var audio = [], i; //load multiple of an audio element for cycling (lets sound overlap)
    for(i=0; i<3; i+=1) audio.push(new Audio('sound/cursor.ogg'));

    this.play = function() {
      audio[0].volume = gA.masterVolume;
      audio[0].play();
      audio.push(audio.shift()); //moving element that just played [0], to end of array
    };
  };

  return { jump, ambient: new ambient, death: new death, flatline, focus, respawn, portal, swipe, timer, cursor: new cursor, volumeSet: volumeSet };
})();
