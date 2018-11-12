THIS IS A FINISHED VERSION
though it doesn't have all of the polish

Large parts to be added
-----------------------------
Canvas resizing
- Level Creation
+ Stats overview -- main menu
- Music/Sounds

Small details to be added
-----------------------------
+ Screen shake on spike collision
+ Death count variables
+ Timer variables
+ Stats overview -- pause menu
- Credits

Sounds Needed
- Jump sound
- Death sound
- Portal sound
+ spawn/respawn sound
+ focus sound
- timer 10 second sound
- timer last 5 seconds sound
+ Menu cursor move sound
  slide in sounds for intro/pause

Possible Musics
Background music (faint hums like stone in focus by aphex twin)
title music (might be the same stuff idk)

TODO:
  Build levels, ---------------------DONE
  Add a few new effects (colors/color flips), ----------------------DONE

  a few more sounds,
  Work on screen sizing,

  Remove extra dev code,
  Clean up code

Bugs:
  When spawning if you exit the level you spawn in the wrong spot when going to new game.

Compress audio to small ogg
ffmpeg -i <input file> -c:a libvorbis -qscale 1 -ar 8000 output.ogg
this is smaller than just
ffmpeg -i <input file> output.ogg
