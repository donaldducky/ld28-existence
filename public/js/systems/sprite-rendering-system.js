/*global define*/
define([
  'underscore'
], function(_){
  return function(entities, sprites, ctx) {
    _.each(entities, function(entity) {
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
