define([
  'entity-factory',
  'underscore'
], function(entityFactory, _){
  var isLoaded = false;
  var entities = [];
  var tiles = {
    0: { spriteId: 'grass', solid: false },
    1: { spriteId: 'mountain', solid: true },
    2: { spriteId: 'forest', solid: false },
    3: { spriteId: 'river', solid: true },
    4: { spriteId: 'cave', solid: false }
  };
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
    var entitiesHere = _.where(entities, { mapX: x, mapY: y });
    return _.find(entitiesHere, function(e) {
      return e.solid;
    });
  }

  var map = {};
  var world = {
    init: function(rows, cols, gridX, gridY) {
      map.rows = rows;
      map.cols = cols;
      map.gridX = gridX;
      map.gridY = gridY;
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
          var entity = entityFactory('sprite', _.extend(tiles[id], {
            x: x * map.gridX,
            y: y * map.gridY,
            mapX: x,
            mapY: y
          }));
          entities.push(entity);
        }
      }
    },

    getEntities: function() {
      return entities;
    },

    getTriggerAt: function(x, y, cols) {
      var idx = pointToIndex(x, y);
      var triggerId = this.triggers[idx];

      return triggers[triggerId] || function(){};
    },

    moveEntityTo: function(entity, x, y) {
      if (isOnMap(x, y) && !isSolid(x, y)) {
        entity.mapX = x;
        entity.x = x * map.gridX;
        entity.mapY = y;
        entity.y = y * map.gridY;

        this.getTriggerAt(x, y)(entity);
      }
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
