define([
  'underscore'
], function(_){
  var cave = {
    backgroundColor: 'rgb(200, 200, 200)',
    heroStart: {
      x: 5,
      y: 5,
      direction: 'down'
    },
    tiles: [
      "11111111111141111111",
      "15555555555555551111",
      "15115555555555551111",
      "15515555555555555111",
      "15555555555155555551",
      "15555555551155555551",
      "15555555551155555551",
      "15555555555555555551",
      "11115555555555555551",
      "15111555555555555551",
      "15555555555555555551",
      "11555555555555555551",
      "11155555555555555551",
      "11115555555555555551",
      "11111111111111111111"
    ],
    triggerTiles: [
      "00000000000010000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000"
    ],
    unitTiles: [
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "          sssssss   ",
      "          s   d     ",
      "          s         ",
      "          s         ",
      "                    "
    ],
    triggers: {
      1: 'cave_exit'
    },
    npcs: {
      d: {
        entityId: 'dog',
        props: {
          ai: 'random',
          aiTicks: 0,
          thinkSpeed: 100,
          action: 'woof'
        }
      },
      s: {
        entityId: 'skeleton',
        props: {
          ai: 'aggressive',
          aiTicks: 0,
          thinkSpeed: 100,
          hp: 5,
          hpMax: 5
        }
      }
    },
    events: {
      onEnterMap: function(game) {
        var skeletons = game.getEntities({ _type: 'skeleton' });
        var hasEnemies = skeletons.length > 0;

        var dogs = game.getEntities({ _type: 'dog' });
        _.each(dogs, function(dog) {
          if (hasEnemies) {
            dog.ai = 'distressed';
          } else {
            dog.ai = 'random';
          }
        });
      },
      onEnemyKilled: function(game, options) {
        var enemies = game.getEntities({ enemy: true });
        var enemiesLeft = _.reject(enemies, function(enemy) {
          return enemy.dead;
        });
        if (enemiesLeft.length === 0) {
          game.getMap().triggerEvent('onLastEnemyKilled');
        }
      },
      onLastEnemyKilled: _.once(function(game) {
        var dogs = game.getEntities({ _type: 'dog' });
        _.each(dogs, function(dog) {
          dog.ai = 'random';
          game.talk(dog, 'woof, you saved me!', {
            framesLeft: 100
          });
          dog.action = 'woof_saved';
        });
      })
    }
  };

  return cave;
});
