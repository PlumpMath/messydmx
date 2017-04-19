var _ = require('lodash');

class Queue {
  
  constructor(config) {
    this.config = config;
    this.freq = 4;
		this.state = {};
		this.state.channels = {};
		_.each(this.config.channels, function(c) {
			this.state.channels.c = {};
		});
  }

  setChannels(channels, level, callback) {
    var self = this;
    _.each(channels, function(c) {
      self.config.artnet.set(c, level);
    });

    // TODO: use promises for artnet.set callbacks
    if(typeof callback == "function") {  callback(); }
  }

  fadeTo(options) { //TODO: make more accurate
		var self=this;
		var inc = (options.levelTo - options.levelFrom) / (options.duration / this.freq);
		var state = options.levelFrom;
		this.fireLoop({
			'duration': options.duration,
			'freq': this.freq,
			'update': function(i) {
				state += inc;
//				console.log("setting " + options.channels + " to " + state);
				self.setChannels(options.channels, state)	
			},
			'callback': options.callback
		});
	}

	fireLoop(options) {
		var self = this;
		(function foo(){ // wrap everything in a self-invoking function, not to expose "times"
			var i = 0;
			var steps = options.duration / options.freq;
			(function run(){
				// do your stuff, like print the iteration
				options.update({ 'step': i });

				if( ++i < steps ) { // 200 * 20 = 4 seconds
					setTimeout(run, options.freq);
				} else {
					options.callback();
				}
			})();
		})();
	}







}

module.exports = Queue;
