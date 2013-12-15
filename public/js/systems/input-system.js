define([
  'underscore',
  'keymaster',
  'data/projectiles'
], function(_, key, PROJECTILES){
  var system = {};

  var movements = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  function movePlayerUp() {
    movePlayer('up');
  }

  function movePlayerDown() {
    movePlayer('down');
  }

  function movePlayerLeft() {
    movePlayer('left');
  }

  function movePlayerRight() {
    movePlayer('right');
  }

  function movePlayer(direction) {
    var p = system.GameSystem.getHero();
    if (!p) {
      return;
    }

    var d = movements[direction];
    system.GameSystem.getMap().moveEntityTo(p, p.mapX + d.x, p.mapY + d.y);
  }

  function performAction() {
    system.GameSystem.playerActionAt();

    // prevent default (keymaster)
    return false;
  }

  function swapProjectile() {
    var p = system.GameSystem.getHero();
    if (!p) {
      return;
    }

    var projectiles = p.projectiles;
    if (projectiles.length > 1) {
      var i = _.indexOf(p.projectiles, p.element);
      p.element = projectiles[i+1] || projectiles[0];
    }
  }

  function shootProjectile(direction) {
    var p = system.GameSystem.getHero();
    if (!p) {
      return;
    }

    var pName = p.element;
    if (!_.has(PROJECTILES, pName)) {
      return;
    }

    var props = PROJECTILES[pName](p);

    switch (direction) {
    case 'left':
      props.speedX = -3;
      props.x = p.x - 10;
      break;
    case 'right':
      props.speedX = 3;
      props.x = p.x + 10;
      break;
    case 'up':
      props.speedX = 0;
      props.x = p.x;
      props.speedY = -3;
      break;
    case 'down':
      props.speedX = 0;
      props.x = p.x;
      props.speedY = 3;
      break;
    }

    system.GameSystem.createEntity(pName, props);
  }

  function shootProjectileLeft() {
    shootProjectile('left');
  }

  function shootProjectileRight() {
    shootProjectile('right');
  }

  function shootProjectileUp() {
    shootProjectile('up');
  }

  function shootProjectileDown() {
    shootProjectile('down');
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
