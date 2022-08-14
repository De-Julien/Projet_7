// importation des modules
const express = require('express');

// importation du dossier controllers
const publicationCtrl = require('../controllers/publication.js');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

// utilise la fonction router
const router = express.Router();

// les routes possibles à utiliser
router.get("/", auth, publicationCtrl.getAllPublications);

router.post('/', auth, multer, publicationCtrl.postPublications);

router.put('/:id', auth, multer, publicationCtrl.updatePublication);

router.delete('/:id', auth, publicationCtrl.deletePublication);

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = router;