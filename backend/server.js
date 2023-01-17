var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3001, function(){
  console.log('listening on *:3001');
});




io.on('connection', function(client) {
    const com={command:"get-service|select-object -first 3|convertto-json"}
    io.emit('message',com)
    client.on('output', function(message)      {
        console.log(message);        
    });

});