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
    getEntities: function() {
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
    }
  };

  return GameSystem;
});
