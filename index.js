const express = require('express')
const path = require('path');
const http = require('http');

const app = express()
const router = express.Router();

let basePath = __dirname;

router.get("/",function(req,res){
  res.render("index");
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname + "/public/views"));
app.use(express.static(__dirname + '/public'));

app.use("/",router);

var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000, function() {
  console.log("App listening on port 3000!")
});

// Connection Code

let tableSockets = []

io.on('connection', function(socket){
    // receives a connect message from the card table
    socket.on("table-connect", function (tableId) {
        console.log("tableID " + tableId + " connected");
        tableSockets[tableId] = socket;
        socket.tableId = tableId;
    });

    // receives a connect message from a phone
    socket.on("phone-connect", function (tableId) {
        console.log("phone-connect to " + tableId)
        var tableSocket = tableSockets[tableId];
        if (tableSocket) {
            console.log("attempting to connect to " + tableId);
            tableSocket.emit('phone-connect');
        }
    });

    // receives a move from a phone
    socket.on('phone-move', function (data) {
        var tableSocket = tableSockets[data.tableId];
        if (tableSocket) {
            tableSocket.emit('phone-move', data.angle);
        }
    });

    // receives a throw card message from a phone
    socket.on('phone-throw-card', function (data) {
        console.log("card thrown")
        console.log(data)
        var tableSocket = tableSockets[data.tableId];
        if (tableSocket) {
            tableSocket.emit('phone-throw-card', data);
        }
    });

    socket.on('disconnect', function () {
        if(socket.tableId) {
            delete tableSockets[socket.tableId];
        }
    });
});