/*global define*/
define([
  'underscore',
  'sprites'
], function(_, sprites){
  return function(entities, ctx) {
    _.chain(entities).sortBy(function(e) {
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
