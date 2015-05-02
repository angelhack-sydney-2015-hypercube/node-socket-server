var net = require('net')
// Keep track of the chat clients
var clients = [];

net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort

  // Put this new client in the list
  clients.push(socket);

  // Send a nice welcome message and announce
  socket.write("Welcome " + socket.name + "\n");
  broadcast(socket.name + " joined the chat\n", socket);

  getAll(socket)

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    broadcast(socket.name + ' >> ' + data + '\n', socket)
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the chat!!!\n");
  });

}).listen(3000,"0.0.0.0");

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 3000\n");
