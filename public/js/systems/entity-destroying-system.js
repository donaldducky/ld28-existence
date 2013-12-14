/*global define*/
define([
  'underscore'
], function(_){
  return function(GameSystem) {
    _.each(GameSystem.getEntities(), function(entity) {
      if (entity.removeAtX && entity.x >= entity.removeAtX) {
        entity.destroyed = true;
      }
    });

    var entities = _.reject(GameSystem.getEntities(), function(entity) {
      return entity.destroyed;
    });

    GameSystem.setEntities(entities);
  };
});
