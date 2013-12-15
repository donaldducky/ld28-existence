define([
  'underscore'
], function(_){
  // triggerEntity: the one that triggered the action
  // game: the current game state
  // mapX: map coordinate of the occurrence
  // mapY: map coordinate of the occurrence
  // entity: the entity this action belongs to (ie. entity.action)
  var actions = {
    woof: _.throttle(function(triggerEntity, game, x, y, entity) {
      game.talk(entity, 'woof');
    }, 100),

    world_tree: _.throttle(function(triggerEntity, game, x, y, entity) {
      game.talk(entity, 'I\'m just a tree!');
    }, 500),

    cave_entrance: function(triggerEntity, game, x, y) {
      console.log('cave entrance');
      game.loadMap('cave', { x: 11, y: 0 });
    },

    cave_exit: function(triggerEntity, game, x, y) {
      console.log('cave exit');
      game.loadMap('world', { x: 11, y: 0 });
    }
  };

  return actions;
});
