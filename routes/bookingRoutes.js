const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Vérifie bien l'orthographe de 'createReservation'
router.post('/reserve', bookingController.createReservation);

module.exports = router;