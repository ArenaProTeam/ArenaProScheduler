const mongoose = require('mongoose');

const arenaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    quantidadeDePessoa: { type: Number, required: true },
    telefone: { type: String, required: true }
});

const Arena = mongoose.model('Arena', arenaSchema);

module.exports = Arena;