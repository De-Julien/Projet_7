// importation des modules
const jwt = require('jsonwebtoken');

// exportation de la procédure d'authentification
module.exports = (req, res, next) => {
    try {
        // Récupère le token
        const token = req.headers.authorization.split(" ")[1];
        // décode le token avec la clé de chiffrement
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.id;
        const isAdmin = decodedToken.isAdmin
        req.auth = {
            userId: userId,
            isAdmin: isAdmin
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};