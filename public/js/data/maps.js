define([
  'underscore',
  'data/maps/world',
  'data/maps/cave',
  'data/maps/cave2'
], function(_, world, cave, cave2){
  var maps = {
    world: world,
    cave: cave,
    cave2: cave2
  };

  _.each(maps, function(map, id) {
    // assign id field
    map.id = id;

    // join array of strings into a single string for indexing
    // ie. a 1d character array
    _.each([
      'tiles', 'triggerTiles', 'unitTiles', 'actionTiles'
    ], function(key) {
      map[key] = map[key] ? map[key].join('') : '';
    });

    // what is this crap? TODO use _.defaults
    map.actions = map.actions || {};
  });

  return maps;
});
