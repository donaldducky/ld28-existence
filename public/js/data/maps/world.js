define([
], function(){
  var world = {
    backgroundColor: 'rgb(156, 191, 227)',
    heroStart: {
      x: 6,
      y: 9,
      direction: 'down'
    },
    tiles: [
      "11111111111141111111",
      "12000220000000300021",
      "12000202000000300021",
      "12220220000000300021",
      "10000000000000300221",
      "10000000000000000221",
      "10000000000000300221",
      "10000000000000300221",
      "10000000000000302221",
      "10000000000000302221",
      "10000000000000302221",
      "10006000000000322221",
      "10000000000000322221",
      "10000000000000322221",
      "11111111111111111111"
    ],
    triggerTiles: [
      "00000000000010000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000",
      "00000000000000000000"
    ],
    actionTiles: [
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "    a               ",
      "                    ",
      "                    ",
      "                    "
    ],
    triggers: {
      1: 'cave_entrance'
    },
    actions: {
      a: 'world_tree'
    }
  };

  return world;
});