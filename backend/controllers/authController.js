const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o usuário
    const user = new User({ email, password: hashedPassword });
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
    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      console.error(`Usuário não encontrado para o email: ${email}`);
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error(`Senha incorreta para o email: ${email}`);
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    // Resposta de sucesso
    console.log(`Login bem-sucedido para o email: ${email}`);
    res.status(200).json({
      message: 'Login bem-sucedido!',
      email: user.email,
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    res.status(500).json({ error: 'Erro ao fazer login.', details: error.message });
  }
};

module.exports = { registerUser, loginUser };