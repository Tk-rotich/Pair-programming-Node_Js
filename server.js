
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile( __dirname + "/public/templates/" + "index.html" );
});

io.on('connection', function(socket){
  console.log('User connected');
  socket.on('chat message',function(msg){
  	io.emit('chat message', msg);
  	console.log('message:', msg);
  });

});

http.listen(8081, function(){
  console.log('listening on 127.0.0.1:8081');
});