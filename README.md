This engine has two version of collision checking that are defined in
collision.js

You can find them at the bottom of the collision.js file being returned.
The first is probably much slower than the second, it loops through the full
map.

  checkFull: checkMove,


The second should be much faster as it makes a second array that is used to
check around the player and nothing more. So it has a max loop of 9, while
the previous collision check will be as large as the defined map size.

  checkAround: smartMove,
