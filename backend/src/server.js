require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('API do Projeto Fullstack está funcionando!');
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});