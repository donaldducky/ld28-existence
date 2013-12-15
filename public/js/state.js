define([
  'data/layers'
], function(LAYERS){
  var state = {
    mapId: 'cave',
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

  state.mapId = 'cave2';
  state.hero = {
    hp: 10,
    hpMax: 10,
    element: 'fire',
    isPlayer: true,
    layer: LAYERS.unit,
    projectiles: [ 'wind', 'fire' ],
    weaponPower: 10
  };

  return state;
});
