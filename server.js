require('dotenv').config(); 
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');

// --- IMPORTS DES ROUTES ---
const authRoutes = require('./routes/auth');
const stationRoutes = require('./routes/stations');
const bookingRoutes = require('./routes/bookingRoutes'); // Ajouté ici
const logger = require('./logger'); 

const app = express();
const server = http.createServer(app);

// --- CONFIGURATION & SÉCURITÉ ---
app.use(helmet()); 
app.use(cors());
app.use(express.json()); 
app.disable('x-powered-by');

// --- ROUTES API ---
app.use('/api/auth', authRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/bookings', bookingRoutes); // Placé avant le démarrage du serveur

// --- LOGIQUE TEMPS RÉEL (SOCKET.IO) ---
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    logger.info(`📡 Nouveau client connecté : ${socket.id}`);
    
    socket.on('send_message', (data) => {
        socket.broadcast.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        logger.info(`❌ Déconnecté : ${socket.id}`);
    });
});

// --- DÉMARRAGE ---
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    logger.info(`🚀 Serveur WATTSHARE prêt sur http://localhost:${PORT}`);
});