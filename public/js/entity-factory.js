/*global define*/
define([
  'entity',
  'components',
  'data/layers'
], function(Entity, components, LAYERS){
  var entities = {
    // A sort of 'base' entity for a sprite
    sprite: Entity.extend(components.position, components.size)
  };

  entities.human = entities.sprite.extend({
    spriteId: 'human',
    movement: 1,
    element: false,
    solid: true
  });

  entities.dog = entities.sprite.extend({
    spriteId: 'dog',
    movement: 1,
    solid: true
  });

  entities.skeleton = entities.sprite.extend({
    spriteId: 'skeleton',
    deadSpriteId: 'skeleton_dead',
    movement: 1,
    solid: true,
    enemy: true
  });

  entities.fire = entities.sprite.extend({
    spriteId: 'fire',
    scaleX: 2,
    scaleY: 2,
    speedX: 3,
    bullet: true
  });

  entities.wind = entities.sprite.extend({
    spriteId: 'wind',
    speedX: 2,
    speedYCounter: Math.PI,
    speedYIncrement: Math.PI/16,
    bullet: true
  });

  entities.punch = entities.sprite.extend({
    spriteId: 'punch',
    melee: true,
    layer: LAYERS.projectile,
    framesLeft: 35
  });

  entities.blood = entities.sprite.extend({
    spriteId: 'blood',
    layer: LAYERS.projectile,
    framesLeft: 25
  });

  // if type is passed in, return the class
  // if type and args is passed in, return a new instance
  var entityFactory = function(type, args) {
    if (arguments.length === 1) {
      return entities[type];
    }

    if (!entities[type]) {
      console.error('unknown entity:', type);
    }

    var entity = new entities[type](args);
    entity._type = type;

    return entity;
  };

  return entityFactory;
});
