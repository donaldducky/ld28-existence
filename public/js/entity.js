/*global define*/
define([
  'backbone',
  'underscore'
], function(Backbone, _){
  var Entity = function(options) {
    this.id = _.uniqueId('e');

    // copy all options over except id
    options = options || {};
    _.extend(this, _.omit(options, 'id'));
  };

  Entity.extend = Backbone.Model.extend;

  return Entity;
});
