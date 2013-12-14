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
  var grid = 32;




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
      ctx.drawImage(sprites, 0, 0, grid, grid, this.x, this.y, this.width, this.height);
    }
  };

  function Fire(x, y) {
    this.id = _.uniqueId('e');

    this.x = x || 0;
    this.y = y || 0;
    this.speed = 2;
    this.height = 32;
    this.width = 32;

    this.grow = 2;

    this.start = this.x;
    this.distance = this.x + 50;
  }
  Fire.prototype = {
    render: function(ctx) {
      ctx.drawImage(sprites, 32, 0, grid, grid, this.x, this.y, this.width, this.height);

      this.width += this.grow;
      this.height += this.grow;
      this.y -= this.grow/2;

      this.x += this.speed;
      if (this.x > this.distance) {
        this.destroy();
      }
    },
    destroy: function() {
      var id = this.id;
      entities = _.reject(entities, function(entity) {
        return entity.id === id;
      });
    }
  };

  function Wind(x, y) {
    this.id = _.uniqueId('e');

    this.x = x || 0;
    this.y = y || 0;
    this.speed = 2;
    this.height = 32;
    this.width = 32;

    this.start = this.x;
    this.distance = this.x + 150;
    this.counter = Math.PI;
  }
  Wind.prototype = {
    render: function(ctx) {
      ctx.drawImage(sprites, 32*4, 0, grid, grid, this.x, this.y, this.width, this.height);

      this.x += this.speed;
      this.counter += Math.PI/16;
      this.y = this.y + Math.sin(this.counter);
      if (this.x > this.distance) {
        this.destroy();
      }
    },
    destroy: function() {
      var id = this.id;
      entities = _.reject(entities, function(entity) {
        return entity.id === id;
      });
    }
  };

  var human = new Human(200, 300);
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

    // sprites
    _.each(entities, function(entity) {
      entity.render(ctx);
    });
  }

  return renderer;
});
