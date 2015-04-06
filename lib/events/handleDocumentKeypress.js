var constants = require('../constants');
var startGame = require('../core/startGame');
var spawnLaser = require('../spawn/spawnLaser');

module.exports = function handleDocumentKeypress(e) {
  // flag that key is down
  app.keyDown = true;

  // don't restart game if it's ended and player is still holding key (likely spacebar)
  if (app.state === constants.STATE_END && !app.gameEnded) {
    startGame();
  } else {
    if (e.which === 32) {
      spawnLaser();
    }
  }
};
