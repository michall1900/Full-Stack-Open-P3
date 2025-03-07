const cors = require('cors')

const frontOrigin = 'http://localhost:5173' // Allowed origin

/**
 * Configures CORS options for incoming requests.
 *
 * @param {Object} req - The incoming request object.
 * @param {Function} callback - The callback function to pass the CORS options.
 */
const corsOptions = (req, callback) => {
  const reqOrigin = req.header('Origin')
  let corsOptions = { origin: reqOrigin && reqOrigin.startsWith(frontOrigin) } // Check if the request origin is allowed

  callback(null, corsOptions)
}

module.exports = cors(corsOptions) // Export configured CORS middleware