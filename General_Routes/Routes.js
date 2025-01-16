const express = require('express');
const router = express.Router();
const userRoutes = require('../BackEnd_User/Routes/UserRoutes');
const publicationRoutes = require('../BackEnd_Publication/Routes/PublicationRoutes');

// Routes pour les utilisateurs
router.use('/api/users', userRoutes);

// Routes pour les publications
router.use('/api/publications', publicationRoutes);

module.exports = router;