
/**
 * Middleware for handling requests to unknown endpoints.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * Sends a 404 error in JSON format indicating that the endpoint is unknown.
 */
const unknownEndpoint =  (req, res) => {
    res.status(404).json({error: "Unknown Endpoint"});
};

module.exports = {unknownEndpoint}