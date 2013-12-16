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

      // check if enemies are dead, just in case the last enemy killed
      // event didn't get triggered
      game.getMap().triggerEvent('onEnemyKilled');
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
          action: 'woof_treasure',
          contents: 'fire'
        });
      }
    }, 100),

    woof_tree_talk: _.throttle(function(triggerEntity, game, x, y, entity) {
      game.talk(entity, 'woof, i heard that tree');
      setTimeout(function() {
        game.talk(entity, 'outside has something...');
      }, 150);
    }, 500),

    woof_treasure: _.once(function(triggerEntity, game, x, y, entity) {
      game.giveHeroWeapon('fire');
      entity.spriteId = 'treasure_open';
      entity.action = 'treasure_opened';

      // find the dog
      var dogs = game.getEntities({ _type: 'dog' });
      _.each(dogs, function(dog) {
        dog.action = 'woof_tree_talk';
      });
    }),

    treasure_opened: _.throttle(function(triggerEntity, game, x, y, entity) {
      game.talk(entity, 'This treasure contained:');
      setTimeout(function() {
        game.talk(entity, entity.contents);
      }, 150);
    }, 500),

    //
    // world
    //
    world_tree: _.throttle(function(triggerEntity, game, x, y, entity) {
      var hero = game.getHero();
      if (_.contains(hero.projectiles, 'fire')) {
        entity.action = 'world_tree_fire';
        actions.world_tree_fire(triggerEntity, game, x, y, entity);
        entity.hp = 10;
        entity.hpMax = 10;
        entity.enemy = true;
        entity.fireDamageModifier = 1;
        entity.immune = true;
      } else {
        game.talk(entity, 'I\'m just a tree!');
      }
    }, 500),

    world_tree_fire: _.throttle(function(triggerEntity, game, x, y, entity) {
      game.talk(entity, 'Please don\'t burn me!');
    }, 500),

    world_tree_treasure: _.once(function(triggerEntity, game, x, y, entity) {
      entity.spriteId = 'treasure_open';
      entity.action = 'world_tree_switch';
      game.createMapEntity('data', {
        dataType: 'backgroundColor',
        dataValue: '#ccc'
      });

      // spawn some skeletons
      var positions = [
        [ 2, 4 ],
        [ 4, 5 ],
        [ 6, 6 ],
        [ 8, 7 ],
        [ 10, 8 ],
        [ 12, 10 ],
        [ 11, 12 ],
        [ 9, 13 ]
      ];

      _.each(positions, function(pos) {
        var mapX = pos[0];
        var mapY = pos[1];
        game.createMapEntity('skeleton', {
          ai: 'aggressive',
          aiTicks: 0,
          thinkSpeed: 100,
          hp: 10,
          hpMax: 10,
          x: 32 * mapX,
          y: 32 * mapY,
          mapX: mapX,
          mapY: mapY
        });
      });
    }),

    world_tree_switch: _.throttle(function(triggerEntity, game, x, y, entity) {
      var enemies = game.getEntities({ enemy: true });
      var enemiesLeft = _.reject(enemies, function(enemy) {
        return enemy.dead;
      });
      if (enemiesLeft.length === 0) {
        entity.action = 'treasure_opened';
        game.getMap().triggerEvent('onWorldTreeSwitch');
      }
    }, 100),

    //
    // cave 2
    //
    life_rejuvenated: function(triggerEntity, game, x, y) {
      triggerEntity.scaleX = 0;
      triggerEntity.scaleY = 0;
      game.createMapEntity('data', {
        dataType: 'life_rejuvenated',
        dataValue: true
      });
      //game.victory();
    },

    check_victory: function(triggerEntity, game, x, y) {
      var life = game.getEntities({ dataType: 'life_rejuvenated' });
      if (life.length) {
        game.victory();
      }
    },

    //
    // traveling
    //
    cave_entrance: function(triggerEntity, game, x, y) {
      game.loadMap('cave', { x: 12, y: 0 });
    },

    cave2_entrance: function(triggerEntity, game, x, y) {
      game.loadMap('cave2', { x: 19, y: 8 });
    },

    cave_exit: function(triggerEntity, game, x, y) {
      game.loadMap('world', { x: 12, y: 0 });
    },

    cave2_exit: function(triggerEntity, game, x, y) {
      game.loadMap('world', { x: 0, y: 7 });
    }
  };

  return actions;
});
