var app = {
  state: 1,
  score: 0,
  explosionTimer: 0,

  EXPLOSION_MAX_TIME: 2,
  STATE_PLAY: 1,
  STATE_END: 0
};

function startGame() {
  app.canvas = document.getElementById("canvas");
  app.ctx = app.canvas.getContext("2d");

  scaleCanvas();

  // load images
  // http://www.over00.com/index.php/archives/1844
  app.shipImage = new Image();
  app.shipImage.src = "images/ship.png";

  // http://www.zimnox.com/resources/textures/
  app.rockImage = new Image();
  app.rockImage.src = "images/rock.png";

  // http://dbszabo1.deviantart.com/art/misc-explosion-element-png-309933232
  app.explosionImage = new Image();
  app.explosionImage.src = "images/explosion.png";

  // load audio
  // https://www.freesound.org/people/ryansnook/sounds/110113/
  app.explosionSound = new Audio();
  app.explosionSound.src = "audio/explosion.wav";

  // http://www.playonloop.com/2012-music-loops/gunman/
  app.themesongSound = new Audio();
  app.themesongSound.src = "audio/gunman.wav";
  app.themesongSound.loop = true;
  app.themesongSound.play();

  // list of objects
  app.objects = [];
  
  // create hero and random rocks
  spawnHero();
  spawnAllRocks();

  // register events
  canvas.addEventListener("mousemove", handleMouseMove, false);
  window.addEventListener("resize", handleWindowResize, false);
  
  // animation loop
  animationLoop();
}

function scaleCanvas() {
  app.width = app.canvas.width = window.innerWidth;
  app.height = app.canvas.height = window.innerHeight;
}

function animationLoop() {
  window.requestAnimationFrame(frameUpdate);
}

function frameUpdate(timestamp) {
  animationLoop();

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
}

function drawScene() {
  var ctx = app.ctx;

  // fill background
  ctx.fillStyle = "#000020";
  ctx.fillRect(0, 0, app.width, app.height);

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
      ctx.translate(o.pos.x, o.pos.y);
      ctx.rotate(o.angle);
      ctx.drawImage(o.image, -o.size/2, -o.size/2, o.size, o.size);
    ctx.restore();
  }

  // draw score
  ctx.textAlign = "center";
  ctx.fillStyle = "#00ffff";
  ctx.font = "italic 30px Calibri";
  ctx.fillText("Score " + Math.floor(app.score), app.width/2, 30);

  if (app.state === app.STATE_END) {
    ctx.textAlign = "center";
    ctx.fillStyle = "#00ffff";
    ctx.font = "italic 130px Calibri";
    ctx.fillText("Game Over", app.width/2, app.height/2);
  }
}

function spawnHero() {
  app.hero = {
    type: "hero",
    pos: {x:400, y:500},
    roll: 0,
    angle: 0,
    size: 90,
    image: app.shipImage
  };
  app.objects.push(app.hero);
}

function spawnRock() {
  var o = {
    type: "rock",
    pos: {x:Math.random() * app.width, y:Math.random() * -app.height},
    angle: Math.random() * Math.PI * 2,
    roll: Math.random() * Math.PI * 2 - Math.PI,
    speed: Math.random() * 150 + 100,
    size: 90,
    image: app.rockImage
  };
  app.objects.push(o);
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

  app.hero.pos.x = e.pageX - app.canvas.offsetLeft;
  app.hero.pos.y = e.pageY - app.canvas.offsetTop;
}

function handleWindowResize(e) {
  scaleCanvas();
}
