/*global define*/
define([
  'jquery',
  'keymaster',
  'underscore',
  'sprites',
  'entity',
  'systems/sprite-transforming-system',
  'systems/sprite-rendering-system',
  'systems/entity-destroying-system',
  'systems/debug-grid-system'
], function($, key, _, sprites, Entity, spriteTransformingSystem, spriteRenderingSystem, entityDestroyingSystem, debugGridSystem){
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

  // components
  var c = {
    position: {
      x: 0,
      y: 0
    },
    size: {
      height: 32,
      width: 32
    }
  };
  var SpriteEntity = Entity.extend(c.position, c.size);

  var Human = SpriteEntity.extend({
    movement: 32,
    spriteId: 'human',
    element: false
  });

  var Fire = SpriteEntity.extend({
    spriteId: 'fire',
    scaleX: 2,
    scaleY: 2,
    speedX: 3
  });

  var Wind = SpriteEntity.extend({
    spriteId: 'wind',
    speedX: 2,
    speedYCounter: Math.PI,
    speedYIncrement: Math.PI/16
  });

  var Forest = SpriteEntity.extend({
    spriteId: 'forest'
  });
  var Mountain = SpriteEntity.extend({
    spriteId: 'mountain'
  });
  var Grass = SpriteEntity.extend({
    spriteId: 'grass'
  });
  var River = SpriteEntity.extend({
    spriteId: 'river'
  });

  var elements = {
    fire: Fire,
    wind: Wind
  };

  var human = new Human({
    x: 192,
    y: 288,
    element: 'wind'
  });
  console.log(human);

  //var human = new Human(192, 288, Wind);
  // movement
  key('w, up', function() {
    human.y = Math.max(human.y - human.movement, 0);
  });
  key('s, down', function() {
    human.y = Math.min(human.y + human.movement, height - human.height);
  });
  key('a, left', function() {
    human.x = Math.max(human.x - human.movement, 0);
  });
  key('d, right', function() {
    human.x = Math.min(human.x + human.movement, width - human.width);
  });

  // action
  key('enter', function() {
    if (_.has(elements, human.element)) {
      var props = {
        x: human.x + 10,
        y: human.y
      };
      if (human.element === 'fire') {
        props.removeAtX = props.x + 50;
      } else if (human.element === 'wind') {
        props.removeAtX = props.x + 150;
      }
      entities.push(new elements[human.element](props));
    }
  });

  // TODO sort entities by z-index? map vs other
  // 20 cols 15 rows
  var map =
"11111111111111111111" +
"12020200000000300021" +
"12220200000000300021" +
"12020200000000300021" +
"10000000000000300221" +
"10000000000000300221" +
"10000000000000300221" +
"10000000000000300221" +
"10000000000000302221" +
"10000000000000302221" +
"10000000000000302221" +
"10000000000000322221" +
"10000000000000322221" +
"10000000000000322221" +
"11111111111111111111"
;

  var mapEntities = [];
  var mapObjects = {
    0: Grass,
    1: Mountain,
    2: Forest,
    3: River
  };

  var x, y, index, id;
  for (x = 0; x < cols; x++) {
    for (y = 0; y < rows; y++) {
      index = x + y*cols;
      id = map[index];
      var klass = mapObjects[id];
      var entity = new klass({
        x: x * gridX,
        y: y * gridY
      });
      mapEntities.push(entity);
    }
  }

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
