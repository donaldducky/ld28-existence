/*global define*/
define([
  'underscore',
  'sprites'
], function(_, sprites){
  return function(GameSystem, ctx) {
    var canvasWidth = GameSystem.getSettings().width;

    _.chain(GameSystem.getEntities()).sortBy(function(e) {
      return e.layer;
    }).each(function(entity) {
      if (entity.spriteId) {
        var sprite;

        if (entity.dead) {
          ctx.globalAlpha = 0.5;

          sprite = sprites[entity.spriteId];
          ctx.drawImage(
            sprites._image,
            sprite.x, sprite.y, sprite.width, sprite.height,
            entity.x, entity.y, entity.width, entity.height
          );

          ctx.globalAlpha = 1;
        } else {
          if (entity.direction) {
            sprite = sprites[entity.direction];
            ctx.drawImage(
              sprites._image,
              sprite.x, sprite.y, sprite.width, sprite.height,
              entity.x, entity.y, entity.width, entity.height
            );
          }

          sprite = sprites[entity.spriteId];
          ctx.drawImage(
            sprites._image,
            sprite.x, sprite.y, sprite.width, sprite.height,
            entity.x, entity.y, entity.width, entity.height
          );
        }
      } else if (entity.ui) {
        var x = entity.x;
        var y = entity.y;
        ctx.save();
        ctx.fillStyle = entity.fgColor;
        ctx.font = entity.font;
        if (x + 150 > canvasWidth) {
          x = canvasWidth - 150;
        }
        ctx.fillText(entity.message, x, y, 150);

        ctx.restore();
      }
    });
  };
});
