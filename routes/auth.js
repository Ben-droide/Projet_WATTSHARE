const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// La route complète sera http://localhost:3001/api/auth/login
router.post('/login', authController.login);

module.exports = router;