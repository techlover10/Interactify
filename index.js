const express = require('express');
const path = require('path');
const http = require('http');

const app = express()
const router = express.Router();

let basePath = __dirname;

// ads loader
var fs = require('fs');

// scaffolding for ad switcher endpoint
//var ads = ["roku", "cox", "netflix", "cornell", "hulu"]
var ads = JSON.parse(fs.readFileSync('public/ads/adsMaster.json', 'utf8'));
var currentAd = ads[Math.floor(Math.random()*ads.length)];
var getCurrentAd = function(){
    var ad = currentAd;
    currentAd = ads[Math.floor(Math.random() * ads.length)];
    return ad
}

router.get("/",function(req,res){
  res.render("index");
});

router.get("/currentAd", function(req, res){
    res.send(getCurrentAd());
});

router.get("/currentAdNoRefresh", function(req, res){
    res.send(currentAd);
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
    // receives a throw card message from a phone
    socket.on('phone-throw-sprite', function (data) {
        console.log("card thrown")
        console.log(data)
        var tableSocket = tableSockets[data.tableId];
        if (tableSocket) {
            tableSocket.emit('phone-throw-sprite', data);
        }
    });

    // receives a get card message from a phone
    socket.on('phone-get-sprite', function (data) {
        console.log("card gotten")
        console.log(data)
        var tableSocket = tableSockets[data.tableId];
        if (tableSocket) {
            tableSocket.emit('phone-get-sprite', data);
        }
    });

    socket.on('disconnect', function () {
        if(socket.tableId) {
            delete tableSockets[socket.tableId];
        }
    });
});
