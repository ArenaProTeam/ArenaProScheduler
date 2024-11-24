const User = require('../models/user'); // Certifique-se de que o nome do arquivo é 'User.js'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registrar usuário
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o novo usuário
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error); // Log no servidor
    res.status(500).json({ error: 'Erro no servidor ao registrar usuário.' });
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Comparar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error('Erro ao fazer login:', error); // Log no servidor
    res.status(500).json({ error: 'Erro no servidor ao fazer login.' });
  }
};

module.exports = { registerUser, loginUser };