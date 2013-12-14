/*global config */
require.config({
  paths: {
    backbone: 'lib/backbone',
    underscore: 'lib/underscore',
    jquery: 'lib/jquery',
    tpl: 'lib/tpl',
    q: 'lib/q',
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
  console.log('start');
  game();
});