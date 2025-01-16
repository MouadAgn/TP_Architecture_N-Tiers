const express = require('express');
const router = express.Router();
const publicationController = require('../Controllers/PublicationController');
const authMiddleware = require('../../Middleware/Auth');

router.get('/user', authMiddleware, publicationController.getUserPublications);
router.get('/', publicationController.getAllPublications);
router.post('/', authMiddleware, publicationController.createPublication);
router.get('/:id', publicationController.getPublicationById);
router.put('/:id', authMiddleware, publicationController.updatePublication);
router.delete('/:id', authMiddleware, publicationController.deletePublication);

module.exports = router;