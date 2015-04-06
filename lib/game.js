var initGame = require('./core/initGame');

//------------------------------
// Google Analytics
//------------------------------

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-50563344-2', 'auto');
ga('send', 'pageview');

//------------------------------
// Game Initialization
//------------------------------

app = {
  state: 0,
  score: 0,
  difficulty: 0,
  shotFired: false,
  gameEnded: false,
  keyDown: false
};

initGame();
