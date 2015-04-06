module.exports = function drawGameOver() {
  var ctx = app.ctx;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#00ffff';
  ctx.font = 'italic 130px Calibri';
  ctx.fillText('Game Over', app.width/2, app.height/2);

  // draw start
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.font = 'italic 20px Calibri';
  ctx.fillText('(press any key to play again)', app.width/2, app.height/2+50);
};
