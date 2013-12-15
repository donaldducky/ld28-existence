define([
  'underscore'
], function(_){
  return function(GameSystem) {

    var hero = GameSystem.getHero();

    _.chain(GameSystem.getEntities()).filter(function(entity) {
      return entity.ai;
    }).each(function(entity) {
      entity.aiTicks++;
      if (entity.aiTicks !== entity.thinkSpeed) {
        return;
      }
      entity.aiTicks = 0;

      switch(entity.ai) {
      case 'random':
        var distance = _.sample([ -1, 0, 1 ]);
        var xOrY = _.random(0, 1);
        var dx = 0;
        var dy = 0;

        if (xOrY) {
          dx = distance;
        } else {
          dy = distance;
        }
        GameSystem.getMap().moveEntityTo(entity, entity.mapX + dx, entity.mapY + dy);
        break;
      case 'aggressive':
        if (hero && entity.enemy && _.random(0, 1)) {
          // attack towards the hero's direction
          // we can attack in 8 directions
          var dx, dy;
          if (hero.mapX < entity.mapX) {
            dx = -1;
          } else if (hero.mapX > entity.mapX) {
            dx = 1;
          } else {
            dx = 0;
          }

          if (hero.mapY < entity.mapY) {
            dy = -1;
          } else if (hero.mapY > entity.mapY) {
            dy = 1;
          } else {
            dy = 0;
          }

          var punch = GameSystem.createEntity('punch', {
            x: entity.x + dx * 32,
            y: entity.y + dy * 32,
            enemy: true,
            meleeDirectionX: dx,
            meleeDirectionY: dy,
            // track which map unit created this
            // we need to know for removal purposes
            mapId: entity.mapId
          });
        } else {
          var distance = _.sample([ -1, 0, 1 ]);
          var xOrY = _.random(0, 1);
          var dx = 0;
          var dy = 0;

          if (xOrY) {
            dx = distance;
          } else {
            dy = distance;
          }

          GameSystem.getMap().moveEntityTo(entity, entity.mapX + dx, entity.mapY + dy);
        }
        break;
      case 'distressed':
        var vx = _.random(-2, 0, 2);
        GameSystem.talk(entity, 'help!', {
          speedX: vx,
          framesLeft: 25
        });
        var distance = _.sample([ -1, 0, 1 ]);
        var xOrY = _.random(0, 1);
        var dx = 0;
        var dy = 0;

        if (xOrY) {
          dx = distance;
        } else {
          dy = distance;
        }
        GameSystem.getMap().moveEntityTo(entity, entity.mapX + dx, entity.mapY + dy);
        break;
      }
    });
  };
});
