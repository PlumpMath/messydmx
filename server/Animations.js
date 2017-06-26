var _ = require('lodash');
var DMX = require('dmx');
var A = DMX.Animation;

var Animations = {};


Animations.channelsToLevelObj = function(channels, level) {
	return _.zipObject(channels, _.map(channels, _.constant(level)));
}

Animations.set = function(channels, level) {
	var x = new A()
		.add(Animations.channelsToLevelObj(channels, level), 20, { 'easing': 'linear' })
		.delay(10)
	return x;
}


Animations.onOff = function(channels) {
		console.log(Animations.channelsToLevelObj(channels, 255));
	var x = new A()
		.add(Animations.channelsToLevelObj(channels, 200), 500, { 'easing': 'linear' })
		.delay(1500)
		.add(Animations.channelsToLevelObj(channels, 30), 1000, { 'easing': 'linear' })
	return x;
}

Animations.parse = function(options) {
};

module.exports = Animations;

