const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

// Configuration de la base de données
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'architecturen_tiers_tp'
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
    logging: false
});

const connectDB = async () => {
    try {
        // Créer la connexion pour créer la base de données si elle n'existe pas
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database};`);
        console.log('Base de données vérifiée/créée avec succès');
        await connection.end();

        // Tester la connexion Sequelize
        await sequelize.authenticate();
        console.log('Connexion à MySQL établie avec succès');

        // Importer les relations
        require('../Relation/Relation');

        // Synchroniser les modèles
        await sequelize.sync({ alter: true });
        console.log('Modèles synchronisés avec succès');

    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
        process.exit(1);
    }
};

module.exports = { connectDB, sequelize };