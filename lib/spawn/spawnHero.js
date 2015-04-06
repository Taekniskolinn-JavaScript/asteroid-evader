module.exports = function spawnHero() {
  app.hero = {
    type: 'hero',
    pos: {x:app.width/2, y:app.height-100},
    roll: 0,
    angle: 0,
    size: 90,
    image: app.shipImage
  };
  app.objects.push(app.hero);
};
