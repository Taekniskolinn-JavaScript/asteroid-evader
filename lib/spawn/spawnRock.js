var constants = require('../constants');

module.exports = function spawnRock() {
  var size = constants.ROCK_SIZES[Math.floor(Math.random() * constants.ROCK_SIZES.length)];
  var points = size / 10;
  var image = app.asteroids[Math.floor(Math.random() * app.asteroids.length)];

  app.objects.push({
    type: 'rock',
    pos: {x:Math.random() * app.width, y:Math.random() * -app.height},
    angle: Math.random() * Math.PI * 2,
    roll: Math.random() * Math.PI * 2 - Math.PI,
    speed: Math.random() * 150 + 100,
    size: size,
    points: points,
    image: image
  });
};
