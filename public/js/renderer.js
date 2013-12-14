/*global define*/
define([
  'jquery',
  'keymaster',
  'underscore'
], function($, key, _){
  var canvas = document.getElementById('drawingboard');
  var ctx = canvas.getContext('2d');

  var width = 640;
  var height = 480;
  // TODO change grid to gridX gridY
  var grid = 32;
  var rows = height / grid;
  var cols = width / grid;


  var color = 'red';
  function getColor() {
    if (color === 'red') {
      color = 'rgb(156, 191, 227)';
    } else {
      color = 'red';
    }
    return color;
  }
  ctx.fillStyle = getColor();

  key('enter', function() {
    ctx.fillStyle = getColor();
  });


  var sprites = document.getElementById('sprites');

  function Human(x, y) {
    this.id = _.uniqueId('e');

    this.x = x || 0;
    this.y = y || 0;
    this.speed = 32;

    this.height = 32;
    this.width = 32;
    this.spriteSheet = sprites;
    this.spriteX = 0;
    this.spriteY = 0;
    this.spriteWidth = 32;
    this.spriteHeight = 32;

    _.bindAll(this, 'moveUp', 'moveDown', 'moveLeft', 'moveRight');
  }
  Human.prototype = {
    moveUp: function() {
      this.y = Math.max(this.y - this.speed, 0);
    },
    moveDown: function() {
      this.y = Math.min(this.y + this.speed, height - this.height);
    },
    moveLeft: function() {
      this.x = Math.max(this.x - this.speed, 0);
    },
    moveRight: function() {
      this.x = Math.min(this.x + this.speed, width - this.width);
    },
    render: function(ctx) {
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

    this.grow = 2;

    this.start = this.x;
    this.distance = this.x + 50;
  }
  Fire.prototype = {
    render: function(ctx) {
      this.width += this.grow;
      this.height += this.grow;
      this.y -= this.grow / 2;
      this.x -= this.grow / 2;

      this.x += this.speed;
      if (this.x > this.distance) {
        this.destroyed = true;
      }
    }
  };

  function Wind(x, y) {
    this.id = _.uniqueId('e');

    this.x = x || 0;
    this.y = y || 0;
    this.speed = 2;

    this.height = 32;
    this.width = 32;
    this.spriteSheet = sprites;
    this.spriteX = 32*4;
    this.spriteY = 0;
    this.spriteWidth = 32;
    this.spriteHeight = 32;

    this.start = this.x;
    this.distance = this.x + 150;
    this.counter = Math.PI;
  }
  Wind.prototype = {
    render: function(ctx) {
      this.x += this.speed;
      this.counter += Math.PI/16;
      this.y = this.y + Math.sin(this.counter);
      if (this.x > this.distance) {
        this.destroyed = true;
      }
    }
  };

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
  Forest.prototype = { render: function(){} };

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
  Mountain.prototype = { render: function(){} };

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
  Grass.prototype = { render: function(){} };

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
  River.prototype = { render: function(){} };

  var human = new Human(192, 288);
  key('k, up', human.moveUp);
  key('j, down', human.moveDown);
  key('l, right', human.moveRight);
  key('h, left', human.moveLeft);

  key('a', function() {
    entities.push(new Fire(human.x + 10, human.y));
  });
  key('w', function() {
    entities.push(new Wind(human.x + 10, human.y));
  });

  // TODO sort entities by z-index? map vs other
  // 20 cols 15 rows
  /*
  var map = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ];
  */
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
    if (color === 'red') {
      for (var x = 0.5; x < width; x+= grid) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
    } else {
      for (var y = 0.5; y < height; y+= grid) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
    }
    ctx.closePath();
    ctx.strokeStyle = '#eee';
    ctx.stroke();

    // entities
    _.each(mapEntities, function(entity) {
      ctx.drawImage(entity.spriteSheet, entity.spriteX, entity.spriteY, entity.spriteWidth, entity.spriteHeight, entity.x, entity.y, entity.width, entity.height);
    });
    _.each(entities, function(entity) {
      ctx.drawImage(entity.spriteSheet, entity.spriteX, entity.spriteY, entity.spriteWidth, entity.spriteHeight, entity.x, entity.y, entity.width, entity.height);
      entity.render();
    });

    // remove everything to be destroyed
    entities = _.reject(entities, function(entity) {
      return entity.destroyed;
    });
  }

  return renderer;
});
