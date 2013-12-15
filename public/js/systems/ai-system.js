define([
  'underscore'
], function(_){
  return function(GameSystem) {
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
