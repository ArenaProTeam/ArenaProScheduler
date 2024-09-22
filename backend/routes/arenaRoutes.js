const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Defina o modelo Arena
const ArenaSchema = new mongoose.Schema({
    nome: String,
    quantidadeDePessoa: Number,
    telefone: String,
});

const Arena = mongoose.model('Arena', ArenaSchema);

// Rota para verificar se a API está funcionando
router.get('/', (req, res) => {
    res.send('API de Arenas está funcionando!');
});

// Rota para adicionar uma nova arena
router.post('/', async (req, res) => {
    try {
        const { nome, quantidadeDePessoa, telefone } = req.body;
        const newArena = new Arena({ nome, quantidadeDePessoa, telefone });
        await newArena.save();
        res.status(201).send('Arena criada com sucesso!');
    } catch (error) {
        res.status(400).send({ message: 'Erro ao criar a arena', error });
    }
});

// Adicione mais rotas conforme necessário

module.exports = router;