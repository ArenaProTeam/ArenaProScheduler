const express = require('express');
const {
  createReservation,
  cancelReservation,
  getActiveReservations, // Importar a função correta
} = require('../controllers/reservationController');
const router = express.Router();

router.post('/', createReservation); // Criar reserva
router.delete('/:id', cancelReservation); // Cancelar reserva
router.get('/active', getActiveReservations); // Obter reservas ativas

module.exports = router;