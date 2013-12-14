define([
  'jquery',
  'underscore',
  'systems/sprite-transforming-system',
  'systems/sprite-rendering-system',
  'systems/entity-destroying-system',
  'systems/debug-grid-system',
  'systems/input-system',
  'maps/world',
  'game-system'
], function($, _, spriteTransformingSystem, spriteRenderingSystem, entityDestroyingSystem, debugGridSystem, InputSystem, world, GameSystem){
  var canvas = document.getElementById('drawingboard');
  var ctx = canvas.getContext('2d');

  var width = 640;
  var height = 480;
  var gridX = 32;
  var gridY = 32;
  var rows = height / gridX;
  var cols = width / gridY;

  GameSystem.init();
  world.init(GameSystem, rows, cols, gridX, gridY);
  world.load();

  var frames = 0;
  ctx.fillStyle = 'rgb(156, 191, 227)';

  // can't seem to use entities array to add when passed by ref
  var inputSystem = new InputSystem(GameSystem, world);
  function renderer() {
    frames++;
    // background color
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(0, 0, width, height);

    // grid
    debugGridSystem(ctx, width, height, gridX, gridY);

    // transform entities
    spriteTransformingSystem(GameSystem);

    // render sprites
    spriteRenderingSystem(GameSystem, ctx);

    // remove everything to be destroyed
    entityDestroyingSystem(GameSystem);
  }

  return renderer;
});
