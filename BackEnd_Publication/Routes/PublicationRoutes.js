const express = require('express');
const router = express.Router();
const PublicationController = require('../Controllers/PublicationController');
const auth = require('../../Middleware/Auth');

// Toutes les routes nécessitent une authentification
router.post('/', auth, PublicationController.createPublication);
router.get('/', auth, PublicationController.getAllPublications);
router.get('/:id', auth, PublicationController.getPublicationById);
router.put('/:id', auth, PublicationController.updatePublication);
router.delete('/:id', auth, PublicationController.deletePublication);
router.get('/user/publications', auth, PublicationController.getUserPublications);

module.exports = router;