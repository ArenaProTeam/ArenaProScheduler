const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Garante que o email seja único
  },
  password: {
    type: String,
    required: true, // Campo obrigatório
  },
});

module.exports = mongoose.model('User', userSchema);