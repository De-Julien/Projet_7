// importation des modules      
const { DataTypes } = require('sequelize');
const DB = require('../database/db')
const User = require('../models/user')

// création d'un modèle Publication
const Like = DB.define('Like', {
    myLike: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = Like;