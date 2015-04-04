(function () {

var app = {
  state: 0,
  score: 0,
  explosionTimer: 0,

  EXPLOSION_MAX_TIME: 2,
  STATE_PLAY: 1,
  STATE_END: 0
};

(function initGame() {
  var canvas = document.getElementById("canvas");
  app.ctx = canvas.getContext("2d");

  scaleCanvas();

  // load assets
  app.shipImage = new Image();
  app.shipImage.src = "images/ship.png"; // http://www.over00.com/index.php/archives/1844

  app.rockImage = new Image();
  app.rockImage.src = "images/rock.png"; // http://www.zimnox.com/resources/textures/

  app.explosionImage = new Image();
  app.explosionImage.src = "images/explosion.png"; // http://dbszabo1.deviantart.com/art/misc-explosion-element-png-309933232
  
  app.explosionSound = new Audio();
  app.explosionSound.src = "audio/explosion.wav"; // https://www.freesound.org/people/ryansnook/sounds/110113/

  app.themesongSound = new Audio();
  app.themesongSound.src = "audio/gunman.wav"; // http://www.playonloop.com/2012-music-loops/gunman/
  app.themesongSound.loop = true;
  app.themesongSound.play();

  // register events
  canvas.addEventListener("mousemove", handleMouseMove, false);
  window.addEventListener("resize", handleWindowResize, false);
  document.addEventListener("keypress", handleDocumentKeypress, false);

  // animation loop
  animationLoop();
})();

function startGame() {
  clearCanvas();

  // reset state
  app.state = app.STATE_PLAY;
  app.score = 0;
  app.explosionTimer = 0;
  app.explosionSound.pause();
  app.explosionSound.currentTime = 0;

  // list of objects
  app.objects = [];
  
  // create hero and world objects
  spawnHero();
  spawnStars();
  spawnAllRocks();
}

function clearCanvas() {
  var ctx = app.ctx;
  ctx.fillStyle = "#000020";
  ctx.fillRect(0, 0, app.width, app.height);
}

function scaleCanvas() {
  app.width = app.ctx.canvas.width = window.innerWidth;
  app.height = app.ctx.canvas.height = window.innerHeight;
}

function animationLoop() {
  window.requestAnimationFrame(frameUpdate);
}

function frameUpdate(timestamp) {
  animationLoop();

  if (app.state === app.STATE_END && app.score === 0) {
    drawIntro();
    return;
  }

  // delta time calculation
  if (!app.lastTimeStamp) {
    app.lastTimeStamp = timestamp;
  }
  var dt = (timestamp - app.lastTimeStamp)/1000;
  app.lastTimeStamp = timestamp;

  // score
  if (app.state === app.STATE_PLAY) {
    app.score += (dt * 10);
  }

  // explosion timer
  if (app.explosionTimer > 0) {
    app.explosionTimer += dt;

    if (app.explosionTimer > app.EXPLOSION_MAX_TIME) {
      app.explosionTimer = 0;
    }
  }

  // object update loop
  var i = app.objects.length;
  while (i--) {
    var o = app.objects[i];

    if (o.roll) {
      o.angle += o.roll * dt;
    }

    if (o.type === "rock") {
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
      if (app.state === app.STATE_PLAY) {
        var dx = o.pos.x - app.hero.pos.x;
        var dy = o.pos.y - app.hero.pos.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 80) {
          app.state = app.STATE_END;
          app.explosionTimer = 0.1;
          app.explosionSound.play();
        }
      }
    }
  }

  // redraw everything
  drawScene();

  // draw game over
  if (app.state === app.STATE_END) {
    drawGameOver();
  }
}

function drawIntro() {
  clearCanvas();

  var ctx = app.ctx;

  // draw name
  ctx.textAlign = "center";
  ctx.fillStyle = "#00ffff";
  ctx.font = "130px Calibri";
  ctx.fillText("Asteroid Evader", app.width/2, app.height/4);

  // draw instructions
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = "20px Calibri";
  ctx.fillText("Use mouse to navigate ship through asteroid field", app.width/2, app.height/2);

  // draw start
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = "italic 20px Calibri";
  ctx.fillText("(press any key to play)", app.width/2, app.height/2+50);
}

function drawGameOver() {
  var ctx = app.ctx;
  ctx.textAlign = "center";
  ctx.fillStyle = "#00ffff";
  ctx.font = "italic 130px Calibri";
  ctx.fillText("Game Over", app.width/2, app.height/2);

  // draw start
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = "italic 20px Calibri";
  ctx.fillText("(press any key to play again)", app.width/2, app.height/2+50);
}

function drawScene() {
  clearCanvas();

  var ctx = app.ctx;

  // draw the explosion
  if (app.explosionTimer > 0) {
    var interp = app.explosionTimer / app.EXPLOSION_MAX_TIME;

    ctx.save();
      ctx.globalAlpha = 1 - interp;
      ctx.translate(app.hero.pos.x, app.hero.pos.y);
      ctx.drawImage(app.explosionImage, -app.hero.size/2, -app.hero.size/2, 150, 150);
    ctx.restore();
  }

  // draw all objects
  for (var i=0; i<app.objects.length; i++) {
    var o = app.objects[i];

    if (o.type === "hero" && app.state !== app.STATE_PLAY) {
      continue;
    }

    ctx.save();
    if (o.type === "star") {
      ctx.beginPath();
      ctx.globalAlpha = o.brightness;
      ctx.fillStyle = o.color;
      ctx.arc(o.pos.x, o.pos.y, o.radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    } else {
      ctx.translate(o.pos.x, o.pos.y);
      ctx.rotate(o.angle);
      ctx.drawImage(o.image, -o.size/2, -o.size/2, o.size, o.size);
    }
    ctx.restore();
  }

  // draw score
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = "italic 30px Calibri";
  ctx.fillText("Score " + Math.floor(app.score), app.width/2, 30);
}

function spawnStars() {
  // http://codepen.io/iblamefish/pen/xgefG?editors=001
  var STAR_COLOURS = ["#ffffff", "#ffe9c4", "#d4fbff"];
  function random(min, max) {
    return Math.round((Math.random() * max - min) + min);
  }

  for (var i=0; i<500; i++) {
    app.objects.push({
      type: "star",
      pos: {x: Math.random() * app.width, y: Math.random() * app.height},
      radius: Math.random() * 1.1,
      brightness: random(80, 100) / 100,
      color: STAR_COLOURS[random(0, STAR_COLOURS.length)]
    });
  }
}

function spawnHero() {
  app.hero = {
    type: "hero",
    pos: {x:app.width/2, y:app.height-100},
    roll: 0,
    angle: 0,
    size: 90,
    image: app.shipImage
  };
  app.objects.push(app.hero);
}

function spawnRock() {
  app.objects.push({
    type: "rock",
    pos: {x:Math.random() * app.width, y:Math.random() * -app.height},
    angle: Math.random() * Math.PI * 2,
    roll: Math.random() * Math.PI * 2 - Math.PI,
    speed: Math.random() * 150 + 100,
    size: 90,
    image: app.rockImage
  });
}

function spawnAllRocks() {
  var count = Math.round(app.width / 100);
  for (var i=0; i<count; i++) {
    spawnRock();
  }
}

function handleMouseMove(e) {
  if (app.state !== app.STATE_PLAY) {
    return;
  }

  app.hero.pos.x = e.pageX - app.ctx.canvas.offsetLeft;
  app.hero.pos.y = e.pageY - app.ctx.canvas.offsetTop;
}

function handleWindowResize(e) {
  scaleCanvas();
}

function handleDocumentKeypress(e) {
  if (app.state == app.STATE_END) {
    startGame();
  }
}

})();
