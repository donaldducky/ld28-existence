/*global define*/
define([
  'underscore',
  'sprites'
], function(_, sprites){
  return function(GameSystem, ctx) {
    _.chain(GameSystem.getEntities()).sortBy(function(e) {
      return e.layer;
    }).each(function(entity) {
      if (entity.spriteId) {
        var sprite = sprites[entity.spriteId];
        ctx.drawImage(
          sprites._image,
          sprite.x, sprite.y, sprite.width, sprite.height,
          entity.x, entity.y, entity.width, entity.height
        );
      }
    });
  };
});
