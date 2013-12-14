define([
  'jquery',
  'underscore',
  'systems/sprite-transforming-system',
  'systems/sprite-rendering-system',
  'systems/entity-destroying-system',
  'systems/debug-grid-system',
  'systems/input-system',
  'maps/world',
  'entity-factory',
  'data/projectiles',
  'data/layers'
], function($, _, spriteTransformingSystem, spriteRenderingSystem, entityDestroyingSystem, debugGridSystem, InputSystem, world, entityFactory, PROJECTILES, LAYERS){
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

  world.init(rows, cols, gridX, gridY);
  world.load();
  entities = entities.concat(world.getEntities());

  var frames = 0;
  ctx.fillStyle = 'rgb(156, 191, 227)';

  // can't seem to use entities array to add when passed by ref
  function addEntity(entity) {
    entities.push(entity);
  }

  var inputSystem = new InputSystem(entities, world, addEntity);
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
    spriteRenderingSystem(entities, ctx);

    // remove everything to be destroyed
    entities = entityDestroyingSystem(entities);
  }

  return renderer;
});
