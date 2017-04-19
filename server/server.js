var _ = require('lodash');
var Helpers = require('./Helpers.js');
var Queue = require('./Queue.js');

var options = {
      host: '192.168.1.240'
}

var artnet = require('artnet')(options);
var queue = new Queue({
  'artnet': artnet
});

// set channel 1 to 255 and disconnect afterwards.


//_.each(channels, function(c) {
  //artnet.set(c, 255, function (err, res) {
  //});
  //console.log(c);
//});

console.log(Helpers);

//queue.setChannels(channels, 255);
var fadeUpA = function(channels) {
	queue.fadeTo({
		'channels' : channels,
		'levelFrom': 1,
		'levelTo': 200,
		'duration': 200,
		'callback': function() {
			console.log("fadeUpADone");
			fadeDownA(channels);
		}
	});
}
var fadeDownA = function(channels) {
	queue.fadeTo({
		'channels' : channels,
		'levelFrom': 200,
		'levelTo': 1,
		'duration': 2000,
		'callback': function() {
			console.log("fadeDownADone");
		}
	});
}
/*queue.fadeTo({
	'channels' : [13,14,15,16,17,18,19,20,21,22,23,24],
	'levelFrom': 255,
	'levelTo': 5,
	'duration': 4000
});*/
//queue.config.artnet.set(1, Helpers.generateArr(255, channels.length));


//fadeUpA();
var channels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]; // hardcode this

var count = 1;
setInterval(function() {
	count = ((count+1) % 23);
	var thisc = [_.sample(channels)];
	thisc = [channels[count]];
	console.log(thisc);
	fadeUpA(thisc);
}, 200);
