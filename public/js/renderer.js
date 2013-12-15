define([
  'jquery',
  'underscore',
  'systems/background-system',
  'systems/sprite-transforming-system',
  'systems/sprite-rendering-system',
  'systems/entity-destroying-system',
  'systems/debug-grid-system',
  'systems/input-system',
  'systems/ai-system',
  'systems/hp-bar-system',
  'systems/damage-system',
  'game-system',
  'settings',
  'state',
  'screens/pause'
], function($, _, backgroundSystem, spriteTransformingSystem, spriteRenderingSystem, entityDestroyingSystem, debugGridSystem, InputSystem, aiSystem, hpBarSystem, damageSystem, GameSystem, settings, state, PauseScreen){
  var ctx = document.getElementById(settings.canvasId).getContext('2d');
  settings.ctx = ctx;

  var width = settings.width;
  var height = settings.height;
  var gridX = settings.gridX;
  var gridY = settings.gridY;
  var rows = settings.rows;
  var cols = settings.cols;

  var options = {
    settings: settings,
    state: state
  };

  var pauseScreen = new PauseScreen();

  var game = new GameSystem(options);
  game.on('context', function(context) {
    if (context === 'pause') {
      pauseScreen.render(ctx, width, height);
    }
  });
  game.init();


  var inputSystem = new InputSystem(game);
  function renderer() {
    if (game.isPaused()) {
      return;
    }

    // background color
    backgroundSystem(game);

    // grid
    debugGridSystem(ctx, width, height, gridX, gridY);

    aiSystem(game);

    damageSystem(game);

    // transform entities
    spriteTransformingSystem(game);

    // render sprites
    spriteRenderingSystem(game, ctx);

    hpBarSystem(game, ctx);

    // remove everything to be destroyed
    entityDestroyingSystem(game);
  }

  return renderer;
});
