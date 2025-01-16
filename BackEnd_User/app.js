const express = require('express');
const cors = require('cors');
const { connectDB } = require('../Config_Database/Db.config');
const routes = require('../General_Routes/Routes');

const app = express();

// Configuration des middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration du port
const PORT = process.env.PORT || 3000;

// Connexion à la base de données
connectDB();

// Routes
app.use('/', routes);

// Route de test
app.get('/', (req, res) => {
    res.json({ message: "Bienvenue sur l'API" });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Une erreur est survenue !",
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});