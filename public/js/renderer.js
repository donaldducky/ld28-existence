/*global define*/
define([
  'jquery',
  'keymaster',
  'underscore',
  'sprites',
  'systems/sprite-transforming-system',
  'systems/sprite-rendering-system',
  'systems/entity-destroying-system',
  'systems/debug-grid-system'
], function($, key, _, sprites, spriteTransformingSystem, spriteRenderingSystem, entityDestroyingSystem, debugGridSystem){
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

  ctx.fillStyle = 'rgb(156, 191, 227)';
  function Human(x, y, element) {
    this.id = _.uniqueId('e');

    this.x = x || 0;
    this.y = y || 0;
    this.movement = 32;

    this.height = 32;
    this.width = 32;

    this.spriteId = 'human';

    this.element = element;
  }

  function Fire(x, y) {
    this.id = _.uniqueId('e');

    this.x = x || 0;
    this.y = y || 0;

    this.height = 32;
    this.width = 32;

    this.spriteId = 'fire';

    this.scaleX = 2;
    this.scaleY = 2;
    this.speedX = 3;

    this.removeAtX = this.x + 50;
  }

  function Wind(x, y) {
    this.id = _.uniqueId('e');

    this.x = x || 0;
    this.y = y || 0;
    this.speedX = 2;

    this.speedYCounter = Math.PI;
    this.speedYIncrement = Math.PI/16;

    this.height = 32;
    this.width = 32;
    this.spriteId = 'wind';

    this.removeAtX = this.x + 150;
  }

  function Forest(x, y) {
    this.x = x;
    this.y = y;

    this.height = 32;
    this.width = 32;

    this.spriteId = 'forest';
  }

  function Mountain(x, y) {
    this.x = x;
    this.y = y;

    this.height = 32;
    this.width = 32;

    this.spriteId = 'mountain';
  }

  function Grass(x, y) {
    this.x = x;
    this.y = y;

    this.height = 32;
    this.width = 32;

    this.spriteId = 'grass';
  }

  function River(x, y) {
    this.x = x;
    this.y = y;

    this.height = 32;
    this.width = 32;

    this.spriteId = 'river';
  }

  var human = new Human(192, 288, Wind);
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
    entities.push(new human.element(human.x + 10, human.y));
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
      var entity = new klass(x * gridX, y * gridY);
      mapEntities.push(entity);
    }
  }

  var entities = [
    human
  ];


  var frames = 0;
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
