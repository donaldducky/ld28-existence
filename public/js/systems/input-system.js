define([
  'underscore',
  'backbone',
  'keymaster',
  'data/projectiles',
  'ui'
], function(_, Backbone, key, PROJECTILES, ui){
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
    p.direction = direction;
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
      ui.selectWeapon(p.element);
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

  function togglePause() {
    if (system.GameSystem.isPaused()) {
      system.GameSystem.unpause();
    } else {
      system.GameSystem.pause();
    }
  }

  function reset() {
    system.GameSystem.reset();
  }

  // map controls
  key('w', 'map', movePlayerUp);
  key('s', 'map', movePlayerDown);
  key('a', 'map', movePlayerLeft);
  key('d', 'map', movePlayerRight);
  key('j', 'map', _.throttle(shootProjectileLeft, 250));
  key('l', 'map', _.throttle(shootProjectileRight, 250));
  key('i', 'map', _.throttle(shootProjectileUp, 250));
  key('k', 'map', _.throttle(shootProjectileDown, 250));
  key('x', 'map', _.throttle(swapProjectile, 100));
  key('space', 'map', _.throttle(performAction, 100));
  key('p', 'map', _.throttle(togglePause, 100));

  // message
  key('space', 'message', _.throttle(function() {
    togglePause();
    // prevent page scroll from spacebar
    return false;
  }, 100));

  // paused
  key('p', 'pause', _.throttle(togglePause, 100));

  // game-over
  key('r', 'game-over', _.throttle(reset, 1000));

  // all
  key('backspace', function() {
    // do not go back in browser
    return false;
  });

  function InputSystem(game) {
    system.GameSystem = game;
    this.init();
  }

  _.extend(InputSystem.prototype, Backbone.Events, {
    init: function() {
      this.setContext(system.GameSystem.getContext());

      this.listenTo(system.GameSystem, 'context', this.setContext);
    },
    setContext: function(context) {
      key.setScope(context);
    }
  });

  return InputSystem;
});
