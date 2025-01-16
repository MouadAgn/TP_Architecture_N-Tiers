const User = require('../BackEnd_User/Models/UserModel');
const Publication = require('../BackEnd_Publication/Models/PublicationModel');

// Relation User - Publication (One-to-Many)
User.hasMany(Publication, {
    foreignKey: 'userId',
    as: 'publications'
});

Publication.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

module.exports = {
    User,
    Publication
};