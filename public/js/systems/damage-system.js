define([
  'underscore',
  'data/layers'
], function(_, LAYERS){
  function calculateDamage(weapon, entity) {
    var damage = weapon.damage;
    var damageType = weapon.damageType;

    var modifier = damageType + 'DamageModifier';
    if (entity[modifier]) {
      damage *= entity[modifier];
    } else if (entity.immune) {
      damage = 0;
    }

    return damage;
  }

  return function(GameSystem) {
    var enemies = GameSystem.getEntities({ enemy: true });
    enemies = _.filter(enemies, function(enemy) {
      return enemy.hp && enemy.hp > 0;
    });

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

          // calculate damage
          enemy.hp -= calculateDamage(bullet, enemy);

          // dead
          if (enemy.hp <= 0) {
            enemy.hp = 0;
            delete enemy.ai;
            enemy.solid = false;
            enemy.layer = LAYERS.dead;
            enemy.dead = true;
            enemy.persist = false;
            if (enemy.deadSpriteId) {
              enemy.spriteId = enemy.deadSpriteId;
            }

            GameSystem.getMap().triggerEvent('onEnemyKilled', { enemy: enemy });
          }
        }
      });

      // special check for the life element
      _.each(GameSystem.getEntities({ _type: 'life' }), function(life) {
        var cx = life.x + (life.width / 2);
        var cy = life.y + (life.height / 2);

        if (cx > minX && cx < maxX && cy > minY && cy < maxY) {
          hit = true;
          GameSystem.getMap().triggerEvent('onLifeHit', { life: life });
        }
      });

      if (hit) {
        bullet.destroyed = true;
      }
    });

    var hero = GameSystem.getHero();
    if (!hero) {
      return;
    }
    var minX = hero.x;
    var maxX = hero.x + hero.width;
    var minY = hero.y;
    var maxY = hero.y + hero.height;
    var meleeObjects = GameSystem.getEntities({ melee: true, enemy: true });
    _.each(meleeObjects, function(melee) {
      if (melee.alreadyHit) {
        return;
      }

      var cx = melee.x + (melee.width / 2);
      var cy = melee.y + (melee.height / 2);
      if (cx > minX && cx < maxX && cy > minY && cy < maxY) {
        // this is so it doesn't multi hit
        melee.alreadyHit = true;

        hero.isMeleeHit = true;
        hero.meleeHitX = melee.meleeDirectionX;
        hero.meleeHitY = melee.meleeDirectionY;
        hero.hp -= 2;

        if (hero.hp <= 0) {
          hero.hp = 0;
          hero.dead = true;
          // stop from being controlled
          hero.isPlayer = false;

          GameSystem.gameOver();
        }
      }
    });

    // make some hit sprites
    _.each(GameSystem.getEntities({ isMeleeHit: true }), function(entity) {
      delete entity.isMeleeHit;

      var x = entity.x;
      var y = entity.y;

      GameSystem.createEntity('blood', {
        x: x,
        y: y,
        speedX: (entity.meleeHitX || 0) * 1,
        speedY: (entity.meleeHitY || 0) * 1,
        scaleX: 2,
        scaleY: 2,
        height: 16,
        width: 16
      });
    });
  };
});
