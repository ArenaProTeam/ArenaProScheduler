const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  arena: { type: String, required: true },
  date: { type: String, required: true }, // formato dd/mm
  time: { type: String, required: true }, // Ex: "07:40 - 08:30"
});

module.exports = mongoose.model('Reservation', ReservationSchema);