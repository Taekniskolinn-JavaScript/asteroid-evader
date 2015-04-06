var frameUpdate = require('./frameUpdate');
var handleDocumentKeypress = require('../events/handleDocumentKeypress');
var handleDocumentKeyup = require('../events/handleDocumentKeyup');
var handleMouseMove = require('../events/handleMouseMove');
var handleWindowResize = require('../events/handleWindowResize');
var spawnStars = require('../spawn/spawnStars');
var scaleCanvas = require('../utils/scaleCanvas');

module.exports = function initGame() {
  var canvas = document.getElementById('canvas');
  app.ctx = canvas.getContext('2d');

  scaleCanvas();

  // load assets
  app.shipImage = new Image();
  app.shipImage.src = 'assets/images/ship.png'; // http://www.over00.com/index.php/archives/1844

  app.laserImage = new Image();
  app.laserImage.src = 'assets/images/laser.png'; //http://opengameart.org/content/lasers-and-beams

  app.rockImage1 = new Image();
  app.rockImage1.src = 'assets/images/rock1.png'; // http://www.zimnox.com/resources/textures/

  app.rockImage2 = new Image();
  app.rockImage2.src = 'assets/images/rock2.png'; // http://www.zimnox.com/resources/textures/

  app.rockImage3 = new Image();
  app.rockImage3.src = 'assets/images/rock3.png'; // http://www.zimnox.com/resources/textures/

  app.explosionImage = new Image();
  app.explosionImage.src = 'assets/images/explosion.png'; // http://dbszabo1.deviantart.com/art/misc-explosion-element-png-309933232
  
  app.laserSound = new Audio();
  app.laserSound.src = 'assets/audio/laser.wav'; // https://www.freesound.org/people/Julien%20Matthey/sounds/268344/
  
  app.explosionSound = new Audio();
  app.explosionSound.src = 'assets/audio/explosion.wav'; // https://www.freesound.org/people/ryansnook/sounds/110113/

  app.themesongSound = new Audio();
  app.themesongSound.src = 'assets/audio/gunman.wav'; // http://www.playonloop.com/2012-music-loops/gunman/
  app.themesongSound.loop = true;
  app.themesongSound.play();

  // register events
  canvas.addEventListener('mousemove', handleMouseMove, false);
  window.addEventListener('resize', handleWindowResize, false);
  document.addEventListener('keyup', handleDocumentKeyup, false);
  document.addEventListener('keypress', handleDocumentKeypress, false);

  // list of objects
  app.objects = [];
  app.asteroids = [app.rockImage1, app.rockImage2, app.rockImage3];

  // create stars
  spawnStars();

  // animation loop
  window.requestAnimationFrame(frameUpdate);
};
