const mongoose = require('mongoose');

const arenaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  schedule: [{ date: Date, booked: Boolean }]
});

module.exports = mongoose.model('Arena', arenaSchema);
