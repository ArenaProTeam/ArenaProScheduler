const express = require('express');
const { createReservation, cancelReservation } = require('../controllers/reservationController');
const router = express.Router();

router.post('/', createReservation); // Criar reserva
router.delete('/:id', cancelReservation); // Cancelar reserva

module.exports = router;