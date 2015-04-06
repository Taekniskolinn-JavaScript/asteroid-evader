module.exports = function scaleCanvas() {
  app.width = app.ctx.canvas.width = window.innerWidth;
  app.height = app.ctx.canvas.height = window.innerHeight;
};
