var constants = require('../constants');
var clearCanvas = require('../draw/clearCanvas');
var formatNumber = require('../utils/formatNumber');

module.exports = function drawScene() {
  clearCanvas();

  var ctx = app.ctx;

  // draw all objects
  for (var i=0; i<app.objects.length; i++) {
    var o = app.objects[i];

    if (o.type === 'hero' && app.state !== constants.STATE_PLAY) {
      continue;
    }

    ctx.save();
    if (o.type === 'star') {
      ctx.beginPath();
      ctx.globalAlpha = o.brightness;
      ctx.fillStyle = o.color;
      ctx.arc(o.pos.x, o.pos.y, o.radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    } else if (o.type === 'text') {
      ctx.globalAlpha = 1 - (o.timer / constants.TEXT_MAX_TIME);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#00ffff';
      ctx.font = '20px Calibri';
      ctx.fillText(o.text, o.pos.x, o.pos.y);
    } else {
      if (o.alpha) {
        var alpha;
        if (typeof o.alpha === 'function') {
          alhpa = o.alpha();
        } else {
          alpha = o.alpha;
        }
        ctx.globalAlpha = alpha;
      }
      
      var factor = 1;
      if (o.type === 'explosion') {
        factor = 2;
      }

      ctx.translate(o.pos.x, o.pos.y);
      ctx.rotate(o.angle);
      ctx.drawImage(o.image, -o.size/2, -o.size/2, o.size * factor, o.size * factor);
    }
    ctx.restore();
  }

  // draw score
  if (app.score > 0) {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = 'italic 30px Calibri';
    ctx.fillText('Score ' + formatNumber(Math.floor(app.score)), app.width/2, 50);
  }
};
