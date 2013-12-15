define([
  'underscore',
  'data/maps/world',
  'data/maps/cave'
], function(_, world, cave){
  var maps = {
    world: world,
    cave: cave
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
