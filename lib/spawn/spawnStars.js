// http://codepen.io/iblamefish/pen/xgefG?editors=001
var STAR_COLOURS = ['#ffffff', '#ffe9c4', '#d4fbff'];

function random(min, max) {
  return Math.round((Math.random() * max - min) + min);
}

module.exports = function spawnStars() {  
  for (var i=0; i<500; i++) {
    app.objects.push({
      type: 'star',
      pos: {x: Math.random() * app.width, y: Math.random() * app.height},
      radius: Math.random() * 1.1,
      brightness: random(80, 100) / 100,
      color: STAR_COLOURS[random(0, STAR_COLOURS.length)]
    });
  }
};
