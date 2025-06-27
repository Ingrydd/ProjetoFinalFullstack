const express = require('express');
const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');

const router = express.Router();

router.use(authRoutes);
router.use(bookRoutes);

module.exports = router;