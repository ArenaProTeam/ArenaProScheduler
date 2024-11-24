const express = require('express');
const { createReservation, getReservations, getReservationById } = require('../controllers/reservationController');
const router = express.Router();

// Criar uma nova reserva
router.post('/', createReservation);

// Obter todas as reservas de um usuário (usando userId)
router.get('/user/:userId', getReservations);

// Obter uma reserva específica por ID
router.get('/:id', getReservationById);

module.exports = router;
