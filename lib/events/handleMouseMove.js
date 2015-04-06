var constants = require('../constants');

module.exports = function handleMouseMove(e) {
  if (app.state !== constants.STATE_PLAY) {
    return;
  }

  app.hero.pos.x = e.pageX - app.ctx.canvas.offsetLeft;
  app.hero.pos.y = e.pageY - app.ctx.canvas.offsetTop;
};
