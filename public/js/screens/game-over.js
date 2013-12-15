define([
  'backbone'
], function(Backbone){

  var GameOverScreen = function() {
    this.isRendered = false;
  };

  GameOverScreen.prototype = {
    render: function(ctx, width, height) {
      if (this.isRendered) {
        return;
      }
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '30px Arial';
      var alignX = width / 2 - 70;
      ctx.fillText('Game Over', alignX, height/2 - 12);
      ctx.font = '18px Arial';
      ctx.fillText("press 'r' to restart", alignX, height/2 + 24);
      ctx.restore();
      this.isRendered = true;
    }
  };

  return GameOverScreen;
});
