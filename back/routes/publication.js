// importation des modules
const express = require('express');

// importation du dossier controllers
const publicationCtrl = require('../controllers/publication.js');
const auth = require('../middleware/auth');

// utilise la fonction router
const router = express.Router();

// les routes possibles à utiliser
router.get("/", auth, publicationCtrl.getAllPublications);

router.post('/', auth, publicationCtrl.postPublications);

router.put('/', auth, publicationCtrl.updatePublication);

router.delete('/', auth, publicationCtrl.deletePublication);

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = router;