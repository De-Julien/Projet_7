// importation des modules      
const { DataTypes } = require('sequelize');
const DB = require('../database/db')

// création d'un modèle Publication
const Publication = DB.define('Publication', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    texte: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = Publication;