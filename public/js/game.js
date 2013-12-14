/*global define*/
define([
  'render'
], function(render){
  var fps = 60;
  var interval = 1000 / fps;
  var lastTime = (new Date()).getTime();
  var currentTime = 0;
  var delta = 0;

  function gameLoop() {
    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime);
    window.requestAnimationFrame(gameLoop);

    if (delta > interval) {
      lastTime = currentTime - (delta % interval);
      render();
    }
  }

  return gameLoop;
});
