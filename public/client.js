(function($){

  var ip = $('#ip-value');
  var circle = $('#circle');

  var socket = io.connect(ip);

  socket.on('connect', function(e) {
    console.log('connected');
  });

  var previousValue = 0

  var originalMarginLeft = parseInt(circle.css('margin-left'));
  var moveRight = _.throttle(moveToRight, 250);
  var moveLeft = _.throttle(moveToLeft, 250);

  socket.on('circle-move', function(data) {
    var lr = parseFloat(data.left_right).toFixed(1);

    var delta = lr - previousValue;
    if(Math.abs(delta) < 4){
      return;
    }

    if((lr > 0 && lr > previousValue) || (lr < 0 && lr < previousValue)){
      console.log("move right: " + lr);
      moveRight(Math.abs(lr - previousValue));
    }else{
      console.log("move left: " + lr);
      moveLeft(Math.abs(lr - previousValue));
    }

    previousValue = lr;
  });

  function moveToRight(value) {
    circle.css('margin-left', function(index, current){
      diff = (parseInt(current) + value*4);
      return diff.toString() + "px";
    });
  }

  function moveToLeft(value) {
    circle.css('margin-left', function(index, current){
      diff = (parseInt(current) - value*4);
      return diff.toString() + "px";
    });
  }

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', devOrientHandler, false);
  }

  function devOrientHandler (eventData) {
    // gamma is the left-to-right tilt in degrees, where right is positive
    var tiltLR = eventData.gamma;
    // beta is the front-to-back tilt in degrees, where front is positive
    var tiltFB = eventData.beta;
    // alpha is the compass direction the device is facing in degrees
    var direction = eventData.alpha

    socket.emit('phone-move', {
      tiltLR: tiltLR,
      tiltFB: tiltFB,
      direction: direction
    });
  }

})(jQuery);
