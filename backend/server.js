const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Permite processar JSON automaticamente
app.use(cors()); // Habilita CORS para permitir chamadas de diferentes origens

// Rotas
app.use('/auth', require('./routes/auth')); // Rotas para autenticação

// Conexão ao MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB')) // Log para sucesso
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message); // Log detalhado para erro
    process.exit(1); // Finaliza o servidor em caso de falha
  });

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de autenticação!');
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});