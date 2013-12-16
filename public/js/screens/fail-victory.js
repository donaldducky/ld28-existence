define([
  'backbone'
], function(Backbone){

  var FailVictoryScreen = function() {
    this.isRendered = false;
    this.frameCount = 0;
    this.frames = [
      'frame1',
      'frame2',
      'frame3',
      'frame5',
      'frame6',
      'frame7'
    ];
    this.nextFrame = 50;
  };

  FailVictoryScreen.prototype = {
    render: function(ctx, width, height) {
      if (this.isRendered) {
        return;
      }

      if (this.frameCount % this.nextFrame === 0) {
        var method = this.frames.shift();
        this[method](ctx, width, height);
      }

      this.frameCount++;
    },

    frame1: function(ctx, width, height) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '30px Arial';
      ctx.fillText('You have destroyed life!', 64, 64);
    },

    frame2: function(ctx, width, height) {
      ctx.fillText('You Only Get One', 64, 128);
    },

    frame3: function(ctx, width, height) {
      ctx.fillText('What a pity...', 64, 192);
    },

    frame5: function(ctx, width, height) {
      ctx.fillStyle = '#f00';
      ctx.fillText("Press 'r' to give life another chance...", 64, 270);
    },

    frame6: function(ctx, width, height) {
      ctx.font = '30px Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText('Thanks for playing!', 64, 360);
    },

    frame7: function(ctx, width, height) {
      ctx.font = '20px Arial';
      ctx.fillText('Created for LD28 by Donald Chea', 64, 428);

      this.isRendered = true;
    }
  };

  return FailVictoryScreen;
});
