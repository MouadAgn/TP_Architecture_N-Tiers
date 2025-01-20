const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
    try {
        const { prenom, nom, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer un nouvel utilisateur
        await User.create({
            prenom,
            nom,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Utilisateur créé avec succès, veuillez vous connecter"
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la création de l'utilisateur",
            error: error.message
        });
    }
};

// Login reste inchangé
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        // Créer le token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'votre_secret_jwt',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Connexion réussie",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la connexion",
            error: error.message
        });
    }
};