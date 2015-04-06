module.exports = function spawnText(text, timer, relative) {
  app.objects.push({
    type: 'text',
    pos: relative.pos,
    text: text,
    timer: timer
  });
};
