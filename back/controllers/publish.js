const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importation des modèles
const Publish = require('../models/publish');
const User = require('../models/user')
const Like = require('../models/like')
const fs = require('fs');

// fonction de la route GET (getAllPublish)
exports.getAllPublish = (req, res, next) => {
    // récupère toutes les publications de la base de données
    Publish.findAll(
        {
            include: [{ model: User, attributes: { exclude: ["createdAt", "updatedAt", "email", "mot_de_passe"] } }],
        })
        .then((allPublish) => res.status(200).json(allPublish))
        .catch(error => res.status(400).json({ error }))
};

exports.getAllLikes = (req, res, next) => {
    // récupère toutes les publications de la base de données
    Like.findAll(
        {
            attributes: { exclude: ["createdAt", "updatedAt"] }
        },
    )
        .then((allLike) => res.status(200).json(allLike))
        .catch(error => res.status(400).json({ error }))
};

// fonction de la route POST (postPublish)
exports.postPublish = (req, res, next) => {
    if (req.file) {
        const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        const createPublish = new Publish({
            ...req.body,
            userId: req.auth.userId,
            imageUrl
        });
        // sauvegarde dans la base de données
        createPublish.save()
            .then(() => res.status(201).json({
                message: 'Publication créé !'
            }))
            .catch(error => {
                // récupère l'image à modifier
                const filename = imageUrl.split('/images/')[1];
                // efface l'image sélectionner au-dessus
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error;
                })
                res.status(400).json({ error })
            })
    } else {
        const createPublish = new Publish({
            ...req.body,
            userId: req.auth.userId
        });
        // sauvegarde dans la base de données
        createPublish.save()
            .then(() => res.status(201).json({
                message: 'Publication créé !'
            }))
            .catch(error => {
                res.status(400).json({ error })
            })
    }
};

// fonction de la route PUT (updatePublish)
exports.updatePublish = (req, res, next) => {
    // trouve l'ID du produit dans la base de données
    Publish.findOne({ where: { id: req.params.id } })
        .then((onePublish) => {
            // contrôle si l'ID de la base de données est différent de celui du token
            if (onePublish.userId == req.auth.userId || req.auth.isAdmin == true) {
                // si une image est envoyé
                if (req.file) {
                    if (!onePublish.imageUrl) {
                         // casse l'objet et change l'image
                         const updateBodyPublish = ({
                            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                        });
                         // met à jours la base de données
                         onePublish.update({ ...updateBodyPublish, id: req.params.id })
                         .then(() => res.status(200).json({ message: "La publication à été modifiée !!" }))
                         .catch(error => res.status(404).json({ error }));
                    } else {
                        // casse l'objet et change l'image
                        const updateBodyPublish = ({
                            ...req.body,
                            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                        });
                        // récupère l'image à modifier
                        const filename = onePublish.imageUrl.split('/images/')[1];
                        // efface l'image sélectionner au-dessus
                        fs.unlink(`images/${filename}`, (error) => {
                            if (error) throw error;
                        });
                        // met à jours la base de données
                        onePublish.update({ ...updateBodyPublish, id: req.params.id })
                            .then(() => res.status(200).json({ message: "La publication à été modifiée !!" }))
                            .catch(error => res.status(404).json({ error }));
                    }
                } else {
                    // met à jours la base de données
                    onePublish.update(req.body)
                        .then(() => res.status(200).json({ message: "La publication à été modifiée !!" }))
                        .catch(error => res.status(404).json({ error }));
                }
            } else {
                // si une image est envoyé
                if (req.file) {
                    res.status(401).json({ message: "autorisation refusé !!" });
                    // supprime l'image envoyé
                    fs.unlink(`images/${req.file.filename}`, (error) => {
                        if (error) throw error;
                    });
                } else {
                    res.status(401).json({ message: "autorisation refusé !!" });
                }
            }
        })
        .catch(error => res.status(500).json({ error }))
};

// fonction de la route DELETE (deletePublish)
exports.deletePublish = (req, res, next) => {
    // trouve l'ID du produit dans la base de données
    Publish.findOne({ where: { id: req.params.id } })
        .then((onePublish) => {
            // contrôle si l'ID de la base de données est différent de celui du token
            if (onePublish.userId == req.auth.userId || req.auth.isAdmin == true) {
                if (onePublish.imageUrl) {
                    // récupère l'image à modifier
                    const filename = onePublish.imageUrl.split('/images/')[1];
                    // efface l'image sélectionner au-dessus
                    fs.unlink(`images/${filename}`, (error) => {
                        if (error) throw error;
                    })
                    // efface la sauce selectionné de la base de données
                    onePublish.destroy()
                        .then(() => res.status(200).json({ message: "La publication à été supprimée !!" }))
                        .catch(error => res.status(500).json({ error }))
                } else {
                    // efface la sauce selectionné de la base de données
                    onePublish.destroy()
                        .then(() => res.status(200).json({ message: "La publication à été supprimée !!" }))
                        .catch(error => res.status(500).json({ error }))
                }
            } else {
                res.status(401).json({ message: "autorisation refusé !!" });
            }
        })
        .catch(error => res.status(500).json({ error }))
};

// fonction de la route POST (likePublish)
exports.likePublish = (req, res, next) => {
    // cherche dans la base de données la publication
    Publish.findOne({ where: { id: req.params.id } })
        .then((onePublish) => {
            // cherche dans la base de données le like de la publication en fonction de l'utilisateur
            Like.findOne({ where: { publishId: req.params.id, userId: req.auth.userId } })
                .then((likeList) => {
                    const createLike = new Like({
                        ...req.body,
                        userId: req.auth.userId,
                        publishId: onePublish.id
                    })
                    // si l'utilisateur n'a pas encore like la publication
                    if (!likeList) {
                        if (req.body.myLike == 1) {

                            onePublish.increment({ like: 1 }, { where: { id: req.params.id } })
                                .then(() => res.status(200))
                                .catch((error) => res.status(400).json({ error }));
                            createLike.save()
                                .then(() => res.status(200).json({ message: "J'aime" }))
                                .catch((error) => res.status(400).json({ error }));
                        } else {
                            res.status(401).json({ message: "Le vote n'a pas encore été effectué" });
                        }
                    } // si l'utilisateur a deja like la publication
                    else {
                        if (likeList.myLike == 0 && req.body.myLike == 1) {
                            onePublish.increment({ like: 1 }, { where: { id: req.params.id } })
                                .then(() => res.status(200))
                                .catch((error) => res.status(400).json({ error }));
                            likeList.update(req.body)
                                .then(() => res.status(200).json({ message: "J'aime" }))
                                .catch((error) => res.status(400).json({ error }));
                        } else if (likeList.myLike == 1 && req.body.myLike == 0) {
                            onePublish.increment({ like: -1 }, { where: { id: req.params.id } })
                                .then(() => res.status(200))
                                .catch((error) => res.status(400).json({ error }));
                            likeList.update(req.body)
                                .then(() => res.status(200).json({ message: "Je n'aime plus" }))
                                .catch((error) => res.status(400).json({ error }));
                        }
                        else {
                            res.status(401).json({ message: "Le vote a déjà été effectué" });
                        }
                    }
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
}