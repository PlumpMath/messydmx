var options = {
        host: '192.168.1.240'
}
var sleep = require('sleep');
var artnet = require('artnet')(options);
var data_lights = require('./data_lights.json');

//for(var i = 1; i <= 25; i++) {
  //artnet.set(i, 0, function (err, res) {
  //});
//}

//for(var i = 1; i <= 25; i++) {
  //artnet.set(i, 255, function (err, res) {
  //});
//}

//artnet.set(24, 255, function (err, res) {
//});

function setlight(lightno, lightlevel, cb) {
  cb = cb || function(e, r) { };
  try {
    var ch = data_lights.lights["LIGHT-" + lightno].dmx.channel;
    console.log(ch);
    artnet.set(ch, lightlevel, cb);
  } catch(e) {
    console.log(e);
  }
}



for(var i = 0; i <= 17; i++) {
  setlight(i, 255);
} 
