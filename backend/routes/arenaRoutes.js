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

// Defina o modelo Reserva
const ReservaSchema = new mongoose.Schema({
    nome: String,
    qtdePessoas: Number,
    telefone: String,
    quadra: String,
    data: { type: Date, default: Date.now } // Data da reserva
});

const Reserva = mongoose.model('Reserva', ReservaSchema); // Modelo de Reserva

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

// Rota para lidar com reservas
router.post('/reservas', async (req, res) => {
    const { nome, qtdePessoas, telefone, quadra } = req.body;

    try {
        // Cria uma nova reserva
        const novaReserva = new Reserva({ nome, qtdePessoas, telefone, quadra });
        
        // Salva a reserva no banco de dados
        await novaReserva.save();

        // Envia a resposta ao cliente
        res.status(201).send('Reserva criada com sucesso');
    } catch (error) {
        console.error('Erro ao criar reserva:', error);
        res.status(500).send('Erro ao criar reserva');
    }
});

// Adicione mais rotas conforme necessário

module.exports = router;