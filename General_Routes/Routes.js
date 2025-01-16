const express = require('express');
const router = express.Router();
const userRoutes = require('../BackEnd_User/Routes/UserRoutes');

// Routes pour les utilisateurs
router.use('/api/users', userRoutes);



module.exports = router;