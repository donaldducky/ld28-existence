define([
  'underscore',
  'entity-factory',
  'data/layers'
], function(_, entityFactory, LAYERS){
  var state = {
    entities: []
  };

  var map;

  var GameSystem = {
    init: function(options) {
      map = options.map;

      this.createHero();
    },
    createEntity: function(type, properties) {
      return this.addEntity(entityFactory(type, properties));
    },
    addEntity: function(entity) {
      state.entities.push(entity);
      return entity;
    },
    getEntities: function(options) {
      if (options) {
        return _.where(state.entities, options);
      }

      return state.entities;
    },
    setEntities: function(entities) {
      state.entities = entities;
    },

    createHero: function() {
      this.createEntity('human', {
        element: 'fire',
        isPlayer: true,
        layer: LAYERS.unit,
        projectiles: [ 'fire', 'wind' ]
      });
    },

    getHero: function() {
      return _.find(state.entities, function(e) {
        return e.isPlayer;
      });
    },

    getMap: function() {
      return map;
    },

    playerActionAt: function() {
      var player = this.getHero();
      var x = player.mapX;
      var y = player.mapY;
      switch(player.direction) {
      case 'left':
        x -= 1;
        break;
      case 'right':
        x += 1;
        break;
      case 'up':
        y -= 1;
        break;
      case 'down':
        y += 1;
        break;
      default:
        // prevent default (keymaster)
        return false;
      }

      var map = this.getMap();
      var action = map.getActionAt(x, y);
      action(player, this, x, y);
    }
  };

  return GameSystem;
});
