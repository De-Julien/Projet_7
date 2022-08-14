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
    
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    texte: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

//Publication.sync({force:true})

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = Publication;