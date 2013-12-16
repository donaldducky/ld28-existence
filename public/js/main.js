/*global config */
require.config({
  paths: {
    backbone: 'lib/backbone',
    underscore: 'lib/underscore',
    jquery: 'lib/jquery',
    tpl: 'lib/tpl',
    keymaster: 'lib/keymaster'
  },
  shim: {
    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    keymaster: {
      exports: 'key'
    }
  }
});

require([
  'game'
], function(game) {
  game();
});
