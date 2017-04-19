Helpers = {};

Helpers.generateArr = function(data, len) {
  return Array.apply(null, Array(len)).map(function(){return data})
}

module.exports = Helpers;
