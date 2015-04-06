var constants = require('../constants');
var handleShotFiredTimeout = require('../events/handleShotFiredTimeout');
var playSound = require('../utils/playSound');

module.exports = function spawnLaser() {
  // no shooting when game's over
  if (app.state === constants.STATE_END) {
    return;
  }

  // throttle rate of fire
  if (app.shotFired) {
    return;
  } else {
    app.shotFired = true;
    setTimeout(handleShotFiredTimeout, 250);
  }

  app.objects.push({
    type: 'laser',
    pos: {x:app.hero.pos.x, y:app.hero.pos.y - 60},
    roll: 0,
    angle: 0,
    speed: 500,
    size: 80,
    image: app.laserImage
  });
  playSound('laser');
};
