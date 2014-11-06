var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var localIp = require('./local-ip-address');

app.get('/', function(request, response) {
  var locals = { localIp: localIp() + ":" + port };
  response.render('index.html.ejs', locals);
});

app.use(express.static('public'));

io.on('connection', function(client) {
  console.log('Client Connected');
  client.on('phone-move', function(data) {
    client.broadcast.emit('circle-move',
                          { left_right: data.tiltLR });
  });
});


var port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log('Server listening on ' + port);
});

