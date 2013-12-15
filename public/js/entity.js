/*global define*/
define([
  'backbone',
  'underscore'
], function(Backbone, _){
  var Entity = function(options) {
    this._id = _.uniqueId('e');
    this.initialize(options);
  };
  _.extend(Entity.prototype, {
    initialize: function(options) {
      // copy all options over except id
      options = options || {};
      _.extend(this, _.omit(options, 'id'));
    }
  });

  // borrow backbone extend but modify it so it accepts components as arguments
  var slice = [].slice;
  Entity.extend = function() {
    var components = slice.call(arguments);
    components.unshift({});
    var args = _.extend.apply(this, components);
    return Backbone.Model.extend.call(this, args);
  };

  return Entity;
});
