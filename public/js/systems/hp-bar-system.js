define([
  'underscore'
], function(_){
  // TODO make ctx accessible from GameSystem
  return function(GameSystem, ctx) {
    ctx.save();

    ctx.fillStyle = 'rgb(255,0,0)';

    _.chain(GameSystem.getEntities()).filter(function(entity) {
      // hp > 0
      return entity.hp && entity.hpMax;
    }).each(function(entity) {
      var padding = 5;
      var x = entity.x + padding;
      var y = entity.y + entity.height - padding;
      var width = entity.width - 2*padding;
      var height = 2;
      // hp percent * max width of the bar
      var hpBarWidth = Math.round((entity.hp / entity.hpMax) * width);
      ctx.fillRect(x, y, hpBarWidth, height);
      //console.log(entity.hp);
    });

    ctx.restore();
  };
});
