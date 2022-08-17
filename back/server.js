// importation des modules
const http = require('http');
const dotenv = require('dotenv');

// importation de la route app
const app = require('./app');

// la méthode createserver prend en argument la fonction qui sera appelée à chaque requête reçue
const server = http.createServer(app);

// le serveur écoute les requêtes sur le port
server.listen(process.env.SERVER_PORT);