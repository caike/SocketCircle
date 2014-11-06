module.exports = localIpAddress;

var interfaces = require('os').networkInterfaces();

function localIpAddress() {
  var ip = null;

  for(var i in interfaces){
    if(i === "en0"){
      ip = getIpv4(interfaces[i]);
      break;
    }
  }

  return ip;
}

function getIpv4(interface) {
  var ipv4 = null;

  interface.forEach(function(element) {
    if(element.family.toLowerCase() === "ipv4")
      ipv4 = element.address;
  });

  return ipv4;
};
