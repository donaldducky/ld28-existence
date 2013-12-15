define([
], function(){
  // entity: the one that triggered the action
  // game: the current game state
  // mapX: map coordinate of the occurrence
  // mapY: map coordinate of the occurrence
  var actions = {
    woof: function(entity, game, x, y) {
      console.log('woof @', x, y);
    },
    world_tree: function(entity, game, x, y) {
      console.log('interacted with tree @', x, y);
    },

    cave_entrance: function(entity, game, x, y) {
      console.log('cave entrance');
      game.loadMap('cave', { x: 11, y: 0 });
    },

    cave_exit: function(entity, game, x, y) {
      console.log('cave exit');
      game.loadMap('world', { x: 11, y: 0 });
    }
  };

  return actions;
});
