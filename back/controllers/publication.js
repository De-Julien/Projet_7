const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importation des modèles
const Publication = require('../models/publication');

// fonction de la route GET (getAllPublications)
exports.getAllPublications = (req, res, next) => {
    res.status(200).json({ message: "Ok" })
    /*
    Publication.findAll()
        .then((AllPublications) => res.status(200).json(AllPublications))
        .catch(error => res.status(400).json({ error })).
    */
};

// fonction de la route POST (postPublications)
exports.postPublications = (req, res, next) => {



    /*
    // convertit la chaine de caractère en json
    const publicationObjet = JSON.parse(req.body.publication);
    // casse l'objet et change les données choisies
    const createPublication = new Publication({
        ...publicationObjet,
        user_id: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    // sauvegarde dans la base de données
    createSauces.save()
        .then(() => res.status(201).json({
            message: 'Sauces créé !'
        }))
        .catch(error => res.status(400).json({ error }))
        */
};

// fonction de la route PUT (updatePublication)
exports.updatePublication = (req, res, next) => {

};

// fonction de la route DELETE (deletePublication)
exports.deletePublication = (req, res, next) => {

};
