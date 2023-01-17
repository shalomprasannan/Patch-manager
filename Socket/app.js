var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3005, function(){
  console.log('listening on *:3001');
});

 setInterval(()=>{
    var msg = Math.random();
    io.emit('message', msg);},1000)

io.on('connection', function(client) {
    client.on('data', function(message)      {
        console.log(message.clientdata +" , "+client.id );
        
        /*setTimeout(()=>{var msg = Math.random();
            console.log(client.id)*/
       
    //},3000);
        
    });

});