require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const connectDB = require('./config/database');
const routes = require('./routes');
const helmet = require('helmet');
const logger = require('./config/logger');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(routes);

app.set('trust proxy', 1);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});