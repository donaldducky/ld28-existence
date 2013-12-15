define([
  'underscore'
], function(_){
  // triggerEntity: the one that triggered the action
  // game: the current game state
  // mapX: map coordinate of the occurrence
  // mapY: map coordinate of the occurrence
  // entity: the entity this action belongs to (ie. entity.action)
  var actions = {

    //
    // cave
    //
    woof: _.throttle(function(triggerEntity, game, x, y, entity) {
      game.talk(entity, 'woof');
    }, 100),

    woof_saved: _.throttle(function(triggerEntity, game, x, y, entity) {
      game.talk(entity, 'thanks for saving me!');
      entity.action = 'woof_saved_2';
    }, 100),

    woof_saved_2: _.throttle(function(triggerEntity, game, x, y, entity) {
      game.talk(entity, 'i found some treasure');
      entity.action = 'woof_saved_3';
    }, 100),

    woof_saved_3: _.throttle(function(triggerEntity, game, x, y, entity) {
      game.talk(entity, 'you can have it!');
      entity.action = 'woof_saved';

      if (!entity.givenTreasure) {
        entity.givenTreasure = true;
        game.createMapEntity('treasure', {
          mapX: 11,
          mapY: 6,
          // bleh
          x: 11*32,
          y: 6*32,
          persist: true,
          action: 'woof_treasure'
        });
      }
    }, 100),

    woof_treasure: _.once(function(triggerEntity, game, x, y, entity) {
      game.giveHeroWeapon('fire');
      entity.spriteId = 'treasure_open';
    }),

    //
    // world
    //
    world_tree: _.throttle(function(triggerEntity, game, x, y, entity) {
      game.talk(entity, 'I\'m just a tree!');
    }, 500),

    //
    // traveling
    //
    cave_entrance: function(triggerEntity, game, x, y) {
      game.loadMap('cave', { x: 11, y: 0 });
    },

    cave_exit: function(triggerEntity, game, x, y) {
      game.loadMap('world', { x: 11, y: 0 });
    }
  };

  return actions;
});
