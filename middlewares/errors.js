
/**
 * Middleware for handling requests to unknown endpoints.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * Sends a 404 error in JSON format indicating that the endpoint is unknown.
 */
const unknownEndpoint =  (req, res, next) => {
    const error = new Error("Unknown Endpoint")
    error.status = 404
    next(error)
};

const errorIdHandler = (error, req, res, next)=>{
    if(error.name === 'CastError'){
        error.status = 400
        error.message = 'malformatted id'
    }
    next(error)
}

const errorHandler = (error, req, res, next)=>{
    console.error(error)
    res.status(error.status || 500).json({error: `${(error.name !== "Error")? `${error.name} `:""}${error.message}`})
}

module.exports = {unknownEndpoint, errorIdHandler, errorHandler}