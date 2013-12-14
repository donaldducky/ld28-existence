define([
  'underscore',
  'data/tiles',
  'data/layers'
], function(_, TILES, LAYERS){
  var isLoaded = false;
  var triggers = {
    1: function() { console.log('cave'); }
  };

  // map a coordinate to a 1d array index
  function pointToIndex(x, y) {
    return x + y * map.cols;
  }

  function isOnMap(x, y) {
    return x >= 0 && x < map.cols && y >=0 && y < map.rows;
  }

  // get entities at this position and check if we can go there
  function isSolid(x, y) {
    var entitiesHere = _.where(map.Game.getEntities(), { mapX: x, mapY: y });
    return _.find(entitiesHere, function(e) {
      return e.solid;
    });
  }

  var map = {};
  var heroStart = {
    x: 6,
    y: 9
  };

  var world = {
    init: function(Game, rows, cols, gridX, gridY) {
      map.Game = Game;
      map.rows = rows;
      map.cols = cols;
      map.gridX = gridX;
      map.gridY = gridY;

      // set player
      this.moveEntityTo(Game.getHero(), heroStart.x, heroStart.y);
    },

    load: function() {
      if (isLoaded) {
        return;
      }

      isLoaded = true;

      // create map entities
      var x, y, index, id;
      for (x = 0; x < map.cols; x++) {
        for (y = 0; y < map.rows; y++) {
          index = pointToIndex(x, y);
          id = this.map[index];
          var entity = map.Game.createEntity('sprite', TILES[id]);
          entity.layer = LAYERS.tile;
          this.setEntityAt(entity, x, y);
        }
      }
    },

    getEntities: function() {
      return map.Game.getEntities();
    },

    getTriggerAt: function(x, y, cols) {
      var idx = pointToIndex(x, y);
      var triggerId = this.triggers[idx];

      return triggers[triggerId] || function(){};
    },

    // try to move the entity from point A to point B
    moveEntityTo: function(entity, x, y) {
      if (isOnMap(x, y) && !isSolid(x, y)) {
        this.setEntityAt(entity, x, y);
        this.getTriggerAt(x, y)(entity);
      }
    },

    // set an entity at a location
    setEntityAt: function(entity, x, y) {
      // set map position
      entity.mapX = x;
      entity.mapY = y;
      // set canvas position
      entity.x = x * map.gridX;
      entity.y = y * map.gridY;
    }
  };

  world.map =
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
  world.triggers =
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

  return world;
});
