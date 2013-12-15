/*global define*/
define([
  'jquery'
], function($){

  var ui = {
    selectWeapon: function(element) {
      $('#weapons .icon-container').removeClass('selected');
      $('#weapons .icon-' + element).parent().addClass('selected');
    },
    addWeapon: function(weaponName) {
      $('#weapons').append('<div class="icon-container"><span class="icon icon-' + weaponName + '"></span></div>');
    }
  };

  return ui;
});
