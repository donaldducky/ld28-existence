/*global define*/
define([
], function(){
  var sprites = {
    _image: document.getElementById('sprites'),

    human: { x: 0, y: 0, width: 32, height: 32 },
    fire: { x: 32, y: 0, width: 32, height: 32 },
    wind: { x: 32*4, y: 0, width: 32, height: 32 },
    dog: { x: 32*5, y: 0, width: 32, height: 32 },
    treasure: { x: 32*6, y: 0, width: 32, height: 32 },

    forest: { x: 0, y: 32, width: 32, height: 32 },
    mountain: { x: 32, y: 32, width: 32, height: 32 },
    grass: { x: 32*2, y: 32, width: 32, height: 32 },
    river: { x: 32*3, y: 32, width: 32, height: 32 },
    cave: { x: 32*4, y: 32, width: 32, height: 32 },
    dirt: { x: 32*5, y: 32, width: 32, height: 32 },
    tree: { x: 32*6, y: 32, width: 32, height: 32 },

    left: { x: 0, y: 32*2, width: 32, height: 32 },
    right: { x: 32, y: 32*2, width: 32, height: 32 },
    up: { x: 32*2, y: 32*2, width: 32, height: 32 },
    down: { x: 32*3, y: 32*2, width: 32, height: 32 },

    skeleton: { x: 0, y: 32*3, width: 32, height: 32 },
    skeleton_dead: { x: 32, y: 32*3, width: 32, height: 32 },
    punch: { x: 32*2, y: 32*3, width: 32, height: 32 },
    blood: { x: 32*3, y: 32*3, width: 32, height: 32 }
  };

  return sprites;
});
