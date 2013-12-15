define([
  'underscore',
  'backbone',
  'entity-factory',
  'map',
  'ui'
], function(_, Backbone, entityFactory, map, ui){
  function GameSystem(options) {
    this.entities = [];
    _.extend(this, _.pick(options, [ 'settings', 'state', 'hero' ]));

    this.state = this.state || {};
    this.state.mapData = this.state.mapData || {};

    // set initial pause state
    this.pause();
  }

  _.extend(GameSystem.prototype, Backbone.Events, {
    init: function() {
      map.init(this);
      this.createHero(this.state.hero);
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

    createMapEntity: function(type, properties) {
      properties.mapId = this.getMap().getCurrentMap().id;

      return this.createEntity(type, properties);
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

    createHero: function(props) {
      var hero = this.createEntity('human', props);

      if (hero.element) {
        _.each(hero.projectiles, function(type) {
          ui.addWeapon(type);
        });
        ui.selectWeapon(hero.element);
      }
    },

    getHero: function() {
      return _.find(this.entities, function(e) {
        return e.isPlayer;
      });
    },

    giveHeroWeapon: function(weaponName) {
      var hero = this.getHero();
      if (_.contains(hero.projectiles, weaponName)) {
        // already have this weapon
        return;
      }
      hero.projectiles.push(weaponName);
      ui.addWeapon(weaponName);
      this.talk(hero, 'You received ' + weaponName + '!');
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
      this.setContext('game-over');
    },

    talk: function(entity, message, options) {
      options = options || {};
      var e = this.createEntity('ui', _.extend({
        message: message,
        x: entity.x,
        y: entity.y,
        fgColor: '#000',
        font: '18px Arial',
        framesLeft: 50,
        speedY: -2
      }, options));
    }
  });

  return GameSystem;
});
