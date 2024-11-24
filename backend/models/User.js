const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10); // Criptografa a senha antes de salvar
  next();
});

module.exports = mongoose.model('User', userSchema);