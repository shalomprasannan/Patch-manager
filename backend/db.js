var mysql = require('mysql');
const express = require('express')
var bodyParser = require("body-parser");
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = 3001

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sihbkjhkjh0d",
  database: "report"
});
// my sql connection
con.connect(function(err) {
    console.log("Connected!");
    if (err) throw err;
});

var skip=0
var machines=[]
var socket;
io.on('connection', async function (sock) {
    console.log('Connected');
    socket = sock;
    console.log(socket.handshake.headers.query)
    await socket.on('hostname',function (data){ //await to get the hostname on first connection
      console.log(data)
      socket.hostname=data
    })
    
    for (var i in machines){  //looking for the socket id in machines array and set flag and push if new
      if (machines[i].id==socket.id)
      {skip=1}
    }
    
    if(skip==0){
      machines.push(socket)}
    skip=0
});

app.get('/api/sql', (req, res) => {   //just for testing purpose
  for (var i in machines){
    console.log(machines[i].id)
  }
  console.log(machines)
  res.send("data")
})

app.post('/api/sql', (req, res) => {
    console.log( req.body.output)
            con.query("SELECT * FROM inventory where "+ req.body.field + " like '" + req.body.pattern +"'", function (err, result, fields) {
          if (err) throw err;
          res.send(result)
        });
})

app.post('/api/client',(req,res)=>{
    req.io=io; //using the io object inside
    console.log(req.body.command)
    const com={command : req.body.command} //command from react
    req.io.to(machines[0].id).emit('message',com)// sending the command to the first connected python client
    console.log("sent to client")
    machines[0].once('output', function(message)      { // wait for its output emit
      console.log("sent to frontend")
      res.send(message.data)
  });
  console.log("ran over")
})

/*io.on('connection', function(client) {
    client.on('output', function(message)      {
        console.log(message);        
    });
});*/ 

app.listen(port, () => {  //port for express
  console.log(`Example app listening on port ${port}`)
})


http.listen(3002, function(){ //port for socket.io
    console.log('listening on *:3002');
  });
