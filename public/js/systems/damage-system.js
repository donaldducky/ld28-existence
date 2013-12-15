define([
  'underscore',
  'data/layers'
], function(_, LAYERS){
  return function(GameSystem) {
    var enemies = GameSystem.getEntities({ enemy: true });
    enemies = _.filter(enemies, function(enemy) {
      return enemy.hp && enemy.hp > 0;
    });
    // nothing to damage
    if (enemies.length === 0) {
      return;
    }

    var bullets = GameSystem.getEntities({ bullet: true });
    _.each(bullets, function(bullet) {
      var minX = bullet.x;
      var maxX = bullet.x + bullet.width;
      var minY = bullet.y;
      var maxY = bullet.y + bullet.height;

      var hit = false;
      _.each(enemies, function(enemy) {
        var cx = enemy.x + (enemy.width / 2);
        var cy = enemy.y + (enemy.height / 2);

        if (cx > minX && cx < maxX && cy > minY && cy < maxY) {
          hit = true;
          enemy.hp -= 1;

          // dead
          if (enemy.hp <= 0) {
            enemy.hp = 0;
            delete enemy.ai;
            enemy.solid = false;
            enemy.layer = LAYERS.dead;
            if (enemy.deadSpriteId) {
              enemy.spriteId = enemy.deadSpriteId;
            }
          }
        }
      });

      if (hit) {
        bullet.destroyed = true;
      }
    });
  };
});
