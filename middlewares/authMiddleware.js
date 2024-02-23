const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ error: 'Error al autenticar el token' });

        req.username = decoded.username;
        next();
    });
};
