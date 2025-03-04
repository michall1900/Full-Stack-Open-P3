const cors = require('cors');

const frontOrigin = 'http://localhost:5173';

// Middleware for handling CORS
// Only allows requests from frontOrigin
const corsOptions = (req, callback) => {
    const reqOrigin = req.header('Origin');
    let corsOptions ={origin: reqOrigin && reqOrigin.startsWith(frontOrigin)};

    callback(null, corsOptions);
}

module.exports = cors(corsOptions)