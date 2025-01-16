const Publication = require('../Models/PublicationModel');
const User = require('../../BackEnd_User/Models/UserModel');

// Créer une publication
exports.createPublication = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        
        // Création de la publication avec l'ID de l'utilisateur du token
        const publication = await Publication.create({
            title,
            description,
            price,
            userId: req.user.userId // Récupéré du token via le middleware auth
        });

        // Récupérer la publication avec les infos de l'utilisateur
        const publicationWithUser = await Publication.findByPk(publication.id, {
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'prenom', 'nom', 'email']
            }]
        });

        res.status(201).json({
            message: "Publication créée avec succès",
            publication: publicationWithUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la création de la publication",
            error: error.message
        });
    }
};

// Récupérer toutes les publications
exports.getAllPublications = async (req, res) => {
    try {
        const publications = await Publication.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'prenom', 'nom', 'email']
            }],
            order: [['createdAt', 'DESC']] // Du plus récent au plus ancien
        });

        res.status(200).json(publications);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des publications",
            error: error.message
        });
    }
};

// Récupérer une publication par ID
exports.getPublicationById = async (req, res) => {
    try {
        const publication = await Publication.findByPk(req.params.id, {
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'prenom', 'nom', 'email']
            }]
        });

        if (!publication) {
            return res.status(404).json({ message: "Publication non trouvée" });
        }

        res.status(200).json(publication);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de la publication",
            error: error.message
        });
    }
};

// Modifier une publication
exports.updatePublication = async (req, res) => {
    try {
        const publication = await Publication.findByPk(req.params.id);

        if (!publication) {
            return res.status(404).json({ message: "Publication non trouvée" });
        }

        // Vérifier si l'utilisateur est le propriétaire
        if (publication.userId !== req.user.userId) {
            return res.status(403).json({ message: "Non autorisé à modifier cette publication" });
        }

        // Mise à jour des champs
        const { title, description, price } = req.body;
        await publication.update({
            title: title || publication.title,
            description: description || publication.description,
            price: price || publication.price
        });

        // Récupérer la publication mise à jour avec les infos de l'utilisateur
        const updatedPublication = await Publication.findByPk(publication.id, {
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'prenom', 'nom', 'email']
            }]
        });

        res.status(200).json({
            message: "Publication mise à jour avec succès",
            publication: updatedPublication
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la mise à jour de la publication",
            error: error.message
        });
    }
};

// Supprimer une publication
exports.deletePublication = async (req, res) => {
    try {
        const publication = await Publication.findByPk(req.params.id);

        if (!publication) {
            return res.status(404).json({ message: "Publication non trouvée" });
        }

        // Vérifier si l'utilisateur est le propriétaire
        if (publication.userId !== req.user.userId) {
            return res.status(403).json({ message: "Non autorisé à supprimer cette publication" });
        }

        await publication.destroy();

        res.status(200).json({
            message: "Publication supprimée avec succès"
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression de la publication",
            error: error.message
        });
    }
};

// Récupérer les publications d'un utilisateur spécifique
exports.getUserPublications = async (req, res) => {
    try {
        console.log('getUserPublications appelé. userId:', req.user.userId);
        
        const publications = await Publication.findAll({
            where: { userId: req.user.userId },
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'prenom', 'nom', 'email']
            }],
            order: [['createdAt', 'DESC']]
        });

        console.log('Publications trouvées:', publications);
        
        res.status(200).json(publications);
    } catch (error) {
        console.error('Erreur dans getUserPublications:', error);
        res.status(500).json({
            message: "Erreur lors de la récupération des publications de l'utilisateur",
            error: error.message
        });
    }
};