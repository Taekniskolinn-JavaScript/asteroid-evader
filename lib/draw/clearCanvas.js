module.exports = function clearCanvas() {
  var ctx = app.ctx;
  ctx.fillStyle = '#000020';
  ctx.fillRect(0, 0, app.width, app.height);
};
