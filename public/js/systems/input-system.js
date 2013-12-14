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
    var player = system.GameSystem.getHero();
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
    var map = system.GameSystem.getMap();
    var action = map.getActionAt(x, y);
    action(player, system.GameSystem, x, y);

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
    }
  };

  return InputSystem;
});
