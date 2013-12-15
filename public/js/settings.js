define([
], function(){
  var settings = {
    canvasId: 'drawingboard',
    width: 640,
    height: 480,
    cols: 20,
    rows: 15
  };

  settings.gridX = settings.width / settings.cols;
  settings.gridY = settings.height / settings.rows;

  return settings;
});
