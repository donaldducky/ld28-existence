define([
], function(){
  // render layers (ie. zindex)
  var layers = {
    tile: 1,
    dead: 2,
    item: 3,
    unit: 5,
    projectile: 10,
    ui: 15
  };

  return layers;
});
