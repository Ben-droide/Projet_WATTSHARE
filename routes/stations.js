const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');

// Route publique pour voir les bornes
router.get('/', stationController.getAllStations);

// Route protégée (on pourra ajouter un middleware admin plus tard)
router.post('/add', stationController.addStation);

module.exports = router;