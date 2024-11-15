const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files from "public" folder

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('videoData', (data) => {
    // Broadcast the video data to all other connected clients
    socket.broadcast.emit('videoData', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

