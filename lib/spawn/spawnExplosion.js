var constants = require('../constants');
var playSound = require('../utils/playSound');

module.exports = function spawnExplosion(relative, speed, volume) {
  app.objects.push({
    type: 'explosion',
    alpha: function () { return 1 - (this.timer / constants.EXPLOSION_MAX_TIME); },
    timer: 0.1,
    pos: {x: relative.pos.x - (relative.size/2), y: relative.pos.y - (relative.size/2)},
    size: relative.size,
    speed: speed || 1,
    image: app.explosionImage
  });
  playSound('explosion', volume);
};
