const express = require('express');
const { createReservation, cancelReservation, getActiveReservations } = require('../controllers/reservationController');
const router = express.Router();

router.post('/', createReservation);
router.delete('/:id', cancelReservation);
router.get('/active', getActiveReservations);

module.exports = router;