var socket = io.connect('http://localhost:8080');
// TODO socket.emit from devOrientHandler

if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', devOrientHandler, false);
}


function devOrientHandler (eventData) {
  // gamma is the left-to-right tilt in degrees, where right is positive
  var tiltLR = eventData.gamma;
  // beta is the front-to-back tilt in degrees, where front is positive
  var tiltFB = eventData.beta;
  // alpha is the compass direction the device is facing in degrees
  var dir = eventData.alpha

  console.log(tiltLR);
  console.log(tiltFB);
  console.log(dir);
}

