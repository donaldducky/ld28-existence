define([
  'underscore',
  'backbone',
  'entity-factory',
  'data/layers',
  'map',
  'ui'
], function(_, Backbone, entityFactory, LAYERS, map, ui){
  function GameSystem(options) {
    this.entities = [];
    _.extend(this, _.pick(options, [ 'settings', 'state' ]));

    this.state = this.state || {};
    this.state.mapData = this.state.mapData || {};

    // set initial pause state
    this.pause();
  }

  _.extend(GameSystem.prototype, Backbone.Events, {
    init: function() {
      map.init(this);
      this.createHero();
      this.loadMap(this.state.mapId);
      this.unpause();

      // for keybindings
      this.setContext('map');
    },

    reset: function() {
      this.trigger('reset');
    },

    loadMap: function(mapName, options) {
      options = options || {};
      map.load(mapName, options);
    },

    saveMapState: function(mapId, entities) {
      this.state.mapData[mapId] = entities;
    },

    getMapState: function(mapId) {
      return this.state.mapData[mapId] || false;
    },

    setContext: function(context) {
      this.context = context;
      this.trigger('context', context);
    },

    getContext: function() {
      return this.context;
    },

    getSettings: function() {
      return this.settings;
    },

    createEntity: function(type, properties) {
      return this.addEntity(entityFactory(type, properties));
    },
    addEntity: function(entity) {
      this.entities.push(entity);
      return entity;
    },
    getEntities: function(options) {
      if (options) {
        return _.where(this.entities, options);
      }

      return this.entities;
    },
    setEntities: function(entities) {
      this.entities = entities;
    },

    createHero: function() {
      var hero = this.createEntity('human', {
        hp: 10,
        hpMax: 10,
        element: 'fire',
        isPlayer: true,
        layer: LAYERS.unit,
        projectiles: [ 'fire', 'wind' ]
      });

      if (hero.element) {
        ui.selectWeapon(hero.element);
      }
    },

    getHero: function() {
      return _.find(this.entities, function(e) {
        return e.isPlayer;
      });
    },

    getMap: function() {
      return map;
    },

    playerActionAt: function() {
      var player = this.getHero();
      if (!player) {
        return;
      }
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
      map.triggerAction(player, x, y);
    },

    // pause the simulation
    pause: function(context) {
      this.paused = true;
      this.previousContext = this.getContext();
      if (context) {
        this.setContext(context);
      } else {
        this.setContext('pause');
      }
    },

    unpause: function() {
      this.paused = false;
      this.setContext(this.previousContext);
    },

    isPaused: function() {
      return this.paused;
    },

    gameOver: function() {
      console.log('hero died');
      this.setContext('game-over');
    }
  });

  return GameSystem;
});
