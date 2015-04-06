var spawnRock = require('./spawnRock');

module.exports = function spawnAllRocks() {
  for (var i=0; i<10; i++) {
    spawnRock();
  }
};
