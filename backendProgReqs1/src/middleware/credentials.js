// credentials.js
const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;

    // Check if the request origin is included in the allowed origins
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    }
    next();
};

module.exports = credentials;
