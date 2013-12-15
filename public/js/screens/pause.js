define([
  'backbone'
], function(Backbone){

  var PauseScreen = function() {
  };

  PauseScreen.prototype = {
    render: function(ctx, width, height) {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '30px Arial';
      ctx.fillText('Paused', width/2 - 50, height/2 + 12);
      ctx.restore();
    }
  };

  return PauseScreen;
});
