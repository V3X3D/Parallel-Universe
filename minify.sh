#!/bin/bash

uglifyjs js/main.js js/load-save.js js/context.js js/world/levels.js \
js/helpers/color-invert.js js/canvas.js js/transition.js \
js/world/nextLevel.js js/timer.js js/background/sequence.js \
js/world/entities.js js/background/bg.js js/world/map.js \
js/collision/segments.js js/collision/collision.js js/input.js \
js/hero/animations.js js/hero/player.js js/hero/blood.js js/world/camera.js \
js/hero/reset.js js/audio/heartbeat.js js/audio/sounds.js js/menus/intro.js \
js/menus/cursor.js js/menus/title.js js/menus/change.js js/menus/pause.js \
--compress --mangle --toplevel -o build/mini.js
