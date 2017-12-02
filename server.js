var fs = require("fs");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const getusers = require('./modules/getusers.js');
var files = require('./modules/files.js');
var mkdirp = require('mkdirp');
var cmd=require('node-cmd');
const serializeError = require('serialize-error');


app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile( __dirname + "/public/templates/" + "index.html" );
});

app.get('/users', function(req, res){
  users = getusers();
  res.send(users);
  // console.log(users);
});

app.use(function(req, res){
  res.send(404,"Not found :-(");
});

io.on('connection', function(socket){
  console.log('User connected');

  socket.on('chat message',function(msg){
  	io.emit('chat message',  msg);
  	console.log('message:', msg);
  });

  socket.on('main textarea', function(word){
  	socket.broadcast.emit('main textarea', word);
  	console.log('textarea:',word.value);
  });

  socket.on('code to run',function(codevalue){
    // io.emit('chat message',  msg);
    var user_id = "john";
    console.log('code:', codevalue);
      mkdirp('workspace/users/'+user_id, function (err) {
          if (err) {
            console.error(err)
          }
          console.log('Creation success!!!!!')
      });
// writting to the test.py file
      fs.writeFile('workspace/users/'+user_id+'/test.py', codevalue , function(err) {
        if(err) {
                console.log(err);
            }

            console.log("The file was saved!");
        }); 
// Running code in command promp 
      cmd.get('python C:/Users/RCH/Desktop/project_nodejs/workspace/users/john/test.py',function(err, data, stderr)
      {
              if(err){
                console.log('Error message : '+err);
                data = JSON.stringify(serializeError(err));
                // data = err;
                io.emit('output code', data);
              }
              console.log('output data : '+data);
              io.emit('output code', data);
            }
      );






  });

});

http.listen(8081, function(){
  console.log('listening on 127.0.0.1:8081');
});