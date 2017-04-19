"use strict"

var DMX = require('dmx');
var A = DMX.Animation;

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


x.run(universe)
y.run(universe, function(e) {
  console.log("y is done");
})

/*var on = false;
setInterval(function(){
  if(on){
    on = false;
    universe.updateAll(0);
    console.log("off");
  }else{
    on = true;
    universe.updateAll(250);
    console.log("on");
  }
}, 1000);
*/
