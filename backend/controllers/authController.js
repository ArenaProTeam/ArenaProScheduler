const User = require('../models/User');

// Cadastro
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    // Verificar se o email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já cadastrado.' });
    }

    // Criar o usuário
    const user = new User({ email, password }); // Salva a senha diretamente
    await user.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.message);
    res.status(500).json({ error: 'Erro interno ao cadastrar usuário.', details: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    res.status(200).json({ message: 'Login bem-sucedido!', email: user.email });
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    res.status(500).json({ error: 'Erro ao fazer login.', details: error.message });
  }
};

module.exports = { registerUser, loginUser };