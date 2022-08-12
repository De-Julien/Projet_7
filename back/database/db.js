// importation des modules
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Permets de cacher les informations sensibles via des clés
const dotenvConfig = dotenv.config();

// Connexion a la base de données
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    dialect: "mysql",
    host: "localhost"
});

// vérification que la connexion à la base de données est réussi
sequelize.authenticate()
    .then(() => console.log('Connecté à la base de données MySQL!'))
    .catch(error => console.error('Impossible de se connecter, erreur suivante :', error));

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = sequelize;