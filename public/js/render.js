/*global define*/
define([
  'jquery'
], function($){
  var frame = 0;
  var prevTime = (new Date()).getTime();
  var curTime;
  var elapsed = 0;
  function render() {
    frame++;
    curTime = (new Date()).getTime();
    elapsed += curTime - prevTime;
    if (elapsed > 1000) {
      $('#fps').text(frame);
      frame = 0;
      elapsed = 0;
    }
    prevTime = curTime;
  }

  return render;
});
