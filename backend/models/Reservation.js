const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  arena: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Reservation', ReservationSchema);