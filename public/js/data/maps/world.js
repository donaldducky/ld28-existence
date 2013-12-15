define([
  'underscore'
], function(_){
  var world = {
    backgroundColor: 'rgb(156, 191, 227)',
    heroStart: {
      x: 6,
      y: 9,
      direction: 'down'
    },
    tiles: [
      "11111111111141111111",
      "12000220000000300021",
      "12000202000000300021",
      "12220220000000300021",
      "10000000000000300221",
      "10000000000000000221",
      "10000000000000300221",
      " 0000000000000300221",
      "10000000000000302221",
      "10000000000000302221",
      "10000000000000302221",
      "10000000000000322221",
      "10000000000000322221",
      "10000000000000322221",
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
      "20000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000"
    ],
    actionTiles: [
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
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    "
    ],
    unitTiles: [
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "m                   ",
      "                    ",
      "                    ",
      "                    ",
      "    t               ",
      "                    ",
      "                    ",
      "                    "
    ],
    triggers: {
      1: 'cave_entrance',
      2: 'cave2_entrance'
    },
    actions: {
      a: 'world_tree'
    },
    npcs: {
      t: {
        entityId: 'sprite',
        props: {
          spriteId: 'tree',
          solid: true,
          action: 'world_tree'
        }
      },
      m: {
        entityId: 'sprite',
        props: {
          spriteId: 'mountain',
          solid: true
        }
      }
    },
    events: {
      onEnemyKilled: function(game, options) {
        var enemy = options.enemy || false;
        if (!enemy) {
          return;
        }

        // only tree in this level
        if (enemy.spriteId === 'tree') {
          delete enemy.action;
          game.getMap().triggerEvent('onWorldTreeKilled', { entity: enemy });
        }
      },

      onWorldTreeKilled: _.once(function(game, options) {
        var tree = options.entity;
        game.talk(tree, 'You will regret this!');
        game.createMapEntity('treasure', {
          mapX: tree.mapX,
          mapY: tree.mapY,
          x: tree.x,
          y: tree.y,
          action: 'world_tree_treasure',
          contents: 'nothing'
        });
      }),

      onWorldTreeSwitch: _.once(function(game, options) {
        var mountain = _.first(game.getEntities({ spriteId: 'mountain', persist: true }));
        mountain.spriteId = 'dirt';
        mountain.solid = false;

        // create explosions
        var origin = {
          x: mountain.x,
          y: mountain.y
        };

        _.each([
          [ 3, -5 ],
          [ 5, -3 ],
          [ 4, 0 ],
          [ 5, 3 ],
          [ 3, 5 ]
        ], function(v) {
          game.createMapEntity('sprite', {
            spriteId: 'explosion',
            x: origin.x,
            y: origin.y,
            framesLeft: 25,
            speedX: v[0],
            speedY: v[1]
          });
        });
      })
    }
  };

  return world;
});
