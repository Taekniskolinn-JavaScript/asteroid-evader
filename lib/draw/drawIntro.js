module.exports = function drawIntro() {
  var ctx = app.ctx;

  // draw name
  ctx.textAlign = 'center';
  ctx.fillStyle = '#00ffff';
  ctx.font = '130px Calibri';
  ctx.fillText('Asteroid Evader', app.width/2, app.height/4);

  // draw instructions
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.font = '20px Calibri';
  ctx.fillText('Use mouse to navigate ship through asteroid field', app.width/2, app.height/2);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.font = '20px Calibri';
  ctx.fillText('Press spacebar to shoot lasers', app.width/2, app.height/2+25);

  // draw start
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.font = 'italic 20px Calibri';
  ctx.fillText('(press any key to play)', app.width/2, app.height/2+75);
};
