module.exports = function detectCollision(a, b, d) {
  var dx = a.pos.x - b.pos.x;
  var dy = a.pos.y - b.pos.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  return dist < d;
};
