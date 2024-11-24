const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  arena: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, default: 'active' }, // status padrão
});

module.exports = mongoose.model('Reservation', reservationSchema);