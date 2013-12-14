/*global define*/
define([
  'jquery',
  'keymaster',
  'underscore',
  'sprites',
  'components',
  'entity',
  'systems/sprite-transforming-system',
  'systems/sprite-rendering-system',
  'systems/entity-destroying-system',
  'systems/debug-grid-system'
], function($, key, _, sprites, c, Entity, spriteTransformingSystem, spriteRenderingSystem, entityDestroyingSystem, debugGridSystem){
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

  // A sort of 'base' entity for a sprite
  var SpriteEntity = Entity.extend(c.position, c.size);

  var Human = SpriteEntity.extend({
    movement: 1,
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

  var elements = {
    fire: Fire,
    wind: Wind
  };

  var human = new Human({
    x: 192,
    y: 288,
    mapX: 6,
    mapY: 9,
    solid: true,
    element: 'fire'
  });

  function isOnMap(x, y) {
    return x >= 0 && x < cols && y >=0 && y < rows;
  }

  function isSolid(x, y) {
    var entitiesHere = _.where(mapEntities, { mapX: x, mapY: y });
    return _.find(entitiesHere, function(e) {
      return e.solid;
    });
  }

  function moveEntity(e, x, y) {
    if (isOnMap(x, y) && !isSolid(x, y)) {
      e.mapX = x;
      e.x = x * gridX;
      e.mapY = y;
      e.y = y * gridY;

      getMapTriggerAt(x, y)(e);
    }
  }

  function getMapTriggerAt(x, y) {
    var idx = pointToIndex(x, y);
    var triggerId = triggers[idx];

    return mapTriggers[triggerId] || function(){};
  }

  // movement
  key('w', function() {
    moveEntity(human, human.mapX, human.mapY - 1);
  });
  key('s', function() {
    moveEntity(human, human.mapX, human.mapY + 1);
  });
  key('a', function() {
    moveEntity(human, human.mapX - 1, human.mapY);
  });
  key('d', function() {
    moveEntity(human, human.mapX + 1, human.mapY);
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
"11111111111141111111" +
"12020200000000300021" +
"12220200000000300021" +
"12020200000000300021" +
"10000000000000300221" +
"10000000000000000221" +
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
  var triggers =
"00000000000010000000" +
"00000000000000000000" +
"00000000000000000000" +
"00000000000000000000" +
"00000000000000000000" +
"00000000000000000000" +
"00000000000000000000" +
"00000000000000000000" +
"00000000000000000000" +
"00000000000000000000" +
"00000000000000000000" +
"00000000000000000000" +
"00000000000000000000" +
"00000000000000000000" +
"00000000000000000000"
;
  function pointToIndex(x, y) {
    return x + y*cols;
  }

  var mapEntities = [];
  var mapObjects = {
    0: { spriteId: 'grass', solid: false },
    1: { spriteId: 'mountain', solid: true },
    2: { spriteId: 'forest', solid: false },
    3: { spriteId: 'river', solid: true },
    4: { spriteId: 'cave', solid: false }
  };
  var mapTriggers = {
    1: function() { console.log('cave'); }
  };

  var x, y, index, id;
  for (x = 0; x < cols; x++) {
    for (y = 0; y < rows; y++) {
      index = pointToIndex(x, y);
      id = map[index];
      var entity = new SpriteEntity(_.extend(mapObjects[id], {
        x: x * gridX,
        y: y * gridY,
        mapX: x,
        mapY: y
      }));
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
