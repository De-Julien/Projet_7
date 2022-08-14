const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importation des modèles
const Publication = require('../models/publication');
const fs = require('fs');

// fonction de la route GET (getAllPublications)
exports.getAllPublications = (req, res, next) => {
    Publication.findAll()
        .then((AllPublications) => res.status(200).json(AllPublications))
        .catch(error => res.status(400).json({ error }))
};

// fonction de la route POST (postPublications)
exports.postPublications = (req, res, next) => {
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    const createPublication = new Publication({
        userId: req.auth.userId,
        texte: req.body.texte,
        imageUrl
    });
    // sauvegarde dans la base de données
    createPublication.save()
        .then(() => res.status(201).json({
            message: 'Publication créé !'
        }))
        .catch(error => {
            const filename = imageUrl.split('/images/')[1];
            res.status(400).json({ error })
            fs.unlink(`images/${filename}`, (error) => {
                if (error) throw error;
            })
        })
};

// fonction de la route PUT (updatePublication)
exports.updatePublication = (req, res, next) => {
    Publication.findOne({ where: { id: req.params.id } })
        .then((onePublication) => {
            if (onePublication.usedId != req.auth.usedId) {
                res.status(401).json({ message: "autorisation refusé !!" });
            } else {
                if (req.file) {
                    const updateBodyPublication = ({
                        ...req.body,
                        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                    });
                    // récupère l'image à modifier
                    const filename = onePublication.imageUrl.split('/images/')[1];
                    // efface l'image sélectionner au-dessus
                    fs.unlink(`images/${filename}`, (error) => {
                        if (error) throw error;
                    });

                    onePublication.update({ ...updateBodyPublication, id: req.params.id })
                        .then(() => res.status(200).json({ message: "La publication à été modifiée !!" }))
                        .catch(error => res.status(404).json({ error }));
                } else {
                    onePublication.update(req.body)
                        .then(() => res.status(200).json({ message: "La publication à été modifiée !!" }))
                        .catch(error => res.status(404).json({ error }));
                }
            }
        })
        .catch(error => res.status(500).json({ error }))
};

// fonction de la route DELETE (deletePublication)
exports.deletePublication = (req, res, next) => {
    // trouve l'ID du produit dans la base de données
    Publication.findOne({ where: { id: req.params.id } })
        .then((onePublication) => {
            if (onePublication.usedId != req.auth.usedId) {
                res.status(401).json({ message: "autorisation refusé !!" });
            } else {
                // récupère l'image à modifier
                const filename = onePublication.imageUrl.split('/images/')[1];
                // efface l'image sélectionner au-dessus
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error;
                })
                onePublication.destroy()
                    .then(() => res.status(200).json({ message: "La publication à été supprimée !!" }))
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
};