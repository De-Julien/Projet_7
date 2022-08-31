// importation des modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importation des modèles
const User = require('../models/user');

// fonction de la route POST (signup)
exports.signup = (req, res, next) => {
    // récupère le Mdp envoyé pour l'inscription et le crypte
    bcrypt.hash(req.body.mot_de_passe, 10)
        // remplace le Mdp par le Mdp hash
        .then(hash => {
            const createUser = new User({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                mot_de_passe: hash         
            })
            // sauvegarde le nouvel utilisateur dans la base de données
            createUser.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé !'
                }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

// fonction de la route POST (login)
exports.login = (req, res, next) => {
    // regarde dans la base de données si l'utilisateur s'y trouve.
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            // si l'utilisateur n'est pas dans la base de données
            if (user === null) {
                res.status(401).json({ message: "L'identifiant ou le mot de passe est incorrecte" })
                // si l'utilisateur est dans la base de données
            } else {
                // vérifie si le mot de passe est bien celui de la base de données
                bcrypt.compare(req.body.mot_de_passe, user.mot_de_passe)
                    .then(validPassword => {
                        // si le Mdp n'est pas bon
                        if (!validPassword) {
                            res.status(401).json({ message: "L'identifiant ou le mot de passe est incorrecte" })
                            // si le Mdp est le bon 
                        } else {
                            // envoie token à l'utilisateur
                            res.status(200).json({
                                userId:user.id,
                                token: jwt.sign(
                                    {
                                        id: user.id,
                                        nom: user.nom,
                                        prenom: user.prenom,
                                        isAdmin: user.isAdmin
                                    },
                                    `${process.env.RANDOM_TOKEN_SECRET}`,
                                    { expiresIn: '12h' }
                                )
                            })
                        }
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
};
