define([
  'underscore',
  'actions'
], function(_, actions){
  return function(GameSystem) {
    _.chain(GameSystem.getEntities()).filter(function(entity) {
      return entity.animate;
    }).each(function(entity) {
      entity.frameCount++;
      if (entity.frameCount % entity.frameSpeed === 0) {
        var frames = entity.frames;
        var curFrameId = entity.spriteId;
        var curFrame = _.indexOf(frames, curFrameId);
        var nextFrame = curFrame + 1;
        if (frames[nextFrame]) {
          entity.spriteId = frames[nextFrame];
        } else if (entity.loopAnimation) {
          entity.spriteId = frames[0];
        } else {
          entity.animate = false;
          if (entity.onStopAnimation) {
            actions[entity.onStopAnimation](entity, GameSystem);
          }
        }
      }
    });
  };
});
