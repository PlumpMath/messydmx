"use strict"

var _ = require('lodash');
var DMX = require('dmx');
var A = DMX.Animation;
var Animations = require('./Animations');
var say = require('say');

var data_lights = require('./data_lights.json');

var dmx = new DMX();
var universe = dmx.addUniverse('demo', 'artnet', '192.168.1.240')

var x = new A()
  .add({1: 255}, 500, { 'easing': 'inCubic' })
  .delay(500)
  .add({1: 0}, 500, { 'easing': 'inCubic' })
  .delay(500);

var y = new A()
  .add({1: 5}, 500, { 'easing': 'inCubic' })
  .delay(500)
  .add({1: 200}, 500, { 'easing': 'inCubic' })
  .delay(500);


var channels = _.range(1, 26);
var dmxcounter = 1;
var dmxmax = 25;

_.each(data_lights.lights, function(v, k) {
	console.log(k.split("LIGHT-")[1]);
	console.log(v);
});

var lightcounter = 0;
var lightmax = 17;

function lightToDmx(lightn) {
	return data_lights.lights["LIGHT-" + lightn].dmx.channel;
}

function lightsInSequence() {
	setInterval(function(){
		var thisc = [24];
		var thisc = _.sampleSize(channels, 4);
		var dmxc = lightToDmx(lightcounter);
		var thisc = [dmxcounter];
		var thisc = [dmxc]
		//say.speak(thisc.join(", "));
		say.speak("light " + lightcounter + " channel " + dmxc, 'Ava', 0.5);

		Animations.onOff(thisc).run(universe);

		if(dmxcounter++ >= dmxmax) dmxcounter = 1;
		if(lightcounter++ >= lightmax) lightcounter = 0;

	}, 2000); 
}

function randomLights() {
	var lights = _.range(0, 18);
	setInterval(function(){
		var thisLights = _.sampleSize(lights, 3);
		var thisChannels = _.map(thisLights, lightToDmx);

		say.speak(thisLights.join(", "), 'Ava', 1);

		Animations.onOff(thisChannels).run(universe);

	}, 500); 
}

function randomSetLights() {
	var lights = _.range(0, 18);
	console.log("wft");
	_.each(lights, function(lg) {
		var thisC = lightToDmx(lg);

		console.log("LIGHT-" + lg + " : CH-" + thisC);

		var op = {}; op[thisC] = _.random(10, 150);
		universe.update(op);
	});
}

//lightsInSequence();
randomLights();
//randomSetLights();
