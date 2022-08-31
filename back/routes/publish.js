// importation des modules
const express = require('express');

// importation du dossier controllers
const publishCtrl = require('../controllers/publish.js');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

// utilise la fonction router
const router = express.Router();

// les routes possibles à utiliser
router.get("/", auth, publishCtrl.getAllPublish);
router.get("/like", auth, publishCtrl.getAllLikes);

router.post('/', auth, multer, publishCtrl.postPublish);
router.post('/:id/like', auth, publishCtrl.likePublish);


router.put('/:id', auth, multer, publishCtrl.updatePublish);

router.delete('/:id', auth, publishCtrl.deletePublish);

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = router;