const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  arena: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  quantidade: { type: Number, required: true },
  telefone: { type: String, required: true },
});

module.exports = mongoose.model('Reservation', ReservationSchema);