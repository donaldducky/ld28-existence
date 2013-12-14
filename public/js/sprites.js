/*global define*/
define([
], function(){
  var sprites = {
    _image: document.getElementById('sprites'),

    human: { x: 0, y: 0, width: 32, height: 32 },
    fire: { x: 32, y: 0, width: 32, height: 32 },
    wind: { x: 32*4, y: 0, width: 32, height: 32 },
    forest: { x: 0, y: 32, width: 32, height: 32 },
    mountain: { x: 32, y: 32, width: 32, height: 32 },
    grass: { x: 32*2, y: 32, width: 32, height: 32 },
    river: { x: 32*3, y: 32, width: 32, height: 32 }
  };

  return sprites;
});
