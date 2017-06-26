var _ = require('lodash');
var http = require('http');
var path = require('path');
var osc = require('osc');
var express = require('express');
var app = express();
var DMX = require('dmx');

var data_lights = require('./data_lights.json');
var Helpers = require('./Helpers');
var Animations = require('./Animations');


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
			console.log("oh we got data to LOG!");
			// but uh.
		});

		socket.on('getLights', function (data) {
			socket.emit('getLightsResponse', data_lights); // send to just the person who responded
		});

		socket.on('dmxCommand', function (data) {
			console.log(data);
		});

		socket.on('onOffLight', function (data) {
			console.log(" doing onofflight for " + data.id);
			console.log("dmx channel: " + data_lights.lights[data.id].dmx.channel);
			Animations.onOff([data_lights.lights[data.id].dmx.channel]).run(universe);
//			Animations.onOff([24]).run(universe);
			console.log(data);
		});

		socket.on('disconnect', () => console.log('disconnect ' + socket.id));

  });

}

function setupOsc() {
  var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: true
  });

		// Listen for incoming OSC bundles.
	udpPort.on("bundle", function (oscBundle, timeTag, info) {
		console.log("An OSC bundle just arrived for time tag", timeTag, ":", oscBundle);
		console.log("Remote info is: ", info);
	});

	udpPort.on("message", function (oscMsg) {
		if(oscMsg.address == '/LIGHTVALS') {
			handleLightvals(oscMsg);
		}
	});

	// Open the socket.
	udpPort.open();

	// When the port is read, send an OSC message to, say, SuperCollider
	udpPort.on("ready", function () {
		console.log("we ready");
	});


}

function handleLightvals(oscMsg) {
	_.each(oscMsg.args, function(e, i) {
		var thisD = Helpers.lightToDmx(data_lights, i);
		console.log(i + " (" + thisD + ") " + e.value)
		var opt = {};
		opt[thisD] = e.value;
		universe.update(opt);
	});
}

function setupExpress() {
  global.server = http.createServer(app);

  server.listen(process.env.PORT || 3000, function() {
    console.log("Listening on %j", server.address());
  });
}

function setupDmx() {
  global.A = DMX.Animation;
  global.dmx = new DMX();
  global.universe = dmx.addUniverse('demo', 'artnet', '192.168.1.240')


//	Animations.onOff([1,4,5]).run(universe);

	console.log(data_lights);
}

/************** MAIN *************/

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + 'client/index.html'));
});

if (require.main === module) {

  setupExpress();
  setupSocket();
  setupDmx();
	setupOsc();
}





