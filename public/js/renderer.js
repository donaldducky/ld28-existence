define([
  'jquery',
  'keymaster',
  'underscore',
  'sprites',
  'components',
  'systems/sprite-transforming-system',
  'systems/sprite-rendering-system',
  'systems/entity-destroying-system',
  'systems/debug-grid-system',
  'maps/world',
  'entity-factory'
], function($, key, _, sprites, c, spriteTransformingSystem, spriteRenderingSystem, entityDestroyingSystem, debugGridSystem, world, entityFactory){
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

  var human = entityFactory('human', {
    x: 192,
    y: 288,
    mapX: 6,
    mapY: 9,
    solid: true,
    element: 'fire'
  });

  // movement
  key('w', function() {
    world.moveEntityTo(human, human.mapX, human.mapY - 1);
  });
  key('s', function() {
    world.moveEntityTo(human, human.mapX, human.mapY + 1);
  });
  key('a', function() {
    world.moveEntityTo(human, human.mapX - 1, human.mapY);
  });
  key('d', function() {
    world.moveEntityTo(human, human.mapX + 1, human.mapY);
  });

  var validHumanElements = [
    'fire',
    'wind'
  ];
  // action
  key('enter', function() {
    if (_.contains(validHumanElements, human.element)) {
      var props = {
        x: human.x + 10,
        y: human.y
      };
      if (human.element === 'fire') {
        props.removeAtX = props.x + 50;
      } else if (human.element === 'wind') {
        props.removeAtX = props.x + 150;
      }
      entities.push(entityFactory(human.element, props));
    }
  });

  world.init(rows, cols, gridX, gridY);
  world.load();
  var mapEntities = world.getEntities();

  var entities = [
    human
  ];

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
    spriteRenderingSystem(mapEntities, sprites, ctx);
    spriteRenderingSystem(entities, sprites, ctx);

    // remove everything to be destroyed
    entities = entityDestroyingSystem(entities);
  }

  return renderer;
});
