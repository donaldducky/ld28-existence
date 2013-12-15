/*global define*/
define([
  'jquery'
], function($){

  var ui = {
    selectWeapon: function(element) {
      $('#weapons .icon').removeClass('selected');
      $('#weapons .icon-' + element).addClass('selected');
    }
  };

  return ui;
});
