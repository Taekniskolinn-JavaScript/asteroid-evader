module.exports = function playSound(which, volume) {
  var sound = app[which + 'Sound'];
  if (sound) {
    sound.pause();
    sound.volume = volume || 1;
    sound.currentTime = 0;
    sound.play();
  }
};
