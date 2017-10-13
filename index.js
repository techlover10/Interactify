const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const app = express()
const router = express.Router();

let basePath = __dirname;

// ads loader
var fs = require('fs');

// scaffolding for ad switcher endpoint
var ads = JSON.parse(fs.readFileSync('public/ads/adsMaster.json', 'utf8'));
var currentAd = null;
var getCurrentAd = function(adSelected){
    if (adSelected == ""){
        currentAd = ads[Object.keys(ads)[Math.floor(Math.random() * ads.length)]];
    } else {
        currentAd = ads[adSelected];
    }
    return currentAd;
}

// Use body parser for post requests
app.use(bodyParser.json());

router.get("/adsList", function(req, res){
    res.send(ads);
});

router.get("/",function(req,res){
  res.render("index");
});

router.get("/tv",function(req,res){
  res.render("tv");
});

router.get("/remote",function(req,res){
  res.render("remote");
});

router.get("/admin",function(req,res){
  res.render("admin");
});

app.post("/currentAd", function(req, res){
    currentAd = req.body.id;
    res.send("complete");
});

router.get("/currentAdTaken", function(req, res){
    currentAd = null;
    res.send("");
});

router.get("/currentAdNoRefresh", function(req, res){
    res.send(ads[currentAd]);
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
        console.log("sprite thrown");
        var tableSocket = tableSockets[data.tableId];
        if (tableSocket) {
            tableSocket.emit('phone-throw-sprite', data);
        }
    });

    // sends an ad
    socket.on('send-ad', function (tableId){
        var tableSocket = tableSockets[tableId];
        if (tableSocket) {
            console.log("sending ad");
            tableSocket.emit('send-ad');
        }
    });


    // receives a get card message from a phone
    socket.on('phone-get-sprite', function (tableId) {
        console.log("card gotten")
        var tableSocket = tableSockets[tableId];
        if (tableSocket) {
            tableSocket.emit('phone-get-sprite');
        }
    });

    socket.on('disconnect', function () {
        if(socket.tableId) {
            delete tableSockets[socket.tableId];
        }
    });
});

