define([
  'underscore',
  'keymaster',
  'data/projectiles',
  'entity-factory'
], function(_, key, PROJECTILES, entityFactory){
  var system = {};

  function getPlayerEntity(entities) {
    return _.find(entities, function(entity) {
      return entity.isPlayer;
    });
  }

  function movePlayerUp() {
    var p = getPlayerEntity(system.entities);
    system.world.moveEntityTo(p, p.mapX, p.mapY - 1);
  }

  function movePlayerDown() {
    var p = getPlayerEntity(system.entities);
    system.world.moveEntityTo(p, p.mapX, p.mapY + 1);
  }

  function movePlayerLeft() {
    var p = getPlayerEntity(system.entities);
    system.world.moveEntityTo(p, p.mapX - 1, p.mapY);
  }

  function movePlayerRight() {
    var p = getPlayerEntity(system.entities);
    system.world.moveEntityTo(p, p.mapX + 1, p.mapY);
  }

  function createProjectile() {
    var p = getPlayerEntity(system.entities);
    var pName = p.element;
    if (!_.has(PROJECTILES, pName)) {
      return;
    }

    var props = PROJECTILES[pName](p);
    system.addEntity(entityFactory(pName, props));
  }

  function InputSystem(entities, world, addEntity) {
    system.entities = entities;
    system.world = world;
    system.addEntity = addEntity;

    this.init();
  }

  InputSystem.prototype = {
    init: function() {
      this.setContext();
    },
    setContext: function() {
      key('w', movePlayerUp);
      key('s', movePlayerDown);
      key('a', movePlayerLeft);
      key('d', movePlayerRight);
      key('enter', createProjectile);
    }
  };

  return InputSystem;
});
