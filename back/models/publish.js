// importation des modules      
const { DataTypes } = require('sequelize');
const DB = require('../database/db')
const User = require('./user')
const Like = require('./like')

// création d'un modèle Publication
const Publish = DB.define('Publish', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    imageUrl: {
        type: DataTypes.STRING,
    },
    
    texte: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    like: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
});

// lie les utilisateurs aux publications
User.hasMany(Publish, { foreignKey: "userId" });
Publish.belongsTo(User,  { foreignKey: "userId" });

//lie les likes aux publications
User.belongsToMany(Publish, { foreignKey: "userId", through: Like });
Publish.belongsToMany(User, { foreignKey: "publishId", through: Like });

//User.sync({ force: true })
//Publish.sync({ force: true })
//Like.sync({ force: true })

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = Publish;