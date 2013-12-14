define([
  'underscore',
  'data/tiles',
  'data/layers',
  'data/maps'
], function(_, TILES, LAYERS, MAPS){
  // map a coordinate to a 1d array index
  function pointToIndex(x, y) {
    return x + y * map.cols;
  }

  function isOnMap(x, y) {
    return x >= 0 && x < map.cols && y >=0 && y < map.rows;
  }

  // get entities at this position and check if we can go there
  function isSolid(x, y) {
    var entitiesHere = _.where(map.GameSystem.getEntities(), { mapX: x, mapY: y });
    return _.find(entitiesHere, function(e) {
      return e.solid;
    });
  }

  var currentMap;

  var map = {};

  var isMapLoaded = false;
  var world = {
    init: function(GameSystem, rows, cols, gridX, gridY, ctx) {
      map.GameSystem = GameSystem;
      map.rows = rows;
      map.cols = cols;
      map.gridX = gridX;
      map.gridY = gridY;
      map.ctx = ctx;
    },

    load: function(mapName, heroStart) {
      this.unload();

      currentMap = MAPS[mapName] || false;
      if (!currentMap) {
        console.error('unable to load map:', mapName);
        return;
      }
      isMapLoaded = true;

      // set new background color
      map.ctx.fillStyle = currentMap.backgroundColor;

      // create map entities
      var x, y, index, id, entity;
      for (x = 0; x < map.cols; x++) {
        for (y = 0; y < map.rows; y++) {
          index = pointToIndex(x, y);
          id = currentMap.tiles[index];

          // create map tiles
          entity = map.GameSystem.createEntity('sprite', TILES[id]);
          entity.layer = LAYERS.tile;
          entity.mapTile = true;
          this.setEntityAt(entity, x, y);

          // create npcs
          var unitId = currentMap.unitTiles[index];
          console.log(currentMap.unitTiles[index]);
          if (unitId && currentMap.npcs[unitId]) {
            var npc = currentMap.npcs[unitId];
            entity = map.GameSystem.createEntity(npc.entityId, npc.props);
            entity.layer = LAYERS.unit;
            entity.mapTile = true;
            this.setEntityAt(entity, x, y);
          }
        }
      }

      // set player
      heroStart = heroStart || currentMap.heroStart;
      this.moveEntityTo(map.GameSystem.getHero(), heroStart.x, heroStart.y);
    },

    unload: function() {
      if (isMapLoaded) {
        var entities = _.reject(map.GameSystem.getEntities(), function(e) {
          return e.mapTile;
        });
        map.GameSystem.setEntities(entities);
      }
    },

    getEntities: function() {
      return map.GameSystem.getEntities();
    },

    getTriggerAt: function(x, y, cols) {
      var idx = pointToIndex(x, y);
      var triggerId = currentMap.triggerTiles[idx];

      return currentMap.triggers[triggerId] || function(){};
    },

    // try to move the entity from point A to point B
    moveEntityTo: function(entity, x, y) {
      if (isOnMap(x, y) && !isSolid(x, y)) {
        this.setEntityAt(entity, x, y);
        this.getTriggerAt(x, y)(entity, map.GameSystem);
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

  return world;
});
