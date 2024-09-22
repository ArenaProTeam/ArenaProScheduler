const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// URL de conexão com o MongoDB
const mongoURI = 'mongodb://localhost:27017/ArenaProDB'; // substituído para o nome correto do banco de dados

// Conexão com o banco de dados
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importar rotas
const arenaRoutes = require('./routes/arenaRoutes');
app.use('/api/arenas', arenaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});