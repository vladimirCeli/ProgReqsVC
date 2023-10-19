const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Comprobar si no hay cabecera de autorización
    if (!authHeader) {
        const error = new Error('No autenticado, no hay JWT');
        error.status = 401;
        return next(error); // Devolver un objeto de error y salir
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            const error = new Error('Token JWT no válido');
            error.status = 403; // Cambia el estado a 403 (Prohibido)
            return next(error); // Devolver un objeto de error y salir
        }

        // Agregar la información del usuario a req
        req.user = user.UserInfo.username;
        req.rol_id = user.UserInfo.rol_id;

        // Continuar con la ejecución de la siguiente función de middleware
        next();
    });
};

module.exports = verifyJWT;
