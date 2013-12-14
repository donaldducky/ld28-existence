/*global define*/
define([
  'underscore'
], function(_){
  return function(GameSystem) {
    _.each(GameSystem.getEntities(), function(entity) {
      if (entity.scaleX) {
        entity.width += entity.scaleX;
        // re-center after scaling
        entity.x -= entity.scaleX / 2;
      }
      if (entity.scaleY) {
        entity.height += entity.scaleY;
        // re-center after scaling
        entity.y -= entity.scaleY / 2;
      }

      if (entity.speedX) {
        entity.x += entity.speedX;
      }

      if (entity.speedY) {
        entity.y += entity.speedY;
      }

      if (entity.speedYIncrement) {
        entity.speedYCounter += entity.speedYIncrement;
        entity.y += Math.sin(entity.speedYCounter);
      }
    });
  };
});
