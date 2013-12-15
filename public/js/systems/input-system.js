define([
  'underscore',
  'keymaster',
  'data/projectiles'
], function(_, key, PROJECTILES){
  var system = {};

  function movePlayerUp() {
    var player = movePlayer(0, -1);
    player.direction = 'up';
  }

  function movePlayerDown() {
    var player = movePlayer(0, 1);
    player.direction = 'down';
  }

  function movePlayerLeft() {
    var player = movePlayer(-1, 0);
    player.direction = 'left';
  }

  function movePlayerRight() {
    var player = movePlayer(1, 0);
    player.direction = 'right';
  }

  function movePlayer(dx, dy) {
    var p = system.GameSystem.getHero();
    system.GameSystem.getMap().moveEntityTo(p, p.mapX + dx, p.mapY + dy);
    return p;
  }

  function performAction() {
    system.GameSystem.playerActionAt();

    // prevent default (keymaster)
    return false;
  }

  function swapProjectile() {
    var p = system.GameSystem.getHero();
    var projectiles = p.projectiles;
    if (projectiles.length > 1) {
      var i = _.indexOf(p.projectiles, p.element);
      p.element = projectiles[i+1] || projectiles[0];
    }
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

  function shootProjectileLeft() {
    var p = system.GameSystem.getHero();
    var pName = p.element;
    if (!_.has(PROJECTILES, pName)) {
      return;
    }

    var props = PROJECTILES[pName](p);
    props.speedX = -3;
    props.x = p.x - 10;
    system.GameSystem.createEntity(pName, props);
  }

  function shootProjectileRight() {
    var p = system.GameSystem.getHero();
    var pName = p.element;
    if (!_.has(PROJECTILES, pName)) {
      return;
    }

    var props = PROJECTILES[pName](p);
    props.speedX = 3;
    props.x = p.x + 10;
    system.GameSystem.createEntity(pName, props);
  }

  function shootProjectileUp() {
    var p = system.GameSystem.getHero();
    var pName = p.element;
    if (!_.has(PROJECTILES, pName)) {
      return;
    }

    var props = PROJECTILES[pName](p);
    props.speedX = 0;
    props.x = p.x;
    props.speedY = -3;
    system.GameSystem.createEntity(pName, props);
  }

  function shootProjectileDown() {
    var p = system.GameSystem.getHero();
    var pName = p.element;
    if (!_.has(PROJECTILES, pName)) {
      return;
    }

    var props = PROJECTILES[pName](p);
    props.speedX = 0;
    props.x = p.x;
    props.speedY = 3;
    system.GameSystem.createEntity(pName, props);
  }

  function InputSystem(GameSystem) {
    system.GameSystem = GameSystem;
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
      key('enter', _.throttle(shootProjectile, 250));
      key('x', _.throttle(swapProjectile, 100));
      key('space', _.throttle(performAction, 100));
      key('j', _.throttle(shootProjectileLeft, 250));
      key('l', _.throttle(shootProjectileRight, 250));
      key('i', _.throttle(shootProjectileUp, 250));
      key('k', _.throttle(shootProjectileDown, 250));
    }
  };

  return InputSystem;
});
