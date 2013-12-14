define([
  'entity-factory',
  'data/layers'
], function(entityFactory, LAYERS){
  var state = {
    entities: []
  };

  var GameSystem = {
    init: function() {
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
        solid: true,
        element: 'fire',
        isPlayer: true,
        layer: LAYERS.unit
      });
    },

    getHero: function() {
      return _.find(state.entities, function(e) {
        return e.isPlayer
      });
    }
  };

  return GameSystem;
});
