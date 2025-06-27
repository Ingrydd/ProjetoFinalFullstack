const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  
  autor: {
    type: String,
    required: true,
  },

  capa_id: {
    type: String,
    required: false, 
  },

  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;