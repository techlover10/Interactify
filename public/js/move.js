function allowMove(id) {
  // get a reference to an element
  var stage = document.getElementById(id);
  $stage = jQuery(stage);

  // create a manager for that element
  var manager = new Hammer.Manager(stage);

  // create recognizers
  var Pan = new Hammer.Pan();
  var Rotate = new Hammer.Rotate();
  var Pinch = new Hammer.Pinch();
  var Tap = new Hammer.Tap({
    taps: 1
  });
  var DoubleTap = new Hammer.Tap({
    event: 'doubletap',
    taps: 2
  });

  // use them together
  Rotate.recognizeWith([Pan]);
  Pinch.recognizeWith([Rotate, Pan]);

  DoubleTap.recognizeWith([Tap]);
  Tap.requireFailure([DoubleTap]);

  // add the recognizers
  manager.add(Pan);
  manager.add(Rotate);
  manager.add(Pinch);
  manager.add(DoubleTap);
  manager.add(Tap);

  // subscribe to events
  var liveScale = 1;
  var currentRotation = 0;
  manager.on('rotatemove', function (e) {
    // do something cool
    var rotation = currentRotation + Math.round(liveScale * e.rotation);
    $.Velocity.hook($stage, 'rotateZ', rotation + 'deg');
  });
  manager.on('rotateend', function (e) {
    // cache the rotation
    currentRotation += Math.round(e.rotation);
  });

  var deltaX = 0;
  var deltaY = 0;
  manager.on('panmove', function (e) {
    // do something cool
    var dX = deltaX + (e.deltaX);
    var dY = deltaY + (e.deltaY);
    $.Velocity.hook($stage, 'translateX', dX + 'px');
    $.Velocity.hook($stage, 'translateY', dY + 'px');
  });
  manager.on('panend', function (e) {
    deltaX = deltaX + e.deltaX;
    deltaY = deltaY + e.deltaY;
  });

  // subscribe to events
  var currentScale = 1;
  function getRelativeScale(scale) {
    return scale * currentScale;
  }
  manager.on('pinchmove', function (e) {
    // do something cool
    var scale = getRelativeScale(e.scale);
    $.Velocity.hook($stage, 'scale', scale);
  });
  manager.on('pinchend', function (e) {
    // cache the scale
    currentScale = getRelativeScale(e.scale);
    liveScale = currentScale;
  });

  var isShrunken = false;
  manager.on('doubletap', function () {
    console.log('doubletapped');
    var scale = $.Velocity.hook($stage, 'scale');
    if (isShrunken) {
      $.Velocity.hook($stage, 'scale', 2 * scale);
    } else {
      $.Velocity.hook($stage, 'scale', .5 * scale);
    }
    isShrunken = !isShrunken;
  });

}
