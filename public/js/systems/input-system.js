define([
  'underscore',
  'keymaster',
  'data/projectiles'
], function(_, key, PROJECTILES){
  var system = {};

  function movePlayerUp() {
    movePlayer(0, -1);
  }

  function movePlayerDown() {
    movePlayer(0, 1);
  }

  function movePlayerLeft() {
    movePlayer(-1, 0);
  }

  function movePlayerRight() {
    movePlayer(1, 0);
  }

  function movePlayer(dx, dy) {
    var p = system.GameSystem.getHero();
    system.world.moveEntityTo(p, p.mapX + dx, p.mapY + dy);
  }

  function shootProjectile() {
    var p = system.GameSystem.getHero();
    var pName = p.element;
    if (!_.has(PROJECTILES, pName)) {
      return;
    }

    var props = PROJECTILES[pName](p);
    system.GameSystem.createEntity(pName, props);
  }

  function InputSystem(GameSystem, world) {
    system.GameSystem = GameSystem;
    system.world = world;

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
      key('enter', shootProjectile);
    }
  };

  return InputSystem;
});
