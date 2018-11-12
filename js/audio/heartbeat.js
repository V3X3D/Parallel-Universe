gA.heart = (function() {
  "use strict";

  var heartRate = 1;
  var heartBeat = new Audio('sound/heartbeat-pitch30.mp3');
  var beating = false;

  heartBeat.playbackRate = heartRate;
  heartBeat.loop = true;
  heartBeat.volume = gA.masterVolume;

  var heartPace = function(rate) {
    heartRate = rate;
    heartBeat.playbackRate = heartRate;
  };
  var heartVolume = function() { heartBeat.volume = gA.masterVolume; };
  var heartStart = function() { heartBeat.play(); beating = true; };
  var heartPause = function() { heartBeat.pause(); beating = false; };
  var heartStop = function() { heartBeat.pause(); heartBeat.currentTime = 0; beating = false; };
  var heartState = function() {
    if(beating) return true;
    else return false;
  };

  return {
    vol: heartVolume,
    pace: heartPace,
    start: heartStart,
    pause: heartPause,
    stop: heartStop,
    state: heartState
  };
})();

// More loop support
// https://stackoverflow.com/questions/3273552/html5-audio-looping
