var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var Datastore = require('nedb');
var db = new Datastore({ filename: './dbfile', autoload: true });

var DMX = require('dmx');
var A = DMX.Animation;

function setupSocket() {
  global.io = require('socket.io')(server);

  io.on('connection', (socket) => {
		console.log('connect ' + socket.id);

		socket.on('echo', function (data) {
			console.log("oh we got data!");
			console.log(data);
			console.log("echoing back data!");
			socket.emit('message', data); // send to just the person who responded
		});

		socket.on('broadcast', function (data) {
			console.log("oh we got data!");
			console.log(data);
			console.log("broadcasting data!");
			socket.broadcast.emit('message', data); // send to everyone
		});

		socket.on('log', function (data) {
			console.log("oh we got data!");
			db.insert(data.entry, function (err, newDoc) {   // Callback is optional
				console.log(newDoc);
			});
		});

		socket.on('getClicks', function (data) {
      db.find({ 'type': 'click' }, function(err, docs) {
        var data = {};
        data.cursors = docs;
        console.log(docs);
			  socket.emit('sendClicks', data); // send to just the person who responded
      });
		});

		socket.on('getPaths', function (data) {
      db.find({ 'type': 'path' }, function(err, docs) {
        var data = {};
				data.paths = docs;
			  socket.emit('sendPaths', data); // send to just the person who responded
      });
		});

		socket.on('disconnect', () => console.log('disconnect ' + socket.id));

  });

}

function setupServer() {
  global.server = http.createServer(app);

  server.listen(process.env.PORT || 3000, function() {
    console.log("Listening on %j", server.address());
  });
}

function setupDmx() {
  global.dmx = new DMX();
  global.universe = dmx.addUniverse('demo', 'artnet', '192.168.1.240')
}

/************** MAIN *************/

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + 'client/index.html'));
});

if (require.main === module) {

  setupServer();
  setupSocket();
  setupDmx();

}





