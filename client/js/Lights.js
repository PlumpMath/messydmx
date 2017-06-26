var Lights = {};
Lights.lights = [];

Lights.logClick = function(e) {
	console.log("logging click");
	socket.emit('log', {
		'entry': {
			'type': 'click',
			'date': new Date(),
			'pos': { 'x': e.offsetX, 'y': e.offsetY }
		}
	});
	console.log({ 'x': e.offsetX, 'y': e.offsetY })
	window.setTimeout(function() {
		Lights.updateLights();
	}, 100);
}

Lights.activateClick = function(e) {
}

Lights.docReady = function() {

  $("#floorplan").click(function(e) {
		if($("input[value=Add]").prop('checked')) {
			Lights.logClick(e);
		}
		if($("input[value=Activate]").prop('checked')) {
			Lights.activateClick(e);
		}
  });

  // handle receiving lights
  socket.on('getLightsResponse', Lights.getLightsResponse);

  Lights.Vue = new Vue({
    el: '#lights',
    data: {
      lights: Lights.lights
    },
		methods: {
			lightClick: function(e) {
        console.log("clicked light: " + e.target.id);
        socket.emit("onOffLight", { id: e.target.id });
			}
		}
  })

  Lights.updateLights();
};


Lights.updateLights = function() {
  socket.emit("getLights", {});
};

Lights.getLightsResponse = function(data) {
	console.log(data);
  Lights.Vue.lights = data.lights;
};


