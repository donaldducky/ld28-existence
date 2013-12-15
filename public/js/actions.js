define([
], function(){
  // triggerEntity: the one that triggered the action
  // game: the current game state
  // mapX: map coordinate of the occurrence
  // mapY: map coordinate of the occurrence
  // entity: the entity this action belongs to (ie. entity.action)
  var actions = {
    woof: function(triggerEntity, game, x, y, entity) {
      console.log('woof @', x, y, entity);
    },
    world_tree: function(triggerEntity, game, x, y, entity) {
      console.log('interacted with tree @', x, y);
    },

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
