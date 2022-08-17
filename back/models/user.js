// importation des modules      
const { DataTypes } = require('sequelize');
const DB = require('../database/db')

// création d'un modèle utilisateur
const User = DB.define('User', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED, // INTEGER correspond à un nombre entier, UNSIGNED correspond à un nombre positif
    primaryKey: true,
    autoIncrement: true, // créer automatiquement un id et ajoute +1 pour chaque nouvelle création
    allowNull: false // le champ ne peut pas être null
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true, // la valeur est unique
    allowNull: false,
    validate: {
      isEmail: true // utilise un format d'email pour valider le champ
    }
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'user', // utilise la table sélectionnée de la base de données
});

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = User;