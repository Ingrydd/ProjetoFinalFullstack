const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Book = require('../models/Book');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido.' });
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Erro no formato do token.' });
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Token mal formatado.' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido.' });
    req.userId = decoded.id;
    return next();
  });
};

router.use(authMiddleware);

router.get('/search', async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ message: 'O termo de busca é obrigatório.' });
    }
    try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${q}&limit=20`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao realizar a busca externa.' });
    }
});

// Rota POST
router.post('/books', async (req, res) => {
  try {
    const { titulo, autor, capa_id } = req.body;

    if (!titulo || !autor) {
      return res.status(400).json({ message: 'Os campos título e autor são obrigatórios.' });
    }

    const book = await Book.create({
      titulo,
      autor,
      capa_id,
      usuario: req.userId 
    });

    return res.status(201).json(book);
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao salvar o livro.', error });
  }
});

// Rota GET
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find({ usuario: req.userId }).sort({ createdAt: -1 });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar os livros salvos.' });
  }
});

// Rota DELETE
router.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Formato de ID inválido.' });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado.' });
    }

    if (book.usuario.toString() !== req.userId) {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para deletar este livro.' });
    }

    await book.deleteOne();

    return res.status(200).json({ message: 'Livro removido com sucesso.' });
  } catch (error) {
    console.error('ERRO AO DELETAR O LIVRO:', error);
    return res.status(500).json({ message: 'Erro ao processar sua requisição.' });
  }
});

module.exports = router;