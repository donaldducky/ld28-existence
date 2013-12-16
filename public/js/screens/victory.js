define([
  'backbone'
], function(Backbone){

  var VictoryScreen = function() {
    this.isRendered = false;
    this.frameCount = 0;
    this.frames = [
      'frame1',
      'frame2',
      'frame3',
      'frame4',
      'frame5',
      'frame6',
      'frame7'
    ];
    this.nextFrame = 50;
  };

  VictoryScreen.prototype = {
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
      ctx.fillText('Congratulations!', 64, 64);
    },

    frame2: function(ctx, width, height) {
      ctx.fillText('You gave life a chance to shine...', 64, 128);
    },

    frame3: function(ctx, width, height) {
      ctx.fillText('and now you have captured it.', 64, 160);
    },

    frame4: function(ctx, width, height) {
      ctx.fillText('Enjoy it, because...', 64, 224);
    },

    frame5: function(ctx, width, height) {
      ctx.font = '50px Arial';
      ctx.fillStyle = '#ff0';
      ctx.fillText('You Only Get One!', 64, 300);
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

  return VictoryScreen;
});
