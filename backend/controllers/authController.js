const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Cadastro
const registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Validação básica
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, senha e nome de usuário são obrigatórios.' });
    }

    // Verificar se o email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já cadastrado.' });
    }

    // Verificar se o username já existe
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: 'Nome de usuário já em uso.' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o usuário
    const user = new User({ email, password: hashedPassword, username });
    await user.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.message);
    res.status(500).json({ error: 'Erro interno ao cadastrar usuário.' });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    // Resposta de sucesso
    res.status(200).json({ message: 'Login bem-sucedido!', email: user.email, username: user.username });
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    res.status(500).json({ error: 'Erro interno ao fazer login.' });
  }
};

module.exports = { registerUser, loginUser };