const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const sanitize = require('mongo-sanitize');
const User = require('../models/User');
const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Muitas tentativas de login a partir deste IP. Tente novamente em 15 minutos.',
    standardHeaders: true,
    legacyHeaders: false,
});


// Rota de cadastro
router.post('/register', loginLimiter, async (req, res) => {
  const { email, senha } = req.body;
  try {
    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }
    const user = await User.create({ email, senha });
    user.senha = undefined;
    return res.status(201).json({ user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }
    return res.status(500).json({ message: 'Erro ao registrar usuário.', error });
  }
});

// Rota de login
router.post('/login', loginLimiter, async (req, res) => {
    // Sanitiza a entrada do usuário
    const email = sanitize(req.body.email);
    const senha = req.body.senha;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Por favor, forneça email e senha.' });
    }
    try {
        const user = await User.findOne({ email }).select('+senha');
        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }
        const isMatch = await user.comparePassword(senha);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

module.exports = router;