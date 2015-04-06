var constants = require('../constants');
var clearCanvas = require('../draw/clearCanvas');
var spawnHero = require('../spawn/spawnHero');
var spawnStars = require('../spawn/spawnStars');
var spawnAllRocks = require('../spawn/spawnAllRocks');

module.exports = function startGame() {
  clearCanvas();

  // reset state
  app.state = constants.STATE_PLAY;
  app.score = 0;
  app.difficulty = 0;

  // list of objects
  app.objects = [];
  
  // create hero and world objects
  spawnHero();
  spawnStars();
  spawnAllRocks();
};
