// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet'); // 1. On importe Helmet

const app = express();

// 2. Sécurisation des en-têtes HTTP
app.use(helmet()); 
app.disable('x-powered-by'); // On cache explicitement qu'on utilise Express

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
  console.log(`Serveur sécurisé sur http://localhost:${PORT}`);
});