// importation des modules
const express = require('express');

// importation du dossier controllers
const userCtrl = require('../controllers/publication');

// utilise la fonction router
const router = express.Router();

// utilise les paramètres de signup dans controllers
router.post('/signup', publicationCtrl.);

// utilise les paramètres de login dans controllers
router.post('/login', publicationCtrl.);

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = router;