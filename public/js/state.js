define([
  'data/layers'
], function(LAYERS){
  var state = {
    mapId: 'world',
    hero: {
      hp: 10,
      hpMax: 10,
      element: 'wind',
      isPlayer: true,
      layer: LAYERS.unit,
      projectiles: [ 'wind' ],
      weaponPower: 1
    }
  };

  return state;
});
