/*global define*/
define([
  'jquery'
], function($){

  var ui = {
    selectWeapon: function(element) {
      $('#weapons .icon-container').removeClass('selected');
      $('#weapons .icon-' + element).parent().addClass('selected');
    }
  };

  return ui;
});
