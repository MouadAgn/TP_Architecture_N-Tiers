const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        // Récupérer le token du header Authorization
        const token = req.headers.authorization.split(' ')[1]; // Format: "Bearer TOKEN"
        
        if (!token) {
            return res.status(401).json({ message: "Pas de token, autorisation refusée" });
        }

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre_secret_jwt');
        
        // Ajouter l'utilisateur à la requête
        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(401).json({ message: "Token non valide" });
    }
};

module.exports = auth;