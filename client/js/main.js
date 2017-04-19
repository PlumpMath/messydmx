

$(function () {


  var socket = io("localhost:3000");
  window.socket = socket;
//      socket.emit('broadcast', {data: 'foo!'});
  socket.emit('echo', {data: 'ho'});
  socket.on('error', console.error.bind(console));
  socket.on('message', console.log.bind(console));



});

