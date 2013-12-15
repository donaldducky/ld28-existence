define([
  'jquery',
  'underscore',
  'systems/sprite-transforming-system',
  'systems/sprite-rendering-system',
  'systems/entity-destroying-system',
  'systems/debug-grid-system',
  'systems/input-system',
  'systems/ai-system',
  'systems/hp-bar-system',
  'systems/damage-system',
  'maps/world',
  'game-system'
], function($, _, spriteTransformingSystem, spriteRenderingSystem, entityDestroyingSystem, debugGridSystem, InputSystem, aiSystem, hpBarSystem, damageSystem, map, GameSystem){
  var canvas = document.getElementById('drawingboard');
  var ctx = canvas.getContext('2d');

  var width = 640;
  var height = 480;
  var gridX = 32;
  var gridY = 32;
  var rows = height / gridX;
  var cols = width / gridY;

  map.init(GameSystem, rows, cols, gridX, gridY, ctx);
  GameSystem.init({ map: map });
  map.load('cave');

  var frames = 0;
  var inputSystem = new InputSystem(GameSystem, map);
  function renderer() {
    frames++;
    // background color
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(0, 0, width, height);

    // grid
    debugGridSystem(ctx, width, height, gridX, gridY);

    aiSystem(GameSystem);

    damageSystem(GameSystem);

    // transform entities
    spriteTransformingSystem(GameSystem);

    // render sprites
    spriteRenderingSystem(GameSystem, ctx);

    hpBarSystem(GameSystem, ctx);

    // remove everything to be destroyed
    entityDestroyingSystem(GameSystem);
  }

  return renderer;
});
