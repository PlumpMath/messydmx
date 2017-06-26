Helpers = {};

Helpers.generateArr = function(data, len) {
  return Array.apply(null, Array(len)).map(function(){return data})
}

Helpers.lightToDmx = function(data, lightn) {
	return data.lights["LIGHT-" + lightn].dmx.channel;
}

module.exports = Helpers;
