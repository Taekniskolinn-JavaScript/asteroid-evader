var constants = require('../constants');

module.exports = function handleDocumentKeyup(e) {
  // flag that key is up
  app.keyDown = false;

  // reset flag that game has ended
  if (app.state === constants.STATE_END && app.gameEnded) {
    app.gameEnded = false;
  }
};
