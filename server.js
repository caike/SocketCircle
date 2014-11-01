var express = require('express');
var app = express();

app.use(express.static('public'));

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function() {
  console.log('Client Connected');
});

server.listen(8080, function() {
  console.log('Server up!');
});

