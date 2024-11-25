const express = require('express');
const { createReservation } = require('../controllers/reservationController');
const router = express.Router();

// Criar uma reserva
router.post('/', createReservation);

module.exports = router;