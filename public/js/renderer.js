/*global define*/
define([
  'jquery',
  'keymaster',
  'underscore',
  'sprites'
], function($, key, _, sprites){
  var canvas = document.getElementById('drawingboard');
  var ctx = canvas.getContext('2d');

  var width = 640;
  var height = 480;
  // TODO change grid to gridX gridY
  var grid = 32;
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
    this.spriteSheet = sprites;
    this.spriteX = 0;
    this.spriteY = 0;
    this.spriteWidth = 32;
    this.spriteHeight = 32;

    this.element = element;

    _.bindAll(this, 'moveUp', 'moveDown', 'moveLeft', 'moveRight');
  }
  Human.prototype = {
    moveUp: function() {
      this.y = Math.max(this.y - this.movement, 0);
    },
    moveDown: function() {
      this.y = Math.min(this.y + this.movement, height - this.height);
    },
    moveLeft: function() {
      this.x = Math.max(this.x - this.movement, 0);
    },
    moveRight: function() {
      this.x = Math.min(this.x + this.movement, width - this.width);
    }
  };

  function Fire(x, y) {
    this.id = _.uniqueId('e');

    this.x = x || 0;
    this.y = y || 0;
    this.speed = 2;

    this.height = 32;
    this.width = 32;
    this.spriteSheet = sprites;
    this.spriteX = 32;
    this.spriteY = 0;
    this.spriteWidth = 32;
    this.spriteHeight = 32;

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
    this.spriteSheet = sprites;
    this.spriteX = 32*4;
    this.spriteY = 0;
    this.spriteWidth = 32;
    this.spriteHeight = 32;

    this.removeAtX = this.x + 150;
  }

  function Forest(x, y) {
    this.x = x;
    this.y = y;
    this.height = 32;
    this.width = 32;
    this.spriteSheet = sprites;
    this.spriteX = 0;
    this.spriteY = 32;
    this.spriteWidth = 32;
    this.spriteHeight = 32;
  }

  function Mountain(x, y) {
    this.x = x;
    this.y = y;
    this.height = 32;
    this.width = 32;
    this.spriteSheet = sprites;
    this.spriteX = 32;
    this.spriteY = 32;
    this.spriteWidth = 32;
    this.spriteHeight = 32;
  }

  function Grass(x, y) {
    this.x = x;
    this.y = y;
    this.height = 32;
    this.width = 32;
    this.spriteSheet = sprites;
    this.spriteX = 32*2;
    this.spriteY = 32;
    this.spriteWidth = 32;
    this.spriteHeight = 32;
  }

  function River(x, y) {
    this.x = x;
    this.y = y;
    this.height = 32;
    this.width = 32;
    this.spriteSheet = sprites;
    this.spriteX = 32*3;
    this.spriteY = 32;
    this.spriteWidth = 32;
    this.spriteHeight = 32;
  }

  var human = new Human(192, 288, Wind);
  //var human = new Human(192, 288, Wind);
  // movement
  key('w, up', human.moveUp);
  key('s, down', human.moveDown);
  key('d, right', human.moveRight);
  key('a, left', human.moveLeft);

  // action
  key('enter', function() {
    entities.push(new human.element(human.x + 10, human.y));
  });

  key('space', function() {
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
      var entity = new klass(x * grid, y * grid);
      mapEntities.push(entity);
    }
  }

  console.log(mapEntities);

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
    ctx.beginPath();
    for (var x = 0.5; x < width; x+= grid) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (var y = 0.5; y < height; y+= grid) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#eee';
    ctx.stroke();

    // transform entities
    _.each(entities, function(entity) {
      if (entity.scaleX) {
        entity.width += entity.scaleX;
        // re-center after scaling
        entity.x -= entity.scaleX / 2;
      }
      if (entity.scaleY) {
        entity.height += entity.scaleY;
        // re-center after scaling
        entity.y -= entity.scaleY / 2;
      }

      if (entity.speedX) {
        entity.x += entity.speedX;
      }

      if (entity.speedY) {
        entity.y += entity.speedY;
      }

      if (entity.speedYIncrement) {
        entity.speedYCounter += entity.speedYIncrement;
        entity.y += Math.sin(entity.speedYCounter);
      }
    });

    // entities
    _.each(mapEntities, function(entity) {
      ctx.drawImage(entity.spriteSheet, entity.spriteX, entity.spriteY, entity.spriteWidth, entity.spriteHeight, entity.x, entity.y, entity.width, entity.height);
    });
    _.each(entities, function(entity) {
      ctx.drawImage(entity.spriteSheet, entity.spriteX, entity.spriteY, entity.spriteWidth, entity.spriteHeight, entity.x, entity.y, entity.width, entity.height);
    });

    // check if we need to remove any entities
    _.each(entities, function(entity) {
      if (entity.removeAtX && entity.x >= entity.removeAtX) {
        entity.destroyed = true;
      }
    });

    // remove everything to be destroyed
    entities = _.reject(entities, function(entity) {
      return entity.destroyed;
    });
  }

  return renderer;
});
