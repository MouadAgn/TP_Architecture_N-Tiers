const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ArchitectureN_Tiers_TP', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Mettez true pour voir les requêtes SQL dans la console
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection à MySQL réussie');
    } catch (error) {
        console.error('Erreur de connexion:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };