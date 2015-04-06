var constants = require('../constants');
var drawGameOver = require('../draw/drawGameOver');
var drawIntro = require('../draw/drawIntro');
var drawScene = require('../draw/drawScene');
var spawnExplosion = require('../spawn/spawnExplosion');
var spawnRock = require('../spawn/spawnRock');
var spawnText = require('../spawn/spawnText');
var detectCollision = require('../utils/detectCollision');

module.exports = function frameUpdate(timestamp) {
  // animation loop
  window.requestAnimationFrame(frameUpdate);
 
  // delta time calculation
  if (!app.lastTimeStamp) {
    app.lastTimeStamp = timestamp;
  }
  var dt = (timestamp - app.lastTimeStamp)/1000;
  app.lastTimeStamp = timestamp;

  // score
  if (app.state === constants.STATE_PLAY) {
    app.score += (dt * 10);

    // increase difficulty
    if (Math.floor(app.score / 100) > app.difficulty) {
      app.difficulty++;
      spawnRock();
    }
  }

  // object update loop
  var i = app.objects.length;
  while (i--) {
    var o = app.objects[i];

    if (o.roll) {
      o.angle += o.roll * dt;
    }

    if (o.type === 'laser') {
      // move laser
      if (o.speed) {
        o.pos.y -= o.speed * dt;
      }

      // check for laser off the top
      if (o.pos.y + o.size < 0) {
        app.objects.splice(i, 1);
      }

      // detect collision
      if (app.state === constants.STATE_PLAY) {
        var j = app.objects.length;
        while (j--) {
          var e = app.objects[j];
          if (e.type !== 'rock') {
            continue;
          }

          if (detectCollision(o, e, 50)) {
            app.score += e.points;
            app.objects.splice(j, 1);
            app.objects.splice(i - 1, 1);
            spawnExplosion(e, 5, 0.5);
            spawnText('+' + e.points, dt, e);
            spawnRock();
            break;
          }
        }
      }
    }

    if (o.type === 'explosion') {
      // update explosion timer
      o.timer += dt * o.speed;
      if (o.timer > constants.EXPLOSION_MAX_TIME) {
        app.objects.splice(i, 1);
      }
    }

    if (o.type === 'text') {
      // update text timer
      o.timer += dt;
      if (o.timer > constants.TEXT_MAX_TIME) {
        app.objects.splice(i, 1);
      }
    }

    if (o.type === 'rock') {
      // move rock
      if (o.speed) {
        o.pos.y += o.speed * dt;
      }

      // check for rock off the bottom, respawn at top
      if (o.pos.y - o.size > app.height) {
        app.objects.splice(i, 1);
        spawnRock();
      }

      // collision detection
      if (app.state === constants.STATE_PLAY) {
        if (detectCollision(o, app.hero, 80)) {
          app.state = constants.STATE_END;
          // this prevents player from having to press key
          // twice to start game if they weren't holding key
          // down when the game ended
          if (app.keyDown) {
            app.gameEnded = true;
          }
          spawnExplosion(app.hero);
        }
      }
    }
  }

  // redraw everything 
  drawScene();

  // draw intro/game over
  if (app.state === constants.STATE_END) {
    if (app.score === 0) {
      drawIntro();
    } else {
      drawGameOver();
    }
  }
};
