const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Email único
  },
  password: {
    type: String,
    required: true, // Senha obrigatória
  }
  
});

// Hash da senha antes de salvar no banco
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Apenas re-hash se a senha foi modificada
  this.password = await bcrypt.hash(this.password, 10); // Criptografa a senha com bcrypt
  next();
});

module.exports = mongoose.model('User', userSchema);