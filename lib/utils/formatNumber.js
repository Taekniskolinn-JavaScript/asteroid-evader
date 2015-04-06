module.exports = function formatNumber(num) {
  var parts = String(num).split('');
  var formatted = '';
  
  var i = parts.length;
  var count = 0;
  while (i--) {
    formatted += parts[i];
    if (++count === 3 && i !== 0) {
      formatted += ',';
      count = 0;
    }
  }

  return formatted.split('').reverse().join('');
};
