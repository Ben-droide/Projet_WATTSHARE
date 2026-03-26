// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`Connecté : ${socket.id}`);
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log(`Déconnecté : ${socket.id}`);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Serveur Backend sur http://localhost:${PORT}`);
});