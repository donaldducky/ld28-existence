/*global define*/
define([
  'data/layers'
], function(LAYERS){
  var components = {
    position: {
      x: 0,
      y: 0
    },
    size: {
      height: 32,
      width: 32
    },
    ui: {
      layer: LAYERS.ui,
      ui: true
    }
  };

  return components;
});
