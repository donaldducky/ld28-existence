/*global define*/
define([
  'underscore'
], function(_){
  return function(entities) {
    // TODO get by properties
    _.each(entities, function(entity) {
      if (entity.removeAtX && entity.x >= entity.removeAtX) {
        entity.destroyed = true;
      }
    });

    return _.reject(entities, function(entity) {
      return entity.destroyed;
    });
  };
});
