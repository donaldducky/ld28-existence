/*global define*/
define([
  'underscore'
], function(_){
  return function(ctx, width, height, gridX, gridY) {
    ctx.beginPath();
    for (var x = 0.5; x < width; x+= gridX) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (var y = 0.5; y < height; y+= gridY) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#eee';
    ctx.stroke();
  };
});
