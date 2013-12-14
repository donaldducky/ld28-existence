define([
  'jquery',
  'keymaster',
  'underscore',
  'sprites',
  'systems/sprite-transforming-system',
  'systems/sprite-rendering-system',
  'systems/entity-destroying-system',
  'systems/debug-grid-system',
  'maps/world',
  'entity-factory',
  'data/projectiles',
  'data/layers'
], function($, key, _, sprites, spriteTransformingSystem, spriteRenderingSystem, entityDestroyingSystem, debugGridSystem, world, entityFactory, PROJECTILES, LAYERS){
  var canvas = document.getElementById('drawingboard');
  var ctx = canvas.getContext('2d');

  var width = 640;
  var height = 480;
  // TODO change grid to gridX gridY
  var grid = 32;
  var gridX = grid;
  var gridY = grid;
  var rows = height / grid;
  var cols = width / grid;

  function createProjectile(entity) {
    var element = entity.element;
    if (_.has(PROJECTILES, element)) {
      var props = PROJECTILES[element](entity);
      entities.push(entityFactory(element, props));
    }
  }

  function getPlayerEntity() {
    return _.find(entities, function(entity) {
      return entity.isPlayer;
    });
  }

  // movement
  key('w', function() {
    var entity = getPlayerEntity();
    world.moveEntityTo(entity, entity.mapX, entity.mapY - 1);
  });
  key('s', function() {
    var entity = getPlayerEntity();
    world.moveEntityTo(entity, entity.mapX, entity.mapY + 1);
  });
  key('a', function() {
    var entity = getPlayerEntity();
    world.moveEntityTo(entity, entity.mapX - 1, entity.mapY);
  });
  key('d', function() {
    var entity = getPlayerEntity();
    world.moveEntityTo(entity, entity.mapX + 1, entity.mapY);
  });

  // action
  key('enter', function() {
    var entity = getPlayerEntity();
    createProjectile(entity);
  });

  world.init(rows, cols, gridX, gridY);
  world.load();

  var entities = [
    entityFactory('human', {
      x: 192,
      y: 288,
      mapX: 6,
      mapY: 9,
      solid: true,
      element: 'fire',
      isPlayer: true,
      layer: LAYERS.unit
    })
  ];

  entities = entities.concat(world.getEntities());

  var frames = 0;
  ctx.fillStyle = 'rgb(156, 191, 227)';
  function renderer() {
    frames++;
    // background color
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(0, 0, width, height);

    // grid
    debugGridSystem(ctx, width, height, gridX, gridY);

    // transform entities
    spriteTransformingSystem(entities);

    // render sprites
    spriteRenderingSystem(entities, sprites, ctx);

    // remove everything to be destroyed
    entities = entityDestroyingSystem(entities);
  }

  return renderer;
});
