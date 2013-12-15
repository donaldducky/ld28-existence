define([
  'underscore'
], function(_){
  return function(GameSystem) {
    var settings = GameSystem.getSettings();
    var ctx = settings.ctx;
    var w = settings.width;
    var h = settings.height;

    var bgcolors = GameSystem.getEntities({ dataType: 'backgroundColor' });
    _.each(bgcolors, function(entity) {
      if (entity.dataValue) {
        ctx.fillStyle = entity.dataValue;
      }
    });

    ctx.clearRect(0, 0, w, h);
    ctx.fillRect(0, 0, w, h);
  };
});
